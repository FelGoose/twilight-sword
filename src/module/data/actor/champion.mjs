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
      }),
      abilities: new foundry.data.fields.SchemaField({
        str: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        agl: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        vit: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        per: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        wil: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        kno: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        cha: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
        ste: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          })
        }),
      })
    };
  }
}
