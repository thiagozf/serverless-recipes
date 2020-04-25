import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import cloudFrontCompat from './micro-aws-cloudfront'
import './config'
import schema from './schema'

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true
})

const graphqlHandler = server.createHandler()

export const handler = cloudFrontCompat(graphqlHandler)
