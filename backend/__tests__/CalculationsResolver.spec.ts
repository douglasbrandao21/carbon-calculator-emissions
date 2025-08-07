import CalculationsResolver from '../src/resolvers/CalculationsResolver';

describe('CalculationsResolver', () => {
  it('should return correct calculations', () => {
    const result = CalculationsResolver.execute(null, {
      calculationsInput: [
        {
          emissionSector: "HOUSING",
          consumptionType: "ELECTRICITY",
          usage: 100,
        },
      ]
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('rawValue');
    expect(typeof result[0]?.formattedValue).toBe('string');
  });
});
