/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSItem extends foundry.documents.Item {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSItem} item      The item preparing derived data.
     */
    Hooks.callAll("TS.prepareItemData", this);
  }

  /* -------------------------------------------------- */

  /**
   * The item's name, followed by its (quantity).
   * @type {string}
   */
  get nameWithQuantity() {
    const quantity = this.system.quantity;
    return quantity > 1 ? `${this.name} (${quantity})` : this.name;
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
   * Stops a Champion from following more Ways than the rules allow.
   * Only Ways created inside an actor are checked, so world Ways in the sidebar are not limited.
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
    return allowed;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static getDefaultArtwork(itemData) {
    const img = CONFIG.TS.defaultIcons[itemData.type];
    return img ? { img } : super.getDefaultArtwork(itemData);
  }

}
