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

  /** @inheritdoc */
  static getDefaultArtwork(itemData) {
    const img = CONFIG.TS.defaultIcons[itemData.type];
    return img ? { img } : super.getDefaultArtwork(itemData);
  }

}
