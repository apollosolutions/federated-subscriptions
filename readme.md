# Federated Subscriptions

This repository provides a end-to-end demo of federated subscriptions with Apollo Federation along with a collection of examples and implementation patterns that can be easily wired into the demo environment.

```shell
.
│
├── subgraphs/
│   ├── products/ # This is Apollo Server
│   ├── users/ # This is in Apollo Server
│   └── reviews/
│       ├── js-apollo-server/
│       │   ├── callback/  # In Progress
│       │   ├── websockets/
│       │   └── reliable-delivery/  # In Progress
│       └── go-gqlgen/
│           ├── callback/ # In Progress
│           ├── websockets/
│           └── reliable-delivery/  # In Progress
│
├── diagrams/
│
├── client/ # Client React demo with Apollo Client
├── rover/ # Rover configurations for local composition per example
│   └── websockets/ 
│
├── router/ # Router files - Dockerfile and configurations per example
│   └── websockets/ 
│
├── docker-compose.yaml # Docker compose set up for a full deployment of client, router, subgraphs
├── makefile # Commands to simplify usage
├── dot_env # Copy and update for .env file
└── README.md
```

### Demo Overview
<div align="center">
  <img src="https://github.com/apollosolutions/federated-subscriptions/raw/main/diagrams/demo-diagram.png" width="65%" alt="Preview of client available in repo">
</div><br> 

The demo includes a federated environment with 3 subgraphs: products, reviews, and users.

- **Products + Users Subgraphs** - 2 Subgraphs written in Javascript with Apollo Server that provide the additional metadata for a federated context, these are static across all demo

- **Reviews Subgraph** - The primary **subscription subgraph** written in various languages/framework including example patterns to solve particular requirements. These are interchangable in the demo environment, and managed through the `.env` file.

#### Client Demo

This repository also includes an example with Apollo Client + React that leverages the power of Federated Subscriptions - federating data upon graphql subscription events.

<div align="center">
  <img src="https://github.com/apollosolutions/federated-subscriptions/raw/main/diagrams/client-ui.png" width="65%" alt="Preview of client available in repo">
</div>


## Getting Started

### Requirements
You will need an **enterprise enabled** GraphOS account, please reach out to your account team to acquire a trial account or schedule a [quick consultation](https://www.apollographql.com/enterprise).

In addition, you will need [Docker](https://www.docker.com) installed to run the complete demo (router, subgraphs, client).

### Usage
1) Clone this repo:

```
git clone https://github.com/apollosolutions/federated-subscriptions.git
```

2) Configure and create a `.env` file, by using the example provided in `dot_env`

To use this demo you will need `APOLLO_KEY` and `APOLLO_GRAPH_REF` environment variables. Refer to the [Connect the router to Studio](https://www.apollographql.com/docs/router/managed-federation/setup/#4-connect-the-router-to-studio) documentation for steps outlining where to find these values.

Once you have these values add them to a `.env` file:

```env
APOLLO_KEY=service:graphos-subscriptions-demo:A1a1B1b1C1c1
APOLLO_GRAPH_REF=graphos-subscriptions-demo@current
```

> [!IMPORTANT]
> The `APOLLO_KEY` and `APOLLO_GRAPH_REF` are only used to validate enterprise entitlements to use subscriptions onthe router, but when running the demo, the schema is overrided by the `router/supergraph.graphl` local schema file.

4) Update `.env` to include which framework to use:

```env
FRAMEWORK=go-gqlgen
SUBS_EXAMPLE=websockets
```

Currently what is supported, but will be extended for other examples
- **FRAMEWORK**: `go-gqlgen`, `js-apollo-server`, `java-dgs`, *(Planned: `dot-net-hot-chocolate`)*
  
- **SUBS_EXAMPLE**: `websockets` *(planned: `callback`, `reliable-delivery/lossless`)*

### Start Up Containers

1) Start the Subgraphs and Router (Docker containers):

```bash
cd federated-subscriptions
make demo
```

After composing, the router is now available at http://localhost:4040 and the client is available at http://localhost:3000.

In addition, you can quickly validate the deployment with the make command or test a subscription from your terminal

```bash
make validate-demo

# --graphql
# --graphql
# --graphql
# Success! A subscription was requested, and data was received successfully!"

make test-sub

# --graphql
# content-type: application/json

# {}
# --graphql
# content-type: application/json

# {"payload":{"data":{"reviewAdded":{"id":1,"body":"Apollo may only be the 3rd US human spaceflight program, but my ride was 1st class!","product":{"createdBy":{"name":"Neil Armstrong","email":"neil.armstrong@finalfrontier.com"},"name":"Apollo 11 Ride","sku":"apollo-11-ride"}}}}}
# --graphql
```

## Modifying Demo
### Local Supergraph Composition
If you want to test making changes to subgraph schemas, and have [rover](https://www.apollographql.com/docs/rover) installed.

Update the `rover/rover.yaml` with the correct subgraph reference, and run the following to compose a new supergraph:

```bash
cd federated-subscriptions
rover supergraph compose --config ./rover/your-example/rover.yaml > ./router/your-example/supergraph.graphql
```

### Running Locally
If you want to run outside of docker, you'll need to uncomment the overrides in the `router/<SUBS_EXAMPLE>/router.yaml` configuration.

### Contributing an Example
1) Make sure your example graph runs on port `4000` and it's graphql and subscription endpoint is also on `/graphql`
2) Place the corresponding example and it's `Dockerfile` in the respective directory in `subgraph/<framework>/<example>`
3) Add associated configurations for the `router/<example>` and `rover/<example>`
4) Test containers: `make build-force && make demo`

## Related Content
#### General
- [Video of Federated Subscriptions for Real-time Applications Talk at Summit 2023](https://www.youtube.com/watch?v=-4R6rLMZ9mc&list=PLpi1lPB6opQzUOqG3QroLLN06FF-Q_uhX&index=4) - Discusses the before and after state of federated subscriptions, engineering decisions, and performance testing
- [Apollo GraphQL Federated Subscription Blog Post](https://www.apollographql.com/blog/federated-subscriptions-in-graphos-real-time-data-at-scale) - High-level overview of federated subscriptions

#### Server
- [Lossless Subscription Example](https://github.com/apollosolutions/lossless_subscription) - This is an example implementation in Rust and Typescript for lossless delivery

#### Client
- [Incremental Delivery Specification](https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md) - Outlines the specification used by the router to deliver subscription events to clients
- [Network Adapters for Other Clients (relay and urql)](https://www.apollographql.com/docs/react/data/subscriptions/#usage-with-relay-or-urql) - Network adapters to extend support for other GraphQL clients 
