import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class PublicTransportConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(kilometersByYear: number): ConsumptionCalculation {
    var rawValue = (kilometersByYear) * this.emissionFactor;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
