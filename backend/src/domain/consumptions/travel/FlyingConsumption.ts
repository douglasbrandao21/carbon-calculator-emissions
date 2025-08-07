import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class FlyingConsumption extends Consumption {
  readonly rediativeForcingMultiplier = 1.09;

  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(kilometersByYear: number): ConsumptionCalculation {
    var rawValue = kilometersByYear * this.rediativeForcingMultiplier * this.emissionFactor;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
