import { DAYS_IN_YEAR } from "../../../common/static.types";
import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class WaterConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(usedWaterByDay: number): ConsumptionCalculation {
    var rawValue = (usedWaterByDay) * this.emissionFactor * DAYS_IN_YEAR;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
