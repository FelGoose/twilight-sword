/**
 * Data model for ordinary carried items.
 */
export default class ItemModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["TS.Item"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new foundry.data.fields.HTMLField(),
      slots: new foundry.data.fields.NumberField({
        integer: true,
        min: 0,
        max: 3,
        initial: 1,
      }),
      quantity: new foundry.data.fields.NumberField({
        integer: true,
        min: 0,
        initial: 1,
      }),
      equipped: new foundry.data.fields.BooleanField(),
    };
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  prepareDerivedData() {
    this.slotsUsed = this.slots * this.quantity;
  }
}
