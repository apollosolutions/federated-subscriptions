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

## Getting Started
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

3) You must have [Node](https://nodejs.org/) installed to run the client application, and [Docker](https://www.docker.com) installed to run the Router and subgraphs.

### Configure Stack and Example
1) Update `.env` to include which framework to use:

```env
FRAMEWORK=go-gqlgen
SUBS_EXAMPLE=websockets
```

Currently what is supported, but will be extended for other examples
- **FRAMEWORK**: `go-gqlgen`, `js-apollo-server`
- **SUBS_EXAMPLE**: `websockets`

### Router and Subgraph Setup

2) Start the subgraphs and Router (Docker containers):

```bash
cd federated-subscriptions
make demo
```

1) The router is now available at http://localhost:4040.

### Supergraph Composition

If you want to test making changes to subgraph schemas, and have [rover](https://www.apollographql.com/docs/rover) installed, run the following to compose a new supergraph:

```bash
cd federated-subscriptions
rover supergraph compose --config rover.yaml > ./router/supergraph.graphql
```

## Client Demo
This repository also includes a Apollo Client + React based client application that leverages the power of Federated Subscriptions.

<div align="center">
  <img src="https://github.com/apollosolutions/se-subscription-demo/raw/main/client/public/demo.png" width="65%" alt="Preview of client available in repo">
</div>

If using docker-compose, the UI is accessible at `http://localhost:3000`. 

## Related Content
- [Lossless Subscription Example](https://github.com/apollosolutions/lossless_subscription) - This is an example implementation for reliable delivery using a identifier
