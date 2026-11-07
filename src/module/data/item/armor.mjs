import CarriedModel from "./carried.mjs";
import TS from "../../config.mjs";
import { choicesFromConfig } from "../../helpers/utils.mjs";

/**
 * Data model for armor and clothing.
 */
export default class ArmorModel extends CarriedModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "TS.Armor"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      armorType: new foundry.data.fields.StringField({
        choices: choicesFromConfig(TS.armorTypes),
        initial: "clothing",
      }),
      armorValue: new foundry.data.fields.NumberField({
        integer: true,
        min: 0,
        max: 3,
        initial: 0,
      }),
    };
  }
}
