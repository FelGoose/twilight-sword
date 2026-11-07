import CarriedModel from "./carried.mjs";
import TS from "../../config.mjs";
import { choicesFromConfig } from "../../helpers/utils.mjs";

/**
 * Data model for weapons and shields.
 */
export default class WeaponModel extends CarriedModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "TS.Weapon"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      kind: new foundry.data.fields.StringField({
        choices: choicesFromConfig(TS.weaponKinds),
        initial: "melee",
      }),
      range: new foundry.data.fields.StringField({
        choices: choicesFromConfig(TS.ranges),
        initial: "close",
      }),
      damage: new foundry.data.fields.StringField({
        initial: "1d4",
        validate: (value) => Roll.validate(value),
      }),
      feats: new foundry.data.fields.SetField(
        new foundry.data.fields.StringField({ choices: choicesFromConfig(TS.weaponFeats) }),
      ),
    };
  }
}
