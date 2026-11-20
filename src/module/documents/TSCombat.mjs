/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSCombat extends foundry.documents.Combat {
  /** @inheritdoc */
  prepareDerivedData() {

    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSCombat} combat      The combat preparing derived data.
     */
    Hooks.callAll("TS.prepareCombatData", this);
  }
}
