export const types = `
  enum EmissionSectorEnum {
    HOUSING
    FOOD
    TRAVEL
  }

  enum ConsumptionEnum {
    ELECTRICITY
    NATURAL_GAS
    FUEL_OIL
    LPG
    WASTE
    WATER
    VEHICLE
    PUBLIC_TRANSPORT
    FLYING
    RED_MEAT
    WHITE_MEAT
    DAIRY
    CEREALS
    VEGETABLES
    FRUIT
    OILS
    SNACKS
    DRINKS
  }

  type Consumption {
    id: String!
    emissionFactor: Float!
    usageMeasureUnit: String!
  }

  type EmissionSector {
    id: String!
    consumptions: [Consumption!]!
  }

  input CalculationInput {
    emissionSector: EmissionSectorEnum!
    consumptionType: ConsumptionEnum!
    usage: Float!
  }

  type CalculationResult {
    rawValue: Float!
    formattedValue: String!
  }
`
