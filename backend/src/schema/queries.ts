export const queries = `
  type Query {
    emissionSectors: [EmissionSector!]!
    calculations(calculationsInput: [CalculationInput!]!): [CalculationResult]
  }
`
