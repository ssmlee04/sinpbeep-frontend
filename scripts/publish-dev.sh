#!/usr/bin/env bash
BUCKET=dev-frontend.clearstreet.io
DIR=dist/dev-server/
aws  s3  sync $DIR s3://$BUCKET/ --region us-west-2