/**
 * Searches through an object recursively and localizes strings.
 * @param {Record<string, unknown>} object
 */
export function localizeHelper(object) {
  for (const [key, value] of Object.entries(object)) {
    switch (typeof value) {
      case "object":
        if (value) localizeHelper(value);
        break;
      case "string":
        if (key === "label") object[key] = game.i18n.localize(value);
        break;
    }
  }
}

/**
 * Turns a config object such as `TS.ranges` into a `{ key: label }` object for a field's choices.
 * @param {Record<string, {label: string}>} config   A config object whose entries have a label.
 * @returns {Record<string, string>} The keys with their labels.
 */
export function choicesFromConfig(config) {
  return Object.fromEntries(Object.entries(config).map(([key, { label }]) => [key, label]));
}

/* -------------------------------------------------- */

/**
 * Prepare the data structure for Active Effects which are currently embedded in an Actor or Item.
 * @param {ActiveEffect[]} effects    A collection or generator of Active Effect documents to prepare sheet data for.
 * @return {object}                   Data for rendering.
 */
export function prepareActiveEffectCategories(effects) {
  const categories = {
    temporary: {
      type: "temporary",
      label: game.i18n.localize("TS.Effect.Temporary"),
      effects: [],
    },
    passive: {
      type: "passive",
      label: game.i18n.localize("TS.Effect.Passive"),
      effects: [],
    },
    inactive: {
      type: "inactive",
      label: game.i18n.localize("TS.Effect.Inactive"),
      effects: [],
    },
  };

  // Iterate over active effects, classifying them into categories
  for (const e of effects) {
    if (!e.active) categories.inactive.effects.push(e);
    else if (e.isTemporary) categories.temporary.effects.push(e);
    else categories.passive.effects.push(e);
  }

  // Sort each category
  for (const c of Object.values(categories)) {
    c.effects.sort((a, b) => (a.sort || 0) - (b.sort || 0));
  }
  return categories;
}
