import ArmorModel from "./armor.mjs";
import CarriedModel from "./carried.mjs";
import IngredientModel from "./ingredient.mjs";
import ItemModel from "./item.mjs";
import WeaponModel from "./weapon.mjs";

const config = {
  item: ItemModel,
  ingredient: IngredientModel,
  weapon: WeaponModel,
  armor: ArmorModel,
};

export { ArmorModel, CarriedModel, IngredientModel, ItemModel, WeaponModel, config };
