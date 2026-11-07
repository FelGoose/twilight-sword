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
/* INVENTORY AND ITEMS.                          */
/* --------------------------------------------- */

TS.inventory = {
  slotsPerStrength: 2,
  maxEquipped: 3,
};

TS.defaultIcons = {
  item: "icons/svg/item-bag.svg",
  ingredient: "icons/svg/pill.svg",
  weapon: "icons/svg/sword.svg",
  armor: "icons/svg/shield.svg",
};

/* --------------------------------------------- */
/* WEAPONS AND ARMOR.                            */
/* --------------------------------------------- */

TS.weaponKinds = {
  melee: { label: "TS.Weapon.kinds.melee" },
  ranged: { label: "TS.Weapon.kinds.ranged" },
  shield: { label: "TS.Weapon.kinds.shield" },
};

TS.ranges = {
  close: { label: "TS.Weapon.ranges.close" },
  near: { label: "TS.Weapon.ranges.near" },
  far: { label: "TS.Weapon.ranges.far" },
};

TS.weaponFeats = {
  accurate: { label: "TS.Weapon.feats.accurate" },
  arcane: { label: "TS.Weapon.feats.arcane" },
  boomerang: { label: "TS.Weapon.feats.boomerang" },
  defensive: { label: "TS.Weapon.feats.defensive" },
  elemental: { label: "TS.Weapon.feats.elemental" },
  finesse: { label: "TS.Weapon.feats.finesse" },
  heavy: { label: "TS.Weapon.feats.heavy" },
  magic: { label: "TS.Weapon.feats.magic" },
  small: { label: "TS.Weapon.feats.small" },
  thrown: { label: "TS.Weapon.feats.thrown" },
  twoHanded: { label: "TS.Weapon.feats.twoHanded" },
  versatile: { label: "TS.Weapon.feats.versatile" },
};

TS.armorTypes = {
  clothing: { label: "TS.Armor.types.clothing" },
  light: { label: "TS.Armor.types.light" },
  medium: { label: "TS.Armor.types.medium" },
  heavy: { label: "TS.Armor.types.heavy" },
};

export default TS;
