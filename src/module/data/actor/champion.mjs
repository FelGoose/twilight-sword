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
          min: TS.stamina.min,
          initial: TS.stamina.base,
        }),
        bonus: new foundry.data.fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
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
                min: TS.abilityScore.min,
                max: TS.abilityScore.max,
                initial: TS.abilityScore.min,
              }),
            }),
          ]),
        ),
      ),
    };
  }
  /** @inheritdoc */
  prepareDerivedData() {
    this.hearts.max = Math.min(TS.hearts.base + this.abilities.vit.value + this.hearts.bonus, TS.hearts.limit);
    this.stamina.max = Math.min(TS.stamina.base + this.stamina.bonus, TS.stamina.limit);
    const carried = this.parent.items.filter((item) => item.takesSlots);
    this.slots = {
      used: carried.reduce((total, item) => total + item.system.slotsUsed, 0),
      max: this.abilities.str.value * TS.inventory.slotsPerStrength,
    };
    this.encumbered = this.slots.used > this.slots.max;

    const equipped = this.parent.items.filter((item) => item.system.equipped);
    const armor = equipped.find((item) => item.type === "armor");
    this.equipment = {
      used: equipped.filter((item) => item.type !== "armor").length,
      max: TS.inventory.maxEquipped,
    };
    this.armor = armor?.system.armorValue ?? 0;
  }
}
