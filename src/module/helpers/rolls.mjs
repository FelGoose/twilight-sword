/**
 * Decides whether a roll has advantage, disadvantage or neither. Advantage and disadvantage cancel each other out.
 *
 * @param {object} options
 * @param {boolean} [options.advantage]      Whether the roll has advantage.
 * @param {boolean} [options.disadvantage]   Whether the roll has disadvantage.
 * @returns {"normal"|"advantage"|"disadvantage"} The key of the matching roll mode in `CONFIG.TS.rollModes`.
 */
export function getAdvantageMode({ advantage = false, disadvantage = false } = {}) {
  if (advantage && !disadvantage) {
    return "advantage";
  }
  if (disadvantage && !advantage) {
    return "disadvantage";
  }
  return "normal";
}

/**
 * Decides the outcome of an ability roll. A critical result is decided by the die alone, and any other result
 * by comparing the die to the target number.
 *
 * @param {number} die       The number on the die, after advantage or disadvantage has been applied.
 * @param {number} target    The target number, which is the ability score plus the modifier.
 * @param {object} rules     The critical values, normally `CONFIG.TS.abilityRoll`.
 * @param {number} rules.criticalSuccess   The die value that is always a critical success.
 * @param {number} rules.criticalFailure   The die value that is always a critical failure.
 * @returns {"criticalSuccess"|"criticalFailure"|"success"|"failure"} The key of the outcome, used for localization.
 */
export function getRollOutcome(die, target, { criticalSuccess, criticalFailure }) {
  if (die === criticalSuccess) {
    return "criticalSuccess";
  }
  if (die === criticalFailure) {
    return "criticalFailure";
  }
  if (die <= target) {
    return "success";
  }
  return "failure";
}
