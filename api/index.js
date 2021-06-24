import { ApolloServer } from 'apollo-server-express';
import { typeDefs, caracters } from './caracters';

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    caracters,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
