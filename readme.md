# Federated Subscriptions
```
federated-subscriptions/
│
├── subgraphs/
│   ├── js-apollo-server/
│   │   ├── callback/
│   │   ├── websockets/
│   │   └── reliable-delivery/
│   └── go-gqlgen/
│       ├── callback/
│       ├── websockets/
│       └── reliable-delivery/
│
├── architecture_diagrams/
│   ├── example.png
│   └── complex.png
|
├── client/
│
├── router/
│   └── router.yaml
│
├── Dockerfile
├── makefile
└── README.md
```

## Client Demo
This repository also includes a Apollo Client + React based client application that leverages the power of Federated Subscriptions.

![Example of Client](https://github.com/apollosolutions/se-subscription-demo/raw/main/client/public/demo.png)

## Getting Started
1) Configure a `.env` file.

To use this demo you will need `APOLLO_KEY` and `APOLLO_GRAPH_REF` environment variables. Refer to the [Connect the router to Studio](https://www.apollographql.com/docs/router/managed-federation/setup/#4-connect-the-router-to-studio) documentation for steps outlining where to find these values.

Once you have these values add them to a `.env` file like:

```
APOLLO_KEY=service:graphos-subscriptions-demo:A1a1B1b1C1c1
APOLLO_GRAPH_REF=graphos-subscriptions-demo@current
```

2) You must have [Node](https://nodejs.org/) installed to run the client application, and [Docker](https://www.docker.com) installed to run the Router and subgraphs.
