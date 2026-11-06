import { TSActorSheet } from "./actorSheet.mjs";
import { systemPath } from "../../constants.mjs";

/**
 * The Champion Sheet.
 */
export class TSChampionSheet extends TSActorSheet {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    position: {
      height: 1000,
      width: 1000,
    },
    actions: {
      rollAbility: this.#rollAbility,
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static PARTS = {
    tabs: TSActorSheet.PARTS.tabs,
    properties: {
      template: systemPath("templates/actor/champion-sheet.hbs"),
      scrollable: [""],
    },
    effects: TSActorSheet.PARTS.effects,
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [
        { id: "properties" },
        { id: "effects" },
      ],
      initial: "properties",
      labelPrefix: "TS.Sheets.Tabs",
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);
    if (partId === "properties") {
      context.abilities = Object.entries(this.actor.system.abilities).map(([key, ability]) => ({
        key: key,
        label: CONFIG.TS.abilities[key].label,
        value: ability.value,
      }));
      context.conditions = Object.entries(CONFIG.TS.conditions).map(([key, condition]) => ({
        key: key,
        label: condition.label,
        icon: condition.icon,
        active: this.actor.system.conditions[key],
      }));
    }
    return context;
  }

  /* -------------------------------------------------- */
  /*   Event handlers                                   */
  /* -------------------------------------------------- */

  /**
   * Opens a dialog where the player chooses a modifier or advantage and disadvantage, then rolls the ability.
   *
   * @this TSChampionSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
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
