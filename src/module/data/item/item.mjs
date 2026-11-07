import CarriedModel from "./carried.mjs";

/**
 * Data model for ordinary carried items.
 */
export default class ItemModel extends CarriedModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "TS.Item"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      quantity: new foundry.data.fields.NumberField({
        integer: true,
        min: 0,
        initial: 1,
      }),
    };
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  prepareDerivedData() {
    this.slotsUsed = this.slots * this.quantity;
  }
}
