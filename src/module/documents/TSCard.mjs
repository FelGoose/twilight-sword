/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSCard extends foundry.documents.Card {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSCard} card      The card preparing derived data.
     */
    Hooks.callAll("TS.prepareCardData", this);
  }
}
