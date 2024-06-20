include .env

# -------------------------
# Setup
# -------------------------
demo up:
	docker-compose --env-file .env up

build:
	docker-compose --env-file .env build

build-router:
	docker-compose --env-file .env build router

build-reviews:
	docker-compose --env-file .env build reviews

# -------------------------
# Force Rebuild
# -------------------------
build-force:
	docker-compose --env-file .env build --no-cache

build-force-router:
	docker-compose --env-file .env build --no-cache router

build-force-reviews:
	docker-compose --env-file .env build --no-cache reviews

# To allow extending to other examples in the future
supergraph-compose supergraph-compose-ws supergraph-compose-callback:
	rover supergraph compose --config ./rover/${SUBS_EXAMPLE}/rover.yaml > ./router/${SUBS_EXAMPLE}/supergraph.graphql

# -------------------------
# Local Development
# -------------------------
local-client:
	cd client && npm run start

# -------------------------
# Testing
# -------------------------
curl-sub:
	curl --max-time $(max_time) -s --request POST \
	--header 'Content-Type: application/json' \
	--header 'Accept: multipart/mixed;subscriptionSpec=1.0' \
	--url 'http://0.0.0.0:4040/' \
	--data '{"query":"subscription Subscription {\n  reviewAdded {\n    id\n    body\n    product {\n      createdBy {\n        name\n        email\n      }\n      name\n      sku\n    }\n  }\n}","variables":{}}'

test-sub:
	@make curl-sub max_time=10

validate-demo:
	@make curl-sub max_time=3 2>/dev/null | grep -- "reviewAdded" && echo "Success! A subscription was requested, and data was received successfully!" || echo "Failed to retrieve data for subscription request!"
