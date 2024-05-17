# Federated Subscriptions

This repository provides a collection of examples and references for implementing federated graphql subscriptions with Apollo Router.

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
├── rover/ # Rover configurations for local composition
│
├── router/ #
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

- **Products** + **Users**: subgraphs written in JS with Apollo Server that provide the additional metadata for a federated context, these are static across all demo
- **Reviews** **Subgraph** provides various languages/framework examples and patterns to solve particular requirements. These are interchangable in the demo environment, and managed through the `.env` file.

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

Once you have these values add them to a `.env` file like:

```env
APOLLO_KEY=service:graphos-subscriptions-demo:A1a1B1b1C1c1
APOLLO_GRAPH_REF=graphos-subscriptions-demo@current
```

> Note: The `APOLLO_KEY` and `APOLLO_GRAPH_REF` are only used to validate enterprise entitlements to use subscriptions onthe router, but when running the demo, the schema is overrided by the `router/supergraph.graphl` schema file.

4) Update `.env` to include which framework to use:

```env
FRAMEWORK=go-gqlgen
SUBS_EXAMPLE=websockets
```

Currently what is supported, but will be extended for other examples
- **FRAMEWORK**: `go-gqlgen`, `js-apollo-server`
- **SUBS_EXAMPLE**: `websockets`

### Start Up Containers

1) Start the Subgraphs and Router (Docker containers):

```bash
cd federated-subscriptions
make demo
```

After composing, the router is now available at http://localhost:4040 and the client is available at http://localhost:3000.

In addition, you can quickly validate the deployment with the make command.
```bash
make validate-demo
```


## Modifying Demo
### Local Supergraph Composition

If you want to test making changes to subgraph schemas, and have [rover](https://www.apollographql.com/docs/rover) installed.

Update the `rover/rover.yaml` with the correct subgraph reference, and run the following to compose a new supergraph:

```bash
cd federated-subscriptions
rover supergraph compose --config rover.yaml > ./router/supergraph.graphql
```

### Running Locally
If you want to run outside of docker, you'll need to uncomment the overrides in the `router/router.yaml` configuration.

## Related Content
- [Lossless Subscription Example](https://github.com/apollosolutions/lossless_subscription) - This is an example implementation for reliable delivery using a identifier
