/**
 * Data model for a Way. A champion has one Way, or two after an Advancement.
 */
export default class WayModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["TS.Way"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new foundry.data.fields.HTMLField(),
      startingGear: new foundry.data.fields.HTMLField(),
    };
  }
}
