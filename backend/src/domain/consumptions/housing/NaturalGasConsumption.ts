import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class NaturalGasConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(usedNaturalGasByYear: number): ConsumptionCalculation {
    var rawValue = (usedNaturalGasByYear) * this.emissionFactor;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
