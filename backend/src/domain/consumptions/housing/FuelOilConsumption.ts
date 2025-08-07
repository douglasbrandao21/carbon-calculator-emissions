import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class FuelOilConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(usedFuelOilByYear: number): ConsumptionCalculation {
    var rawValue = (usedFuelOilByYear) * this.emissionFactor;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
