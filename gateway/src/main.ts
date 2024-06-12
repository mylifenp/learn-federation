import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';

const subgraph_details = [
  { name: 'products', port: 4001, base_url: 'http://localhost' },
  { name: 'reviews', port: 4002, base_url: 'http://localhost' },
  { name: 'locations', port: 4003, base_url: 'http://localhost' },
];

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: subgraph_details.map((subgraph) => ({
      name: subgraph.name,
      url: `${subgraph.base_url}:${subgraph.port}/graphql`,
    })),
  }),
});

const server = new ApolloServer({ gateway });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
