/**
 * The Twilight Sword system configuration, assigned to `CONFIG.TS`.
 */
const TS = {};

/** --------------------------------------------- */
/** ABILITY ROLLS.                                */
/** --------------------------------------------- */

TS.abilityRoll = {
  maxModifier: 3,
  criticalSuccess: 1,
  criticalFailure: 12,
};

TS.rollModes = {
  normal: { formula: "1d12" },
  advantage: { formula: "2d12kl", label: "TS.Roll.advantage" },
  disadvantage: { formula: "2d12kh", label: "TS.Roll.disadvantage" },
};

export default TS;
