#!/bin/bash

bucketCreate(){
    BUCKET_NAME=$COUCHBASE_BUCKET_NAME
    BUCKET_SIZE=$COUCHBASE_BUCKET_RAM_SIZE
    echo "Creating bucket $BUCKET_NAME..."
    couchbase-cli bucket-create -c localhost -u $COUCHBASE_ADMINISTRATOR_USERNAME -p $COUCHBASE_ADMINISTRATOR_PASSWORD \
        --bucket=$BUCKET_NAME \
        --bucket-type=couchbase \
        --bucket-ramsize=$BUCKET_SIZE \
        --bucket-replica=1 \
        --wait
    if [[ $? != 0 ]]; then
      echo "FAILED TO CREATE BUCKET $BUCKET_NAME! EXISTING..."
      return 1
    fi
}

clusterInit(){
    couchbase-cli cluster-init -c couchbase --cluster-username $COUCHBASE_ADMINISTRATOR_USERNAME \
        --cluster-password $COUCHBASE_ADMINISTRATOR_PASSWORD --services data,index,query,fts \
        --cluster-ramsize 1024 --cluster-index-ramsize 512 \
        --cluster-fts-ramsize 256 --cluster-fts-ramsize 256 \
        --index-storage-setting memopt

    echo "Waiting for query service"
    until curl -sf http://couchbase:8093/admin/ping | grep OK; do
      echo '.'
      sleep 1
    done
}

main(){
    set -e
    echo "Couchbase UI :8091"
    echo "Couchbase logs /opt/couchbase/var/lib/couchbase/logs"
    ./entrypoint.sh couchbase-server &
    if [[ $? != 0 ]]; then
        echo "Couchbase startup failed. Exiting." >&2
        exit 1
    fi

    until $(curl -sf http://couchbase:8091 > /dev/null); do
        printf '.'
        sleep 1 
    done

    HEALTHCHECK=`couchbase-cli server-list --cluster http://couchbase:8091 --username $COUCHBASE_ADMINISTRATOR_USERNAME --password $COUCHBASE_ADMINISTRATOR_PASSWORD` || true

    if [[ $HEALTHCHECK == *"unknown"* ]]; then
        clusterInit
        bucketCreate
    else
        echo "Cluster already initialized"
    fi

    set +e
    wait
}

main