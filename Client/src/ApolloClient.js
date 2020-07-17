import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://cnt2020.hopto.org/api" }),
  cache: new InMemoryCache(),
})

export default client;