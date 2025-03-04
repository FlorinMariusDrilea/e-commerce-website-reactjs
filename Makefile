start_redis:
	docker build -t my-redis -f docker/redis.Dockerfile .
	docker run --name redis-container -d -p 6379:6379 my-redis

stop_redis:
	docker stop redis-container
	docker rm redis-container

logs_redis:
	docker logs -f redis-container

clean:
	docker rmi my-redis
