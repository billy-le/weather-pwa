import { env } from '../config/environment';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: env.server.api,
});
