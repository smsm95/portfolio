#!/usr/bin/env bash
#
# deploy.sh — build the static site and deploy to S3 + CloudFront in one command.
#
# Usage:
#   ./deploy.sh             # build + deploy (with confirmation)
#   ./deploy.sh --no-build  # skip the build, deploy ./out as-is
#   ./deploy.sh --yes       # skip the confirmation prompt
#
# Configuration: copy deploy.config.example.sh to deploy.config.sh and fill in
# your AWS values. Or export BUCKET and DISTRIBUTION_ID before running.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ---------- Load config ----------

if [ -f "$SCRIPT_DIR/deploy.config.sh" ]; then
  # shellcheck source=/dev/null
  source "$SCRIPT_DIR/deploy.config.sh"
fi

if [ -z "${BUCKET:-}" ] || [ -z "${DISTRIBUTION_ID:-}" ]; then
  cat <<EOF >&2
Error: BUCKET and DISTRIBUTION_ID are required.

Either:
  1) Copy deploy.config.example.sh to deploy.config.sh and fill in your values, or
  2) Export them before running:
       export BUCKET=portfolio-om-yourdomain-com
       export DISTRIBUTION_ID=E1234567890ABC
       ./deploy.sh
EOF
  exit 1
fi

# ---------- Parse flags ----------

DO_BUILD=1
ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    --no-build) DO_BUILD=0 ;;
    --yes|-y)   ASSUME_YES=1 ;;
    -h|--help)
      sed -n '3,10p' "$0" | sed 's/^# \?//'
      exit 0
      ;;
    *) echo "Unknown flag: $arg" >&2; exit 1 ;;
  esac
done

# ---------- Sanity checks ----------

command -v aws  >/dev/null 2>&1 || { echo "Error: aws CLI not installed."; exit 1; }
command -v npm  >/dev/null 2>&1 || { echo "Error: npm not installed."; exit 1; }
aws sts get-caller-identity >/dev/null 2>&1 || {
  echo "Error: AWS credentials not configured. Run 'aws configure' or set AWS_PROFILE." >&2
  exit 1
}

# ---------- Build ----------

if [ "$DO_BUILD" -eq 1 ]; then
  echo "→ Building..."
  npm run build
fi

if [ ! -d "./out" ] || [ -z "$(ls -A ./out 2>/dev/null)" ]; then
  echo "Error: ./out is missing or empty. Did the build fail?" >&2
  exit 1
fi

# ---------- Confirm ----------

SIZE=$(du -sh ./out | cut -f1)
FILE_COUNT=$(find ./out -type f | wc -l | tr -d ' ')

cat <<EOF

  Source:        ./out  ($SIZE, $FILE_COUNT files)
  Bucket:        s3://$BUCKET
  Distribution:  $DISTRIBUTION_ID
  Region:        ${AWS_REGION:-default}

EOF

if [ "$ASSUME_YES" -ne 1 ]; then
  read -r -p "Deploy? [y/N] " reply
  case "$reply" in
    [yY]|[yY][eE][sS]) ;;
    *) echo "Aborted."; exit 1 ;;
  esac
fi

# ---------- Sync ----------

echo "→ Uploading immutable assets (1y cache)..."
aws s3 sync ./out/_next "s3://$BUCKET/_next" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete \
  --only-show-errors

echo "→ Uploading HTML / images (60s cache)..."
aws s3 sync ./out "s3://$BUCKET" \
  --cache-control "public, max-age=60, must-revalidate" \
  --exclude "_next/*" \
  --delete \
  --only-show-errors

# ---------- Invalidate ----------

echo "→ Invalidating CloudFront..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo
echo "✓ Deployed."
echo "  Invalidation: $INVALIDATION_ID (typically takes 1–5 min to propagate)"
