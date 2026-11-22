import { countEquipped, toEquipEntry } from "../helpers/equipment.mjs";

/**
 * Twilight Sword items: quantity label, the inventory slot rule, the per-champion limits
 * on Ways and Kin, the equip rules (equipped item limit, one worn armor) and default icons per item type.
 */
export default class TSItem extends foundry.documents.Item {
  /**
   * The item's quantity as shown on the champion sheet ("x2"), or an empty string for one item
   * or for types without a quantity.
   * @type {string}
   */
  get quantityLabel() {
    const quantity = this.system.quantity;
    return quantity > 1 ? game.i18n.format("TS.Inventory.quantity", { quantity }) : "";
  }

  /* -------------------------------------------------- */

  /**
   * Whether this item is using inventory slots.
   * @type {boolean}
   */
  get takesSlots() {
    return (this.system.slotsUsed !== undefined) && !this.system.equipped;
  }

  /* -------------------------------------------------- */

  /**
   * Equips or unequips this item. Armor is worn one piece at a time and does not count toward the equipped limit,
   * so equipping armor also takes off whatever armor was worn, in the same batch.
   * The equip rules are checked in {@link TSItem._preUpdateOperation}, which shows the warning when they refuse.
   * @returns {Promise<void>}
   */
  async toggleEquipped() {
    if (!this.actor) {
      return;
    }

    const updates = [];
    if (!this.system.equipped && (this.type === "armor")) {
      const worn = this.actor.items.find((item) => (item.type === "armor") && item.system.equipped);
      if (worn) {
        updates.push({ _id: worn.id, "system.equipped": false });
      }
    }
    updates.push({ _id: this.id, "system.equipped": !this.system.equipped });
    await this.actor.updateEmbeddedDocuments("Item", updates);
  }

  /* -------------------------------------------------- */

  /**
   * Stops a Champion from following more Ways than the rules allow.
   * Only Ways created inside an actor are checked, so world Ways in the sidebar are not limited.
   * An item created inside an actor (for example dropped from another champion) arrives unequipped.
   *
   * @inheritdoc
   */
  async _preCreate(data, options, user) {
    const allowed = await super._preCreate(data, options, user);
    if (allowed === false) {
      return false;
    }

    const limit = CONFIG.TS.itemLimits[this.type];
    if (this.parent && (limit !== undefined)) {
      const count = this.parent.items.filter((item) => item.type === this.type).length;
      if (count >= limit) {
        const type = game.i18n.localize(`TYPES.Item.${this.type}`);
        ui.notifications.warn(game.i18n.format("TS.Item.limitReached", { type, limit }));
        return false;
      }
    }

    if (this.parent && this.system.equipped) {
      this.updateSource({ "system.equipped": false });
    }
    return allowed;
  }

  /* -------------------------------------------------- */

  /**
   * Refuses an update batch that would break the equip rules on a champion: a second worn armor, or more equipped
   * slots than the champion's limit (heavy weapons count 2, small pairs count 1, see {@link groupEquipped}).
   * Runs once per batch, after every item's `_preUpdate`, so it sees the champion as it would be after the whole
   * batch (an armor swap in one batch is allowed). Covers every path, such as the item sheet checkbox.
   * Returning `false` cancels the whole batch.
   * Only batches that equip something, or change the feats or kind of an equipped item, are checked, and only
   * on a champion.
   *
   * @inheritdoc
   */
  static async _preUpdateOperation(documents, operation, user) {
    const allowed = await super._preUpdateOperation(documents, operation, user);
    if (allowed === false) {
      return false;
    }

    const champion = operation.parent;
    if (champion?.type !== "champion") {
      return allowed;
    }

    const changes = new Map();
    for (const update of operation.updates) {
      changes.set(update._id, {
        equipped: foundry.utils.getProperty(update, "system.equipped"),
        feats: foundry.utils.getProperty(update, "system.feats"),
        kind: foundry.utils.getProperty(update, "system.kind"),
      });
    }

    const isEquippedAfter = (item) => changes.get(item.id)?.equipped ?? item.system.equipped;
    const equippedAfter = champion.items.filter(isEquippedAfter);
    const needsCheck = equippedAfter.some((item) => {
      const change = changes.get(item.id);
      return change && ((change.equipped === true) || (change.feats !== undefined) || (change.kind !== undefined));
    });
    if (!needsCheck) {
      return allowed;
    }

    const wornArmor = equippedAfter.filter((item) => item.type === "armor").length;
    if (wornArmor > 1) {
      ui.notifications.warn(game.i18n.localize("TS.Equipment.armorWorn"));
      return false;
    }

    const entriesAfter = equippedAfter
      .filter((item) => item.type !== "armor")
      .map((item) => {
        const entry = toEquipEntry(item);
        const change = changes.get(item.id);
        if ((entry.type === "weapon") && (change?.feats !== undefined)) {
          entry.feats = new Set(change.feats);
        }
        if ((entry.type === "weapon") && (change?.kind !== undefined)) {
          entry.kind = change.kind;
        }
        return entry;
      });

    const max = champion.system.equipment.max;
    if (countEquipped(entriesAfter) > max) {
      ui.notifications.warn(game.i18n.format("TS.Equipment.equippedFull", { maxEquipped: max }));
      return false;
    }
    return allowed;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static getDefaultArtwork(itemData) {
    const img = CONFIG.TS.defaultIcons[itemData.type];
    return img ? { img } : super.getDefaultArtwork(itemData);
  }

}
