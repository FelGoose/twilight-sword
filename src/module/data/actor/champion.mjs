import TS from "../../config.mjs";
/**
 * Data model for Twilight Sword champions.
 */
export default class ChampionModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["TS.Champion"];

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
      conditions: new foundry.data.fields.SchemaField(
        Object.fromEntries(
          Object.keys(TS.conditions).map((key) => [key, new foundry.data.fields.BooleanField()]),
        ),
      ),
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
      abilities: new foundry.data.fields.SchemaField(
        Object.fromEntries(
          Object.keys(TS.abilities).map((key) => [
            key,
            new foundry.data.fields.SchemaField({
              value: new foundry.data.fields.NumberField({
                integer: true,
                min: 5,
                max: 10,
                initial: 5,
              }),
            }),
          ]),
        ),
      ),
    };
  }
  /** @inheritdoc */
  prepareDerivedData() {
    this.hearts.max = Math.min(10 + this.abilities.vit.value + this.hearts.bonus, 35);
    this.stamina.max = Math.min(3 + this.stamina.bonus, 8);

    const carried = this.parent.items.filter((item) => (item.type === "item") && !item.system.equipped);
    this.slots = {
      used: carried.reduce((total, item) => total + item.system.slotsUsed, 0),
      max: this.abilities.str.value * TS.inventory.slotsPerStrength,
    };
    this.encumbered = this.slots.used > this.slots.max;
  }

}
