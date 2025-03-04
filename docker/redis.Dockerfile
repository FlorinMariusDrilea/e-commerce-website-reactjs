# FROM couchbase/server:enterprise-7.6.5
# USER root

# # Copy initialization script to the container
# COPY ./couchbase_setup.sh /tmp/opt/couchbase_setup.sh

# RUN find tmp/opt/ -type f -exec sed -i 's/\r$//g' {} +
# RUN mv /tmp/opt/* /

# # Set the entrypoint script
# ENTRYPOINT ["bash", "./couchbase_setup.sh"]

# Use the official Redis image as the base image
FROM redis:latest

# Set the working directory
WORKDIR /data

# Copy any custom Redis configuration file (optional)
# COPY redis.conf /usr/local/etc/redis/redis.conf

# Expose the default Redis port
EXPOSE 6379

# Command to run Redis server
CMD ["redis-server"]