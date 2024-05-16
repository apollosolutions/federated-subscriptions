include .env

demo:
	docker-compose --env-file .env up

build-force:
	docker-compose --env-file .env build --no-cache

local-client:
	cd client && npm run start

# To allow extending to other examples in the future
supergraph-compose supergraph-compose-ws supergraph-compose-callback:
	rover supergraph compose --config ./rover/rover.yaml > ./router/supergraph.graphql
