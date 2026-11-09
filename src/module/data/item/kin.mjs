/**
 * Data model for a Kin. A champion has one Kin.
 */
export default class KinModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["TS.Kin"];

  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new foundry.data.fields.HTMLField(),
      kinFeat: new foundry.data.fields.HTMLField(),
    };
  }
}
