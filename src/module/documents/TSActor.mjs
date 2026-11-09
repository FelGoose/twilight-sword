import { getAdvantageMode, getRollOutcome } from "../helpers/rolls.mjs";
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
   * Rolls an ability check and posts the result to chat. The rules for roll modes and critical values are
   * defined in `config.mjs`. Encumbered champions roll with disadvantage.
   *
   * @param {string} key                       The key of the ability, such as "str".
   * @param {object} [options]                 Options for the roll.
   * @param {boolean} [options.advantage]      Whether the roll has advantage.
   * @param {boolean} [options.disadvantage]   Whether the roll has disadvantage.
   * @param {number} [options.modifier]        A modifier to the target number, limited to the maximum in config.
   * @returns {Promise<object>} The evaluated roll, the die rolled, the target number and the outcome key.
   */
  async rollAbility(key, { advantage = false, disadvantage = false, modifier = 0 } = {}) {
    const { abilityRoll, rollModes } = CONFIG.TS;

    const { encumbered } = this.system;
    const advantageMode = getAdvantageMode({ advantage, disadvantage: disadvantage || encumbered });
    const clampedModifier = Math.clamp(modifier, -abilityRoll.maxModifier, abilityRoll.maxModifier);
    const abilityValue = this.system.abilities[key].value;
    const target = abilityValue + clampedModifier;

    const roll = await new Roll(rollModes[advantageMode].formula).evaluate();
    const die = roll.total;
    const rollOutcome = getRollOutcome(die, target, abilityRoll);

    await this.#postAbilityRoll(roll, {
      rollOutcome,
      target,
      encumbered,
      abilityLabel: CONFIG.TS.abilities[key].label,
      outcomeLabel: game.i18n.localize(`TS.Roll.Outcome.${rollOutcome}`),
      advantageLabel: rollModes[advantageMode].label ?? null,
      die,
      abilityValue,
      modifier: clampedModifier ? clampedModifier.signedString() : null,
      isCritical: rollOutcome.startsWith("critical"),
    });

    return { roll, die, target, rollOutcome };
  }

  /* -------------------------------------------------- */

  /**
   * Renders the ability roll chat template and posts it as a chat message from this actor.
   *
   * @param {Roll} roll        The evaluated roll, shown inside the message.
   * @param {object} data      The data for the chat template.
   * @returns {Promise<ChatMessage>} The created chat message.
   */
  async #postAbilityRoll(roll, data) {
    // Custom content suppresses Foundry's default dice display, so embed it ourselves.
    const content = await foundry.applications.handlebars.renderTemplate(
      systemPath("templates/chat/ability-roll.hbs"),
      { ...data, rollHTML: await roll.render() },
    );
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content,
    });
  }
}
