import type Consumption from "./Consumption";

export interface EmissionSector {
  id: string;
  consumptions: Consumption[];
}
