export default class ChampionModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["UTS.Champion"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      origin: new foundry.data.fields.StringField(),
      hearts: new foundry.data.fields.NumberField({
        required: true,
        integer: true,
        initial: 5,
      }),
    };
  }
}
