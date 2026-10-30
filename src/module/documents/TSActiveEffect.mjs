/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSActiveEffect extends foundry.documents.ActiveEffect {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSActiveEffect} effect      The effect preparing derived data.
     */
    Hooks.callAll("TS.prepareActiveEffectData", this);
  }
}
