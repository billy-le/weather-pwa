import dotenv from 'dotenv';
dotenv.config();

import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const options = {
  port: 8000,
  endpoint: '/graphql',
  playground: '/playground',
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(options, ({ port }) => console.log(`Server is running on localhost:${port}`));
