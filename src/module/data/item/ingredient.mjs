/**
 * Data model for ingredients and components.
 */
export default class IngredientModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["TS.Ingredient"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new foundry.data.fields.HTMLField(),
      quantity: new foundry.data.fields.NumberField({
        integer: true,
        min: 0,
        initial: 1,
      }),
    };
  }
}
