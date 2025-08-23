type BreadcrumbConfig = Record<string, string>;

export const administrationBreakCrumbConfig: BreadcrumbConfig = {
  // PUBLIC waste MODULE
  "^/home/administration$": "administration",

  "^/home/administration/accounts$": "accounts",

  "^/home/administration/accounts/users$": "users",
  "^/home/administration/accounts/users/add$": "add_user",
  "^/home/administration/accounts/users/[^/]+/edit$": "update_user",
  "^/home/administration/accounts/users/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "user_details",

  "^/home/administration/accounts/groups$": "groups",
  "^/home/administration/accounts/groups/add$": "add_group",
  "^/home/administration/accounts/groups/[^/]+/edit$": "update_group",
  "^/home/administration/accounts/groups/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "group_details",

  // Zones Administratives (Main)
  "^/home/administration/areas$": "admin_zone",

  // Communes
  "^/home/administration/areas/subdivisions$": "subdivisions",
  "^/home/administration/areas/subdivisions/[^/]+/edit$": "update_subdivision",
  "^/home/administration/areas/subdivisions/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "subdivision_details",

  // Quartiers
  "^/home/administration/areas/quaters$": "quaters",
  "^/home/administration/areas/quaters/[^/]+/edit$": "update_quater",
  "^/home/administration/areas/quaters/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "quater_details",

  // Quartiers
  "^/home/administration/idg-datas$": "idg_datas",
  "^/home/administration/idg-datas/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "idg_datas_details",

  //  disease
  "^/home/administration/disease$": "disease",
  "^/home/administration/disease/add$": "add_disease",
  "^/home/administration/disease/[^/]+/edit$": "update_disease",
  "^/home/administration/disease/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "disease_details",
  // Participants
  "^/home/administration/participants": "participants",
  "^/home/administration/participants/[^/]+/edit$": "update_subdivision",
  "^/home/administration/participants(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "subdivision_details",

  "^/home/administration/equipments$": "equipments",
  "^/home/administration/equipments/add$": "add_equipment",
  "^/home/administration/equipment/[^/]+/edit$": "update_equipment",
  "^/home/administration/equipments/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "equipment_details",

  // Materials
  "^/home/administration/materials$": "materials",
  "^/home/administration/materials/add$": "add_material",
  "^/home/administration/materials/[^/]+/edit$": "update_material",
  "^/home/administration/materials/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "material_details",

  // Consummables
  "^/home/administration/consumables$": "consumables",
  "^/home/administration/consumables/add$": "add_consumable",
  "^/home/administration/consumables/[^/]+/edit$": "update_consumable",
  "^/home/administration/consumables/(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "consumable_details",

  // Personnel
  "^/home/administration/personnel$": "personnel",
  "^/home/administration/personnel/add$": "add_personnel",
  "^/home/administration/personnel/[^/]+/edit$": "update_perrsonnel",
  "^/home/administration/personnel(?!add$|[^/]+?/edit$)([^/]+?)(?:/)?$":
    "personnel_details",
};
