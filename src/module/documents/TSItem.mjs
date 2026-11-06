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

  /** @inheritdoc */
  static defaultName({ type, parent } = {}) {
    const baseName = game.i18n.localize(`TS.Item.defaultName.${type}`);
    const collection = parent?.items ?? game.items;
    const takenNames = new Set(collection.map((item) => item.name));
    let name = baseName;
    let index = 1;
    while (takenNames.has(name)) {
      name = `${baseName} (${++index})`;
    }
    return name;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static getDefaultArtwork(itemData) {
    const img = CONFIG.TS.defaultIcons[itemData.type];
    return img ? { img } : super.getDefaultArtwork(itemData);
  }

}
