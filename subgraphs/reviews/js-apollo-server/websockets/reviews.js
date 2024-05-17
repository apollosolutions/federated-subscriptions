import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
const { json } = bodyParser;
import express from "express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import gql from "graphql-tag";
import { readFileSync } from "fs";

const reviews = [
  {
    id: 1,
    body: "Apollo may only be the 3rd US human spaceflight program, but my ride was 1st class!",
    product: {
      id: "p1",
    },
  },
  {
    id: 2,
    body: "What a ride - we went up AND down! A++!",
    product: {
      id: "p2",
    },
  },
  {
    id: 3,
    body: "Nobody beats Apollo when it comes to command and service modules - my time in lunar orbit is going to be hard to beat. Highly recommended!",
    product: {
      id: "p3",
    },
  },
  {
    id: 4,
    body: "Thank you Apollo for a wonderful time, and even more wonderful photos - I got my best far side of the moon shots yet!",
    product: {
      id: "p4",
    },
  },
];

const typeDefs = gql(readFileSync("./reviews.graphql", { encoding: "utf-8" }));

const resolvers = {
  Review: {
    __resolveReference(reference) {
      return reviews.find((review) => review.id == reference.id);
    },
  },
  Query: {
    review(_, args) {
      return reviews.find((review) => review.id == args.id);
    },
  },
  Subscription: {
    reviewAdded: {
      subscribe: async function* () {
        let count = 0;
        while (true) {
          const review = reviews[count++];
          yield { reviewAdded: review };
          await new Promise((resolve) => setTimeout(resolve, 3000));
          if (count === reviews.length) count = 0;
        }
      },
    },
  },
};

const app = express();
const httpServer = createServer(app);

const schema = buildSubgraphSchema({ typeDefs, resolvers });

// We are setting the path to /graphql
// to simplify integrating the demo with the other subgraphs
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
app.use("/graphql", cors(), json(), expressMiddleware(server));

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Reviews subgraph ready at http://localhost:${PORT}/`);
});
