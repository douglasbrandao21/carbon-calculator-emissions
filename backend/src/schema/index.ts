import { createSchema } from 'graphql-yoga';

import { types } from './types';
import { queries } from './queries';

import EmissionSectorsResolver from '../resolvers/EmissionSectorsResolver';
import CalculationsResolver from '../resolvers/CalculationsResolver';

export const schema = createSchema({
  typeDefs: `
    ${types}
    ${queries}
  `,
  resolvers: {
    Query: {
      emissionSectors: EmissionSectorsResolver.execute,
      calculations: CalculationsResolver.execute
    }
  }
});
