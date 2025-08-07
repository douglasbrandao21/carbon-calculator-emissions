import { WEEKS_IN_YEAR } from "../../../common/static.types";
import ConsumptionCalculation from "../../../interfaces/ConsumptionCalculation";
import Consumption from "../../Consumption";

export default class WasteDisposalConsumption extends Consumption {
  constructor(id: string, emissionFactor: number, usageMeasureUnit: string) {
    super(id, emissionFactor, usageMeasureUnit);
  }

  performFootprintCalculation(producedWasteByWeek: number): ConsumptionCalculation {
    var rawValue = (producedWasteByWeek) * this.emissionFactor * WEEKS_IN_YEAR;

    return {
      rawValue,
      formattedValue: this.format(rawValue),
    }
  }
}
