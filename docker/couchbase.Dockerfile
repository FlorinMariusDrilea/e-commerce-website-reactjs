FROM couchbase/server:enterprise-7.6.5
USER root

# Copy initialization script to the container
COPY ./couchbase_setup.sh /tmp/opt/couchbase_setup.sh

RUN find tmp/opt/ -type f -exec sed -i 's/\r$//g' {} +
RUN mv /tmp/opt/* /

# Set the entrypoint script
ENTRYPOINT ["bash", "./couchbase_setup.sh"]