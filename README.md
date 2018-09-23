# graphql-react-demo
A demonstration GraphQL API and React client. Facebook's reference implementation of GraphQL is used on the server and Apollo for the client. The solution aims to address many of the concerns developers will face when starting out building GraphQL APIs. It also showcases many of the key new features of GraphQL such as Subscriptions and Persistent Queries.

## Setup

The server supports persistent queries through the use of an external Redis cache. To setup the redis instance perform the following steps:

Pull down the official container image from Docker Hub

```docker pull redis```

Run the container

```docker run --name apollo-redis -p 6379:6379 -d redis```

Check that the Redis server is up and running

```redis-cli```

This should start a console in interactive mode

```ping```

Server should response with 'PONG'

## Start Server and Client apps

In a terminal do:

```bash
cd server
yarn run start
```

In another terminal

```bash
cd client
yarn run start
```
## Verifying Persisted Queries Configuration

You can check to see if persisted queries are working by issuing the following request. Initially you should receive a PERSISTED_QUERY_NOT_FOUND error. 

```curl -g 'http://localhost:4000/graphql?extensions={\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38\"}}'```

Now create a query using the following request.

```curl -g 'http://localhost:4000/graphql?query={__typename}&extensions={\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38\"}}'```

Now retry the query and you should receive the desired query results.
