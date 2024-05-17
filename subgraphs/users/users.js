import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";

const users = [
  { email: "neil.armstrong@finalfrontier.com", name: "Neil Armstrong" },
  { email: "buzz.aldrin@finalfrontier.com", name: "Buzz Aldrin" },
  { email: "michael.collins@finalfrontier.com", name: "Michael Collins" },
  { email: "frank.borman@finalfrontier.com", name: "Frank Borman" },
];

const typeDefs = gql(readFileSync("./users.graphql", { encoding: "utf-8" }));
const resolvers = {
  User: {
    __resolveReference(reference) {
      return users.find((u) => u.email == reference.email);
    },
  },
};

// We are setting the path to /graphql
// to simplify integrating the demo with the other subgraphs
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  path: "/graphql"
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀 Users subgraph ready at ${url}`);
