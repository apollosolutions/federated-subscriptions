# Java DGS GraphQL Subgraph

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/Jomu73?referralCode=xsbY2R)

This is an example application template that can be used to create Federated GraphQL subgraph using [DGS Framework](https://netflix.github.io/dgs/).

This example application implements following GraphQL schema:

```graphql
directive @contact(
    "Contact title of the subgraph owner"
    name: String!
    "URL where the subgraph's owner can be reached"
    url: String
    "Other relevant notes can be included here; supports markdown links"
    description: String
) on SCHEMA

schema
@contact(
    name: "FooBar Server Team"
    url: "https://myteam.slack.com/archives/teams-chat-room-url"
    description: "send urgent issues to [#oncall](https://yourteam.slack.com/archives/oncall)."
)
@link(
    url: "https://specs.apollo.dev/federation/v2.0",
    import: ["@key"]
) {
    query: Query
}

type Query {
    shows(titleFilter: String): [Show]
}

type Show @key(fields: "id") {
    id: ID!
    title: String
    releaseYear: Int
}
```

## Build

This project uses [Gradle](https://gradle.org/) and requires Java 17+ runtime. In order to build the project locally (which
will also execute all the tests), simply run the `build` task.

```shell
./gradlew clean build
```

> NOTE: in order to ensure you use the right version of Gradle we highly recommend to use the provided wrapper script

### Continuous Integration

This project comes with some example build actions that will trigger on PR requests and commits to the main branch.

## Run

To start the GraphQL server:

* Run `Application.java` directly from your IDE
* Alternatively you can also run the Spring Boot plugin directly from the command line

```shell script
./gradlew bootRun
```

Once the app has started you can explore the example schema by opening the GraphiQL endpoint at http://localhost:8080/graphiql begin developing your supergraph with `rover dev --url http://localhost:8080/graphql --name my-sugraph`.

## Apollo Studio Integration

1. Set these secrets in GitHub Actions:
    1. APOLLO_KEY: An Apollo Studio API key for the supergraph to enable schema checks and publishing of the
       subgraph.
    2. APOLLO_GRAPH_REF: The name of the supergraph in Apollo Studio.
    3. PRODUCTION_URL: The URL of the deployed subgraph that the supergraph gateway will route to.
2. Set `SUBGRAPH_NAME` in .github/workflows/checks.yaml and .github/workflows/deploy.yaml
3. Remove the `if: false` lines from `.github/workflows/checks.yaml` and `.github/workflows/deploy.yaml` to enable schema checks and publishing.
4. Write your custom deploy logic in `.github/workflows/deploy.yaml`.
5. Send the `Router-Authorization` header [from your Cloud router](https://www.apollographql.com/docs/graphos/routing/cloud-configuration#managing-secrets) and set the `ROUTER_SECRET` environment variable wherever you deploy this to.

## Additional Resources

* [DGS documentation](https://netflix.github.io/dgs/)
* [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/2.7.3/reference/htmlsingle/)
* [Gradle documentation](https://gradle.org/)
