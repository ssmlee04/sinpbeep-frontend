#!/usr/bin/env bash
BUCKET=prod-frontend.sinpbeep.com
DIR=dist/production/
aws s3 sync $DIR s3://$BUCKET/ --region us-west-2

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E2BD46LTZ9612V --paths /index.html /error.html