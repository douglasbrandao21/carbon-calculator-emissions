import Consumption from "./Consumption";

export default class EmissionSector {
  readonly id: string;
  readonly consumptions: Consumption[];

  constructor(id: string, consumptions: Consumption[]) {
    this.id = id;
    this.consumptions = consumptions;
  }
}
