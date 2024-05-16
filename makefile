include .env

# To allow extending to other examples in the future
supergraph-compose-ws supergraph-compose-callback:
	rover supergraph compose --config ./rover/rover.yaml > ./router/supergraph.graphql

demo:
	docker-compose --env-file .env up

build-force:
	docker-compose --env-file .env --no-cache build

local-client:
	cd client && npm run start

