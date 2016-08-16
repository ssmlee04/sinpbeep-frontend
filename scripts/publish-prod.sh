#!/usr/bin/env bash
BUCKET=prod-frontend.singlebeep.com
DIR=dist/production/
aws  s3  sync $DIR s3://$BUCKET/ --region us-west-2
