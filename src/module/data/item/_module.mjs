import ArmorModel from "./armor.mjs";
import CarriedModel from "./carried.mjs";
import IngredientModel from "./ingredient.mjs";
import ItemModel from "./item.mjs";
import KinModel from "./kin.mjs";
import WayModel from "./way.mjs";
import WeaponModel from "./weapon.mjs";

const config = {
  item: ItemModel,
  ingredient: IngredientModel,
  weapon: WeaponModel,
  armor: ArmorModel,
  way: WayModel,
  kin: KinModel,
};

export { ArmorModel, CarriedModel, IngredientModel, KinModel, ItemModel, WayModel, WeaponModel, config };
