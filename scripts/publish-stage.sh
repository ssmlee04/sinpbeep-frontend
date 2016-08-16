#!/usr/bin/env bash
BUCKET=stage-frontend.clearstreet.io
DIR=dist/stage/
aws  s3  sync $DIR s3://$BUCKET/ --region us-west-2
