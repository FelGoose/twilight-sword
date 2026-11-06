/**
 * The Twilight Sword system configuration, assigned to `CONFIG.TS`.
 */
const TS = {};

/* --------------------------------------------- */
/* ABILITIES.                                    */
/* --------------------------------------------- */

TS.abilities = {
  str: { label: "TS.Champion.FIELDS.abilities.str.label" },
  agl: { label: "TS.Champion.FIELDS.abilities.agl.label" },
  vit: { label: "TS.Champion.FIELDS.abilities.vit.label" },
  per: { label: "TS.Champion.FIELDS.abilities.per.label" },
  wil: { label: "TS.Champion.FIELDS.abilities.wil.label" },
  kno: { label: "TS.Champion.FIELDS.abilities.kno.label" },
  cha: { label: "TS.Champion.FIELDS.abilities.cha.label" },
  ste: { label: "TS.Champion.FIELDS.abilities.ste.label" },
};

/* --------------------------------------------- */
/* ABILITY ROLLS.                                */
/* --------------------------------------------- */

TS.abilityRoll = {
  maxModifier: 3,
  criticalSuccess: 1,
  criticalFailure: 12,
};

TS.inventory = {
  slotsPerStrength: 2,
  maxEquipped: 3,
};

TS.rollModes = {
  normal: { formula: "1d12" },
  advantage: { formula: "2d12kl", label: "TS.Roll.advantage" },
  disadvantage: { formula: "2d12kh", label: "TS.Roll.disadvantage" },
};

/* --------------------------------------------- */
/* CONDITIONS.                                   */
/* --------------------------------------------- */

TS.conditions = {
  poison: { label: "TS.Condition.poison", icon: "fa-solid fa-skull-crossbones" },
  stun: { label: "TS.Condition.stun", icon: "fa-solid fa-face-dizzy" },
  confusion: { label: "TS.Condition.confusion", icon: "fa-solid fa-circle-question" },
  wound: { label: "TS.Condition.wound", icon: "fa-solid fa-bandage" },
  fear: { label: "TS.Condition.fear", icon: "fa-solid fa-ghost" },
  freeze: { label: "TS.Condition.freeze", icon: "fa-solid fa-snowflake" },
  blind: { label: "TS.Condition.blind", icon: "fa-solid fa-eye-slash" },
  silence: { label: "TS.Condition.silence", icon: "fa-solid fa-volume-xmark" },
  burn: { label: "TS.Condition.burn", icon: "fa-solid fa-fire" },
  ko: { label: "TS.Condition.ko", icon: "fa-solid fa-heart-crack" },
};

export default TS;
