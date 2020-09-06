import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"

const client = new ApolloClient({
  link: createUploadLink({ uri: "http://cnt2020.hopto.org/api" }),
  cache: new InMemoryCache(),
})

export default client;