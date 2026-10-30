/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSCards extends foundry.documents.Cards {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSCards} cards      The cards preparing derived data.
     */
    Hooks.callAll("TS.prepareCardsData", this);
  }
}
