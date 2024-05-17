import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";

const products = [
  {
    id: "p1",
    sku: "apollo-11-ride",
    name: "Apollo 11 Ride",
  },
  {
    id: "p2",
    sku: "apollo-11-backseat",
    name: "Apollo 11 Backseat",
  },
  {
    id: "p3",
    sku: "csm-orbit-package",
    name: "CSM Orbit Package",
  },
  {
    id: "p4",
    sku: "apollo-8-ride",
    name: "Apollo 8 Ride",
  },
];

const userByProduct = [
  {
    id: "p1",
    user: { email: "neil.armstrong@finalfrontier.com" },
  },
  {
    id: "p2",
    user: { email: "buzz.aldrin@finalfrontier.com" },
  },
  {
    id: "p3",
    user: { email: "michael.collins@finalfrontier.com" },
  },
  {
    id: "p4",
    user: { email: "frank.borman@finalfrontier.com" },
  },
];

const typeDefs = gql(readFileSync("./products.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    allProducts() {
      return products;
    },
    product(_, args) {
      return products.find((p) => p.id == args.id);
    },
  },
  Product: {
    createdBy(reference) {
      if (reference.id) {
        return userByProduct.find((p) => p.id == reference.id).user;
      }
      return null;
    },
    __resolveReference(reference) {
      if (reference.id) {
        return products.find((p) => p.id == reference.id);
      } else if (reference.sku) {
        return products.find((p) => p.sku == reference.sku);
      }
    },
  },
};

const schema = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

// We are setting the path to /graphql
// to simplify integrating the demo with the other subgraphs
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  path: "/graphql",
});
console.log(`🚀 Products subgraph ready at ${url}`);
