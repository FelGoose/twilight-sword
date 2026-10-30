/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSCombatant extends foundry.documents.Combatant {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSCombatant} combatant      The combatant preparing derived data.
     */
    Hooks.callAll("TS.prepareCombatantData", this);
  }
}
