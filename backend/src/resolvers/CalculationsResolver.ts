import CalculationInput from "../interfaces/CalculationInput";
import Data from '../config/BootstrapData';

class CalculationsResolver {
  execute(_: any, args: { calculationsInput: [CalculationInput] }) {
    const { calculationsInput } = args;

    const response = calculationsInput.map(calculation => {
      const emissionSector = Data.find(data => data.id === calculation.emissionSector);

      const consumption = emissionSector?.consumptions.find(
        consumption => consumption.id === calculation.consumptionType
      );

      return consumption?.performFootprintCalculation(calculation.usage);
    });

    return response;
  }
}

export default new CalculationsResolver();
