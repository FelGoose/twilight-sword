export default class ChampionModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["UTS.Champion"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return {
      origin: new foundry.data.fields.StringField(),
      hearts: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({
          integer: true,
          initial: 1,
        }),
        bonus: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
        temp: new foundry.data.fields.NumberField({
          integer: true,
          initial: 0,
        }),
      }),
      stamina: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 3,
        }),
        bonus: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
      }),
      armor: new foundry.data.fields.NumberField({
        integer: true,
        min: 0,
        max: 3,
        initial: 0,
      }),
      boon: new foundry.data.fields.BooleanField(),
      zin: new foundry.data.fields.SchemaField({
        green: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
        blue: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
        red: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
      }),
      abilities: new foundry.data.fields.SchemaField({
        str: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        agl: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        vit: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        per: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        wil: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        kno: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        cha: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
        ste: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            integer: true,
            min: 5,
            max: 10,
            initial: 5,
          }),
        }),
      }),
    };
  }
  /** @inheritdoc */
  prepareDerivedData() {
    this.hearts.max = Math.min(10 + this.abilities.vit.value + this.hearts.bonus, 35);
    this.stamina.max = Math.min(3 + this.stamina.bonus, 8);
  }

}
