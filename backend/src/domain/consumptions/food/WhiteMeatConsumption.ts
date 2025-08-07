import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

import { DAYS_IN_YEAR } from "../../../common/static.types";

export default class WhiteMeatConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(consumedKilocaloriesByDay: number): ConsumptionCalculation {
    var rawValue = (consumedKilocaloriesByDay) * DAYS_IN_YEAR * this.emissionFactor;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
