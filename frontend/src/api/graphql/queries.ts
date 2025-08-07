import { gql } from "@apollo/client";

export const recoverEmissionsSectors = gql`
  query Query {
    emissionSectors {
      id,
      consumptions {
        id,
        usageMeasureUnit
      }
    }
  }
`;


export const calculations = gql`
  query calculations($calculationsInput: [CalculationInput!]!) {
    calculations(calculationsInput: $calculationsInput) {
      rawValue
      formattedValue
    }
  }
`
