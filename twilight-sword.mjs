import * as apps from "./src/module/apps/_module.mjs";
import * as dataModels from "./src/module/data/_module.mjs";
import * as documents from "./src/module/documents/_module.mjs";
import { systemID, systemPath } from "./src/module/constants.mjs";
import TS from "./src/module/config.mjs";
import { localizeHelper } from "./src/module/helpers/utils.mjs";

Hooks.once("init", () => {
  CONFIG.TS = TS;

  // Assign document classes
  for (const docCls of Object.values(documents)) {
    CONFIG[docCls.documentName].documentClass = docCls;
  }

  Object.assign(CONFIG.Actor.dataModels, dataModels.Actor.config);
  Object.assign(CONFIG.Combatant.dataModels, dataModels.Combatant.config);
  Object.assign(CONFIG.Item.dataModels, dataModels.Item.config);

  CONFIG.Actor.defaultType = "champion";
  foundry.applications.handlebars.loadTemplates([
    systemPath("templates/actor/parts/identity.hbs"),
    systemPath("templates/actor/parts/stats.hbs"),
    systemPath("templates/actor/parts/equipment.hbs"),
    systemPath("templates/actor/parts/inventory.hbs"),
    systemPath("templates/actor/parts/feats.hbs"),
  ]);

  // Document Sheets
  foundry.documents.collections.Actors.registerSheet(systemID, apps.Actor.TSActorSheet, {
    makeDefault: true, label: "TS.Sheets.Labels.ActorSheet",
  });
  foundry.documents.collections.Actors.registerSheet(systemID, apps.Actor.TSChampionSheet, {
    makeDefault: true, label: "TS.Sheets.Labels.ChampionSheet", types: ["champion"],
  });
  foundry.documents.collections.Items.registerSheet(systemID, apps.Item.TSItemSheet, {
    makeDefault: true, label: "TS.Sheets.Labels.ItemSheet",
  });

  // Sidebar tabs
  CONFIG.ui.combat = apps.Combat.TSCombatTracker;
});

Hooks.once("i18nInit", () => {
  // Localizing the system's CONFIG object
  localizeHelper(CONFIG.TS);
});

Hooks.on("renderCombatantConfig", apps.Combatant.hooks.renderCombatantConfig);
