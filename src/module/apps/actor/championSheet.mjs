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
        .filter((item) => item.takesSlots)
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
      context.equipped = this.actor.items
        .filter((item) => item.system.equipped && (item.type !== "armor"))
        .map((item) => this.#prepareEquippedItem(item));
      const { equipment } = this.actor.system;
      context.emptySlots = Array.from({ length: Math.max(equipment.max - equipment.used, 0) });
      const armor = this.actor.items.find((item) => (item.type === "armor") && item.system.equipped);
      context.armor = armor ? {
        id: armor.id,
        label: armor.name,
        type: CONFIG.TS.armorTypes[armor.system.armorType].label,
      } : null;
    }
    return context;
  }

  /**
   * Prepares the display data for an equipped item.
   *
   * @param {TSItem} item   The equipped item.
   * @returns {object} The data the equipment template needs.
   */
  #prepareEquippedItem(item) {
    const data = {
      id: item.id,
      label: item.nameWithQuantity,
      isWeapon: item.type === "weapon",
    };
    if (data.isWeapon) {
      const { weaponKinds, ranges, weaponFeats } = CONFIG.TS;
      Object.assign(data, {
        kind: weaponKinds[item.system.kind].label,
        range: ranges[item.system.range].label,
        damage: item.system.damage,
        feats: Array.from(item.system.feats, (feat) => weaponFeats[feat].label).join(", "),
      });
    }
    return data;
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
      { maxModifier: CONFIG.TS.abilityRoll.maxModifier },
    );
    const result = await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize("TS.Roll.title") },
      content: html,
    });

    if (!result) return;
    await this.actor.rollAbility(key, result);
  }

  /**
   * Equips or unequips an item. Armor is worn one piece at a time and does not count toward the equipped limit,
   * so equipping armor swaps out whatever armor was worn.
   *
   * @this TSChampionSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #toggleEquipped(event, target) {
    const item = this._getEmbeddedDocument(target);
    const updates = [];

    if (item.system.equipped) {
      updates.push({ _id: item.id, "system.equipped": false });
    } else if (item.type === "armor") {
      const worn = this.actor.items.find((other) => (other.type === "armor") && other.system.equipped);
      if (worn) {
        updates.push({ _id: worn.id, "system.equipped": false });
      }
      updates.push({ _id: item.id, "system.equipped": true });
    } else {
      const { used, max } = this.actor.system.equipment;
      if (used >= max) {
        ui.notifications.warn(game.i18n.format("TS.Inventory.equippedFull", { maxEquipped: max }));
        return;
      }
      updates.push({ _id: item.id, "system.equipped": true });
    }

    await this.actor.updateEmbeddedDocuments("Item", updates);
  }
}
