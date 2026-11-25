import { groupEquipped, toEquipEntry } from "../../helpers/equipment.mjs";
import { TSActorSheet } from "./actorSheet.mjs";
import { systemPath } from "../../constants.mjs";

/**
 * The Champion Sheet.
 */
export class TSChampionSheet extends TSActorSheet {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: ["themed", "theme-light"],
    position: {
      height: 1000,
      width: 1040,
    },
    window: {
      resizable: true,
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
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
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
        color: condition.color,
        active: this.actor.system.conditions[key],
      }));
      context.carried = this.actor.items
        .filter((item) => item.takesSlots)
        .map((item) => ({
          id: item.id,
          img: item.img,
          label: item.name,
          quantity: item.quantityLabel,
          slotsUsed: item.system.slotsUsed,
          slotPips: this.#slotPips(item),
        }));
      context.ingredients = this.actor.items
        .filter((item) => item.type === "ingredient")
        .map((item) => ({
          id: item.id,
          img: item.img,
          label: item.name,
          quantity: item.quantityLabel,
        }));
      context.zin = Object.keys(this.actor.system.zin).map((key) => ({
        key: key,
        value: this.actor.system.zin[key],
        label: game.i18n.localize(`TS.Champion.FIELDS.zin.${key}.label`),
      }));
      context.ways = this.#prepareIdentityItems("way");
      context.kin = this.#prepareIdentityItems("kin");
      context.equipped = this.#prepareEquipmentRow();
      context.heavyLabel = CONFIG.TS.weaponFeats.heavy.label;
      const { equipment } = this.actor.system;
      context.emptySlots = Array.from({ length: Math.max(equipment.max - equipment.used, 0) });
      const armor = this.actor.items.find((item) => (item.type === "armor") && item.system.equipped);
      context.armor = armor ? this.#prepareEquippedItem(armor) : null;
    }
    return context;
  }

  /* -------------------------------------------------- */

  /**
   * The champion sheet draws its own layout, so it needs no generic field list.
   * @returns {Promise<object[]>} An empty list.
   */
  async _getFields() {
    return [];
  }

  /**
   * Builds the slot pips shown on item cards and inventory rows: one pip per possible slot,
   * filled for each slot one of this item takes.
   *
   * @param {TSItem} item   An item with slots.
   * @returns {boolean[]} One entry per pip, `true` when filled.
   */
  #slotPips(item) {
    const maxSlots = item.system.schema.getField("slots").max;
    return Array.from({ length: maxSlots }, (_, index) => index < item.system.slots);
  }

  /**
   * Prepares the equipment row (armor excluded) from the slot groups of {@link groupEquipped}: a normal card per
   * item, a reserved box after a heavy weapon, and one stacked card per small pair. The pair's front card is
   * chosen with core tabs, which remember the choice in `this.tabGroups`.
   *
   * @returns {object[]} One entry per box in the row.
   */
  #prepareEquipmentRow() {
    const items = this.actor.items.filter((item) => item.system.equipped && (item.type !== "armor"));
    const groups = groupEquipped(items.map(toEquipEntry));
    return groups.flatMap(({ entries, slots }) => {
      const cards = entries.map((entry) => this.#prepareEquippedItem(this.actor.items.get(entry.id)));
      if (cards.length === 2) {
        const group = `pair-${cards[0].id}`;
        const front = cards.some((card) => card.id === this.tabGroups[group]) ? this.tabGroups[group] : cards[0].id;
        for (const card of cards) {
          card.active = card.id === front;
        }
        return [{ isPair: true, group, cards }];
      }
      if (slots === 2) {
        return [cards[0], { isReserved: true, label: cards[0].label, img: cards[0].img }];
      }
      return cards;
    });
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
      label: item.name,
      quantity: item.quantityLabel,
      img: item.img,
      cost: item.system.cost,
      slotPips: this.#slotPips(item),
      isWeapon: item.type === "weapon",
      isArmor: item.type === "armor",
      description: this.#toPlainText(item.system.description),
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
    if (data.isArmor) {
      Object.assign(data, {
        type: CONFIG.TS.armorTypes[item.system.armorType].label,
        value: item.system.armorValue,
      });
    }
    return data;
  }

  /**
   * Converts an HTML description to plain text to fit on inline text.
   *
   * @param {string} html   The HTML to convert.
   * @returns {string} The text content without markup.
   */
  #toPlainText(html) {
    const doc = new DOMParser().parseFromString(html ?? "", "text/html");
    return doc.body.textContent.trim();
  }

  /**
   * Prepares the display data for the items of one type that the sheet lists by name.
   *
   * @param {string} type   The item type.
   * @returns {object[]} An id and label for each item.
   */
  #prepareIdentityItems(type) {
    return this.actor.items
      .filter((item) => item.type === type)
      .map((item) => ({ id: item.id, label: item.name }));
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
      {
        maxModifier: CONFIG.TS.abilityRoll.maxModifier,
        encumbered: this.actor.system.encumbered,
      },
    );
    const result = await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.format("TS.Roll.rollAbility", { ability: CONFIG.TS.abilities[key].label }) },
      content: html,
    });

    if (!result) return;
    await this.actor.rollAbility(key, result);
  }

  /**
   * Equips or unequips an item. The equip rules live in {@link TSItem#toggleEquipped}.
   *
   * @this TSChampionSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #toggleEquipped(event, target) {
    const item = this._getEmbeddedDocument(target);
    if (!item) return;
    await item.toggleEquipped();
  }
}
