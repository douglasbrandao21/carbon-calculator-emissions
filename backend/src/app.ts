import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'

import { schema } from './schema'

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql"
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql")
});
