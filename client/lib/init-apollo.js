import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { getMainDefinition } from "apollo-utilities";
import introspectionQueryResultData from "./fragmentTypes.json";
import fetch from "isomorphic-unfetch";

import { resolvers, defaults } from "../resolvers";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const ssrMode = !process.browser;

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
  });

  const transportLink = !ssrMode
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);

          return kind === "OperationDefinition" && operation === "subscription";
        },
        new WebSocketLink({
          uri: "ws://localhost:4000/graphql",
          options: {
            reconnect: true
          }
        }),
        httpLink
      )
    : httpLink;

  const authLink = setContext((_, { headers }) => {
    const token = process.browser ? sessionStorage.getItem("token") : null;
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  const cache = new InMemoryCache({
    fragmentMatcher,
    cacheRedirects: {
      Query: {
        reviews: (_, { ids }, { getCacheKey }) =>
          ids.map(id => getCacheKey({ __typename: "Review", id }))
      }
    }
  });

  const stateLink = withClientState({ resolvers, defaults, cache });

  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      errorLink,
      stateLink,
      createPersistedQueryLink({ useGETForHashedQueries: true }),
      authLink,
      transportLink
    ]),
    cache
  });

  client.onResetStore(stateLink.writeDefaults);

  return client;
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
