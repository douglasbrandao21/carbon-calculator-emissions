import { CEREALS, DAIRY, DRINKS, ELECTRICITY, FLYING, FOOD, FRUIT, FUEL_OIL, HOUSING, LPG, NATURAL_GAS, OILS, PUBLIC_TRANSPORT, RED_MEAT, SNACKS, TRAVEL, VEGETABLES, VEHICLE, WASTE, WATER, WHITE_MEAT } from "../common/static.types";
import CerealsConsumption from "../domain/consumptions/food/CerealsConsumption";
import DairyConsumption from "../domain/consumptions/food/DairyConsumption";
import DrinksConsumption from "../domain/consumptions/food/DrinksConsumption";
import FruitConsumption from "../domain/consumptions/food/FruitConsumption";
import OilsConsumption from "../domain/consumptions/food/OilsConsumption";
import RedMeatConsumption from "../domain/consumptions/food/RedMeatConsumption";
import SnacksConsumption from "../domain/consumptions/food/SnacksConsumption";
import VegetablesConsumption from "../domain/consumptions/food/VegetablesConsumption";
import WhiteMeatConsumption from "../domain/consumptions/food/WhiteMeatConsumption";
import ElectricityConsumption from "../domain/consumptions/housing/ElectricityConsumption";
import FuelOilConsumption from "../domain/consumptions/housing/FuelOilConsumption";
import LiquefiedPetroleumGasConsumption from "../domain/consumptions/housing/LiquefiedPetroleumGasConsumption";
import NaturalGasConsumption from "../domain/consumptions/housing/NaturalGasConsumption";
import WasteDisposalConsumption from "../domain/consumptions/housing/WasteDisposalConsumption";
import WaterConsumption from "../domain/consumptions/housing/WaterConsumption";
import FlyingConsumption from "../domain/consumptions/travel/FlyingConsumption";
import PublicTransportConsumption from "../domain/consumptions/travel/PublicTransportConsumption";
import VehicleConsumption from "../domain/consumptions/travel/VehicleConsumption";
import EmissionSector from "../domain/EmissionSector";

const data = [
  new EmissionSector(HOUSING, [
    new ElectricityConsumption(ELECTRICITY, 0.7, "kWh/year"),
    new NaturalGasConsumption(NATURAL_GAS, 6.6, "therms/year"),
    new FuelOilConsumption(FUEL_OIL, 3.1, "litres/year"),
    new LiquefiedPetroleumGasConsumption(LPG, 1.8, "litres/year"),
    new WasteDisposalConsumption(WASTE, 1.2, "kg/week"),
    new WaterConsumption(WATER, 0.4, "litres/day")
  ]),
  new EmissionSector(TRAVEL, [
    new VehicleConsumption(VEHICLE, 2.73, "km/year"),
    new PublicTransportConsumption(PUBLIC_TRANSPORT, 0.09, "km/year"),
    new FlyingConsumption(FLYING, 9, "km/year")
  ]),
  new EmissionSector(FOOD, [
    new RedMeatConsumption(RED_MEAT, 0.0138, "kcal/day"),
    new WhiteMeatConsumption(WHITE_MEAT, 0.0058, "kcal/day"),
    new DairyConsumption(DAIRY, 0.0045, "kcal/day"),
    new CerealsConsumption(CEREALS, 0.002, "kcal/day"),
    new VegetablesConsumption(VEGETABLES, 0.0057, "kcal/day"),
    new FruitConsumption(FRUIT, 0.002, "kcal/day"),
    new OilsConsumption(OILS, 0.003, "kcal/day"),
    new SnacksConsumption(SNACKS, 0.006, "kcal/day"),
    new DrinksConsumption(DRINKS, 0.005, "kcal/day")
  ])
]

export default data;
