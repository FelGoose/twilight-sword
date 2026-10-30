import { systemPath } from "../constants.mjs";

/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class TSActor extends foundry.documents.Actor {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {TSActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("TS.prepareActorData", this);
  }

  /* -------------------------------------------------- */

  /**
   * Determines if you have advantage, disadvantage, or modifiers.
   * Applies options as needed and rolls the dice.
   * Determines if you succeed, fail, critical succeed, or critical fail.
   * Posts chat message based on roll.
   * @param {string} key  Name of the ability used.
   * @param {object} options   Options for the roll.
   * @param {boolean} [options.advantage]  Determine if roll has advantage.
   * @param {boolean} [options.disadvantage]   Determine if roll has disadvantage.
   * @param {number} [options.modifier]   Determine if roll has modifier.
   * @returns {Promise<object>} The whole roll, die rolled, target number, outcome of roll.
   */
  async rollAbility(key, { advantage = false, disadvantage = false, modifier = 0 } = {}) {
    let formula;
    if (advantage && !disadvantage) {
      formula = "2d12kl";
    } else if (disadvantage && !advantage) {
      formula = "2d12kh";
    } else {
      formula = "1d12";
    }

    const clampedModifier = Math.min(Math.max(modifier, -3), 3);
    const roll = await new Roll(formula).evaluate();
    const die = roll.total;
    const abilityValue = this.system.abilities[key].value;
    const target = abilityValue + clampedModifier;
    let rollOutcome;

    if (die === 1) {
      rollOutcome = "criticalSuccess";
    } else if (die === 12) {
      rollOutcome = "criticalFailure";
    } else if (die <= target) {
      rollOutcome = "success";
    } else {
      rollOutcome = "failure";
    }

    const outcomeLabel = game.i18n.localize(`TS.Roll.outcome.${rollOutcome}`);
    const abilityLabel = game.i18n.localize(`TS.Champion.FIELDS.abilities.${key}.label`);

    let rollMode = null;
    if (formula === "2d12kl") rollMode = game.i18n.localize("TS.Roll.advantage");
    else if (formula === "2d12kh") rollMode = game.i18n.localize("TS.Roll.disadvantage");

    const htmlData = {
      rollOutcome,
      name: this.name,
      abilityLabel,
      outcomeLabel,
      rollMode,
      die,
      target,
      abilityValue,
      modifier: clampedModifier ? clampedModifier.signedString() : null,
      isCritical: rollOutcome.startsWith("critical"),
      // Custom content suppresses Foundry's default dice display, so embed it ourselves.
      rollHTML: await roll.render(),
    };
    const html = await foundry.applications.handlebars.renderTemplate(
      systemPath("templates/chat/ability-roll.hbs"),
      htmlData,
    );

    const messageData = {
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: html,
    };
    await roll.toMessage(messageData);

    return { roll, die, target, rollOutcome };
  }
}
