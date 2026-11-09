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

TS.rollModes = {
  normal: { formula: "1d12" },
  advantage: { formula: "2d12kl", label: "TS.Roll.advantage" },
  disadvantage: { formula: "2d12kh", label: "TS.Roll.disadvantage" },
};

/* --------------------------------------------- */
/* CHAMPION STATS.                               */
/* --------------------------------------------- */

TS.abilityScore = {
  min: 5,
  max: 10,
};

TS.hearts = {
  base: 10,
  limit: 35,
};

TS.stamina = {
  min: 0,
  base: 3,
  limit: 8,
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

/* --------------------------------------------- */
/* Item Types                                    */
/* --------------------------------------------- */

TS.inventory = {
  slotsPerStrength: 2,
  maxEquipped: 3,
};

TS.ways = {
  limit: 2,
};

TS.defaultIcons = {
  item: "icons/svg/item-bag.svg",
  ingredient: "icons/svg/pill.svg",
  weapon: "icons/svg/sword.svg",
  armor: "icons/svg/shield.svg",
  way: "icons/svg/sun.svg",
};

/* --------------------------------------------- */
/* WEAPONS AND ARMOR.                            */
/* --------------------------------------------- */

TS.weaponKinds = {
  melee: { label: "TS.Weapon.Kinds.melee" },
  ranged: { label: "TS.Weapon.Kinds.ranged" },
  shield: { label: "TS.Weapon.Kinds.shield" },
};

TS.ranges = {
  close: { label: "TS.Weapon.Ranges.close" },
  near: { label: "TS.Weapon.Ranges.near" },
  far: { label: "TS.Weapon.Ranges.far" },
};

TS.weaponFeats = {
  accurate: { label: "TS.Weapon.Feats.accurate" },
  arcane: { label: "TS.Weapon.Feats.arcane" },
  boomerang: { label: "TS.Weapon.Feats.boomerang" },
  defensive: { label: "TS.Weapon.Feats.defensive" },
  elemental: { label: "TS.Weapon.Feats.elemental" },
  finesse: { label: "TS.Weapon.Feats.finesse" },
  heavy: { label: "TS.Weapon.Feats.heavy" },
  magic: { label: "TS.Weapon.Feats.magic" },
  small: { label: "TS.Weapon.Feats.small" },
  thrown: { label: "TS.Weapon.Feats.thrown" },
  twoHanded: { label: "TS.Weapon.Feats.twoHanded" },
  versatile: { label: "TS.Weapon.Feats.versatile" },
};

TS.armorTypes = {
  clothing: { label: "TS.Armor.Types.clothing" },
  light: { label: "TS.Armor.Types.light" },
  medium: { label: "TS.Armor.Types.medium" },
  heavy: { label: "TS.Armor.Types.heavy" },
};

export default TS;
