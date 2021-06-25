import { ApolloServer } from 'apollo-server-express';
import { typeDefs, characters } from './characters';

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    characters,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
