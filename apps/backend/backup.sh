#!/bin/bash
set -a; source losses.env; set +

# Dump DBs
date=`date +"%Y%m%d_%H%M%N"`
filename="backup_${date}.backup"

docker exec -i "losses-db" /bin/bash -c "PGPASSWORD=$POSTGRES_PASSWORD pg_dump -h localhost -p $POSTGRES_PORT -U $POSTGRES_USER $POSTGRES_DB" > $filename
gzip $filename
echo "$BUCKET_NAME"
aws s3 cp "${filename}.gz" s3://$BUCKET_NAME

rm -rf *.gz
exit 0