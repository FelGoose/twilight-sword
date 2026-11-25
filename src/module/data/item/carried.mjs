import TS from "../../config.mjs";

/**
 * Base data for items that take up inventory slots while they are carried.
 */
export default class CarriedModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["TS.Carried"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new foundry.data.fields.HTMLField(),
      slots: new foundry.data.fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        min: 0,
        max: TS.itemSlots.limit,
        initial: 1,
      }),
      cost: new foundry.data.fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        min: 0,
        initial: 0,
      }),
      equipped: new foundry.data.fields.BooleanField(),
    };
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  prepareDerivedData() {
    this.slotsUsed = this.slots;
  }
}
