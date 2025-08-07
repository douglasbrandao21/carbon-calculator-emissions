import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class LiquefiedPetroleumGasConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(usedLPGByYear: number): ConsumptionCalculation {
    var rawValue = (usedLPGByYear) * this.emissionFactor;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
