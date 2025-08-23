export type BreadcrumbConfig = Record<string, string>;

export const breadcrumbConfig: BreadcrumbConfig = {
  // PUBLIC LIGHTING MODULE
  "^/home$": "home",

  //------------------------------------------//

  //Points lumineux
  //
  "^/home/public-lighting$": "public_lighting",
  "^/home/public-lighting/dashboard$": "dashboard",
  //

  // street light
  "^/home/public-lighting/street-light": "street_lightTiter",
  "^/home/public-lighting/street-light/add$": "add_street_light",
  "^/home/public-lighting/street-light/[^/]+/edit": "edit_street_light",
  "^/home/public-lighting/street-light/(?!add$|!formal-notice|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "details_street_light",
  //

  //-------------------------------------------//

  //
  //Maintenance corrective
  //
  // reclamation (entré)
  "^/home/public-lighting/reclamation$": "reclamation",

  //corrective-maintenance
  "^/home/public-lighting/corrective-maintenance": "corrective_maintenance",

  //reclamation
  "^/home/public-lighting/corrective-maintenance/claim": "claim",
  "^/home/public-lighting/corrective-maintenance/claim/add": "add_claim",
  "^/home/public-lighting/corrective-maintenance/claim/[^/]+/edit$":
    "updateaclaim",
  "^/home/public-lighting/corrective-maintenance/claim/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "claimDetails.title",
  "^/home/public-lighting/corrective-maintenance/claim/[^/]+/observation-sheet$":
    "create_observationSheet",
  //

  // observation sheet
  "^/home/public-lighting/corrective-maintenance/observation-sheets":
    "fiche_observation_sheet",
  "^/home/public-lighting/corrective-maintenance/observation-sheets/[^/]+/edit$":
    "edit_fiche_observation",
  "^/home/public-lighting/corrective-maintenance/observation-sheets/(?!add$|!formal-notice|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "observation_sheet_details",
  //

  // dianostic
  "^/home/public-lighting/corrective-maintenance/diagnostics$": "diagnostic",
  "^/home/public-lighting/corrective-maintenance/diagnostics/add$":
    "add_diagnostic",
  "^/home/public-lighting/corrective-maintenance/diagnostics/[^/]+/edit$":
    "edit_diagnostic",
  "^/home/public-lighting/corrective-maintenance/diagnostics/(?!add$|!formal-notice|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "diagnostic_details",
  //

  // Fiche d'expression des besoins
  "^/home/public-lighting/corrective-maintenance/need-sheet$": "need_sheet",
  "^/home/public-lighting/corrective-maintenance/need-sheet/add$":
    "add_need_sheet",
  "^/home/public-lighting/corrective-maintenance/need-sheet/[^/]+/edit$":
    "add_need_sheet",
  "^/home/public-lighting/corrective-maintenance/need-sheet/(?!add$|!formal-notice|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "need_sheet_detail",
  //

  // Interventions
  "^/home/public-lighting/corrective-maintenance/interventions$":
    "interventions",
  "^/home/public-lighting/corrective-maintenance/interventions/add/([^/]+)/?$/":
    "add_intervention",
  "^/home/public-lighting/corrective-maintenance/interventions/(?!add$|!formal-notice|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "intervention_detail",
  //

  //--------------------------------------------//

  //
  // preventive maintenance
  //
  "^/home/public-lighting/preventive_maintenance$": "light_prevention",
  "^/home/public-lighting/preventive_maintenance/add$": "add_light_prevention",
  "^/home/public-lighting/preventive_maintenance/[^/]/edit$":
    "edit_light_prevention",
  "^/home/public-lighting/preventive_maintenance/[^/]/$":
    "details_light_prevention",
  //

  //--------------------------------------------//

  //
  // Consommation des lampadaires
  //
  //compteur
  "^/home/public-lighting/streetlamp-consumption$": "streetlamp_consumption",
  "^/home/public-lighting/streetlamp-consumption/lampmeter$": "lampmeter",
  "^/home/public-lighting/streetlamp-consumption/lampmeter/add$":
    "add_lampmeter",
  "^/home/public-lighting/streetlamp-consumption/lampmeter/[^/]+/edit$":
    "edit_lampmeter",
  "^/home/public-lighting/streetlamp-consumption/lampmeter/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "compteurDetails.title",
  //

  // consommation
  "^/home/public-lighting/streetlamp-consumption/consumption$": "consumption",
  "^/home/public-lighting/streetlamp-consumption/consumption/[^/]/$":
    "details_consumption",

  //  armoir
  "^/home/public-lighting/streetlamp-consumption/cabinet$": "cabinet",
  "^/home/public-lighting/streetlamp-consumption/cabinet/add$": "add_cabinet",
  "^/home/public-lighting/streetlamp-consumption/cabinet/[^/]+/edit$":
    "edit_cabinet",
  "^/home/public-lighting/streetlamp-consumption/cabinet/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "details_cabinet",
  //

  //-----------------------------------------------//

  //
  //administration
  //
  // service
  "^/home/administration/services$": "services",
  "^/home/administration/services/add$": "add_service",
  "^/home/administration/services/[^/]+/edit$": "edit_service",
  //
};
