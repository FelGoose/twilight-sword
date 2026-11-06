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
        label: CONFIG.TS.abilities[key].label,
        value: ability.value,
      }));
      parentPart.conditions = Object.entries(CONFIG.TS.conditions).map(([key, condition]) => ({
        key: key,
        label: condition.label,
        icon: condition.icon,
        active: this.actor.system.conditions[key],
      }));
    }
    return parentPart;
  }

  static DEFAULT_OPTIONS = {
    position: {
      height: 1000,
      width: 1000,
    },
    actions: { rollAbility: this.#rollAbility },
  };

  /** Opens a dialog so that the player can choose modifier or advantage/disadvantage. Rolls the ability.
   * @this TSChampionSheet
   * @param {PointerEvent} event   The click event.
   * @param {HTMLElement} target   The button that was clicked [data-action].
   * @protected
   */
  static async #rollAbility(event, target) {
    const key = target.dataset.ability;
    const html = await foundry.applications.handlebars.renderTemplate(
      systemPath("templates/dialogs/roll-dialog.hbs"),
      {},
    );
    const result = await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize("TS.Roll.title") },
      content: html,
    });

    if (!result) return;
    await this.actor.rollAbility(key, result);
  }
}
