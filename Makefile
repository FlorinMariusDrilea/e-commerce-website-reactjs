start_couchbase:
	COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f ./docker/docker-compose-couchbase.yml up --build couchbase