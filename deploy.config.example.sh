# Copy this file to deploy.config.sh (gitignored) and fill in your AWS values.
#
#   cp deploy.config.example.sh deploy.config.sh
#   $EDITOR deploy.config.sh
#
# Then run ./deploy.sh

# S3 bucket name (must already exist; created during one-time setup)
BUCKET="portfolio-om-yourdomain-com"

# CloudFront distribution ID — find it in the AWS Console under CloudFront,
# or via: aws cloudfront list-distributions --query 'DistributionList.Items[].Id'
DISTRIBUTION_ID="E1234567890ABC"

# Optional: AWS profile if you have multiple
# export AWS_PROFILE="default"

# Optional: AWS region (only used for display in the deploy summary)
# export AWS_REGION="us-east-1"
