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
      toggleEquipped: this.#toggleEquipped,
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
      context.carried = this.actor.items
        .filter((item) => (item.type === "item") && !item.system.equipped)
        .map((item) => ({
          id: item.id,
          img: item.img,
          label: item.nameWithQuantity,
          slotsUsed: item.system.slotsUsed,
        }));
      context.ingredients = this.actor.items
        .filter((item) => item.type === "ingredient")
        .map((item) => ({
          id: item.id,
          label: item.nameWithQuantity,
        }));
      context.zin = Object.keys(this.actor.system.zin).map((key) => ({
        key: key,
        value: this.actor.system.zin[key],
        label: game.i18n.localize(`TS.Champion.FIELDS.zin.${key}.label`),
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

  /**
   * Equips or unequips an item, up to the maximum number of equipped items.
   *
   * @this TSChampionSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #toggleEquipped(event, target) {
    const item = this._getEmbeddedDocument(target);
    const equipping = !item.system.equipped;
    if (equipping) {
      const equippedCount = this.actor.items.filter((other) => other.system.equipped).length;
      if (equippedCount >= CONFIG.TS.inventory.maxEquipped) {
        ui.notifications.warn(game.i18n.localize("TS.Inventory.equippedFull"));
        return;
      }
    }
    await item.update({ "system.equipped": equipping });
  }
}
