import EmissionSectorResolver from '../src/resolvers/EmissionSectorsResolver';
import Data from '../src/config/BootstrapData';

describe('EmissionSectorResolver', () => {
  it('should return all emission sectors', () => {
    const result = EmissionSectorResolver.execute();

    expect(result).toEqual(Data);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('consumptions');
  });
});
