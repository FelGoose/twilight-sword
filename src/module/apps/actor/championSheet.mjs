import { TSActorSheet } from "./actorSheet.mjs";
import { systemPath } from "../../constants.mjs";

/**
 * The Champion Sheet.
 */
export class TSChampionSheet extends TSActorSheet {
  static PARTS = { ...TSActorSheet.PARTS,
    properties: {
      template: systemPath("templates/actor/champion-sheet.hbs"),
      scrollable: [""],
    },
  };

  /** @inheritdoc */
  async _preparePartContext(partId, context) {
    const parentPart = await super._preparePartContext(partId, context);
    if (partId === "properties") {
      parentPart.abilities = Object.entries(this.actor.system.abilities).map(([key, ability]) => ({
        key: key,
        label: game.i18n.localize(`TS.Champion.FIELDS.abilities.${key}.label`),
        value: ability.value,
      }));
    }
    return parentPart;
  }
}
