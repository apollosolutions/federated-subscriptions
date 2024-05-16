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

curl-sub:
	curl --max-time $(max_time) -s --request POST \
	--header 'Content-Type: application/json' \
	--header 'Accept: multipart/mixed;subscriptionSpec=1.0' \
	--url 'http://0.0.0.0:4040/' \
	--data '{"query":"subscription Subscription {\n  reviewAdded {\n    id\n    body\n    product {\n      createdBy {\n        name\n        email\n      }\n      name\n      sku\n    }\n  }\n}","variables":{}}'

test-sub:
	@make curl-sub max_time=10

validate-demo:
	@make curl-sub max_time=3 2>/dev/null | grep -- "--graphql" && echo "Success! Was able to make subscription request and recieve data" || echo "Failed to retrieve data for subscription"
