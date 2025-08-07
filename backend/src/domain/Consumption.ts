import ConsumptionCalculation from "../interfaces/ConsumptionCalculation";

export default abstract class Consumption {
  readonly id: string;
  readonly emissionFactor: number;
  readonly usageMeasureUnit: string;

  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    this.id = id;
    this.emissionFactor = emissionFactor;
    this.usageMeasureUnit = usageMeasureUnit;
  }

  abstract performFootprintCalculation(usedAmount: number): ConsumptionCalculation;

  format(value: number) {
    return `${Math.trunc(value * 100) / 100}kg CO2e/yr`;
  }
}
