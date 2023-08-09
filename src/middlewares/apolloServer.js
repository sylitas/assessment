import { ApolloServer } from '@apollo/server';
import { loadFiles } from '@graphql-tools/load-files';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import resolvers from '../graphql/resolvers';

export default async (httpServer) =>
  new ApolloServer({
    typeDefs: await loadFiles('src/graphql/typeDefs/**/*.graphql'),
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    formatError: ({ message, extensions }) => ({
      message,
      code: extensions.code || 'INTERNAL_SERVER_ERROR',
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
