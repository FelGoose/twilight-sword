/**
 * Turns an item into the plain entry the equipment helpers work with.
 *
 * @param {TSItem} item   An item on a champion.
 * @returns {{ id: string, type: string, kind: string|null, feats: Set<string> }} The entry.
 */
export function toEquipEntry(item) {
  const isWeapon = item.type === "weapon";
  return {
    id: item.id,
    type: item.type,
    kind: isWeapon ? item.system.kind : null,
    feats: isWeapon ? new Set(item.system.feats) : new Set(),
  };
}

/* -------------------------------------------------- */

/**
 * Groups equipped items (armor excluded) into the slots they take. A heavy weapon takes 2 slots, and counts as
 * heavy even when it is also small. Small weapons of the same kind share a slot in pairs, in the order given.
 * Every other item takes 1 slot.
 *
 * @param {object[]} entries   Entries made by {@link toEquipEntry}.
 * @returns {{ entries: object[], slots: number }[]} One group per card on the sheet, with the slots it takes.
 */
export function groupEquipped(entries) {
  const groups = [];
  const openPairs = new Map();
  for (const entry of entries) {
    const isHeavy = entry.feats.has("heavy");
    const isSmall = (entry.type === "weapon") && entry.feats.has("small") && !isHeavy;
    if (!isSmall) {
      groups.push({ entries: [entry], slots: isHeavy ? 2 : 1 });
      continue;
    }

    const pair = openPairs.get(entry.kind);
    if (pair) {
      pair.entries.push(entry);
      openPairs.delete(entry.kind);
    } else {
      const group = { entries: [entry], slots: 1 };
      groups.push(group);
      openPairs.set(entry.kind, group);
    }
  }
  return groups;
}

/* -------------------------------------------------- */

/**
 * Counts the slots that equipped items (armor excluded) take toward the equip limit.
 *
 * @param {object[]} entries   Entries made by {@link toEquipEntry}.
 * @returns {number} The number of slots used.
 */
export function countEquipped(entries) {
  return groupEquipped(entries).reduce((total, group) => total + group.slots, 0);
}
