#!/bin/bash

BKT="s3://www.paulocr.com/"
# BKT="s3://www.pruvalcaba.com/"
ENVI="DEVEL"
TMP_DIR="./_public/"

if [ "$1" = "prod" ]; then
    BKT="s3://www.paulocr.com/"
    # BKT="s3://www.pruvalcaba.com/"
    ENVI="PRODUCTION"
fi
echo "Uploading PORTFOLIO to $BKT ($ENVI)"
if [ -d "$TMP_DIR" ]; then
    rm -R $TMP_DIR
fi
mkdir $TMP_DIR
cp -r ./css ./img ./js ./vendor index.html $TMP_DIR
aws s3 cp $TMP_DIR $BKT --recursive --acl public-read --profile derco
