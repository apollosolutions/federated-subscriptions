import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { App } from "./App";

import "./index.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SUPERGRAPH_URI || "http://localhost:4040/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
