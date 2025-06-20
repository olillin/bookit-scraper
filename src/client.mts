import { GraphQLClient } from "graphql-request"
import { GRAPHQL_URL } from "./constants.mjs"

export function createGraphQLClient(cookie: string): GraphQLClient {
    const client = new GraphQLClient(GRAPHQL_URL, {
        headers: {
            cookie
        }
    })
    return client
}
