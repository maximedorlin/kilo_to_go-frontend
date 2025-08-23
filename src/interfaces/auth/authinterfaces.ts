import { BasePagination } from "../base.interface";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface Token {
  refresh: string;
  access: string;
  user: UserInterface;
}

export interface ResetPassword {
  password: string;
  confirm_password: string;
}

export interface UserInterface {
  id: string;
  group: GroupInterface | string;
  last_login: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  last_name: string;
  first_name: string;
  email: string;
  phone_number: string;
  user_permissions?: PermissionInterface[];
}

export interface ChangePasswordInterface {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UserInterfaceWithPagination extends BasePagination {
  count: number;
  results: UserInterface[];
}

export interface GroupInterface {
  id: string;
  name: string;
  permissions: PermissionInterface[];
}

export interface PermissionInterface {
  id: string;
  name: string;
  codename: string;
}

export interface AllPermissionsInterface {
  add_logentry: boolean;
  change_logentry: boolean;
  delete_logentry: boolean;
  view_logentry: boolean;
  add_group: boolean;
  change_group: boolean;
  delete_group: boolean;
  view_group: boolean;
  add_permission: boolean;
  change_permission: boolean;
  delete_permission: boolean;
  view_permission: boolean;
  add_activitylog: boolean;
  change_activitylog: boolean;
  delete_activitylog: boolean;
  view_activitylog: boolean;
  delete_session: boolean;
  view_session: boolean;
  add_user: boolean;
  change_user: boolean;
  delete_user: boolean;
  view_user: boolean;
  add_contenttype: boolean;
  change_contenttype: boolean;
  delete_contenttype: boolean;
  view_contenttype: boolean;
  add_geoquater: boolean;
  change_geoquater: boolean;
  delete_geoquater: boolean;
  view_geoquater: boolean;
  add_geostreet: boolean;
  change_geostreet: boolean;
  delete_geostreet: boolean;
  view_geostreet: boolean;
  add_geosubdivision: boolean;
  change_geosubdivision: boolean;
  delete_geosubdivision: boolean;
  view_geosubdivision: boolean;
  add_geosubdivition: boolean;
  change_geosubdivition: boolean;
  delete_geosubdivition: boolean;
  view_geosubdivition: boolean;
  add_cabinet: boolean;
  change_cabinet: boolean;
  delete_cabinet: boolean;
  view_cabinet: boolean;
  add_clain: boolean;
  change_clain: boolean;
  delete_clain: boolean;
  view_clain: boolean;
  add_configtypedebras: boolean;
  change_configtypedebras: boolean;
  delete_configtypedebras: boolean;
  view_configtypedebras: boolean;
  add_configtypedelumiere: boolean;
  change_configtypedelumiere: boolean;
  delete_configtypedelumiere: boolean;
  view_configtypedelumiere: boolean;
  add_configtypelampadaire: boolean;
  change_configtypelampadaire: boolean;
  delete_configtypelampadaire: boolean;
  view_configtypelampadaire: boolean;
  add_configtypesupport: boolean;
  change_configtypesupport: boolean;
  delete_configtypesupport: boolean;
  view_configtypesupport: boolean;
  add_descent: boolean;
  change_descent: boolean;
  delete_descent: boolean;
  view_descent: boolean;
  add_diagnostic: boolean;
  change_diagnostic: boolean;
  delete_diagnostic: boolean;
  view_diagnostic: boolean;
  add_lampadaire: boolean;
  change_lampadaire: boolean;
  delete_lampadaire: boolean;
  view_lampadaire: boolean;
  add_lampcomsumption: boolean;
  change_lampcomsumption: boolean;
  delete_lampcomsumption: boolean;
  view_lampcomsumption: boolean;
  add_lampmeter: boolean;
  change_lampmeter: boolean;
  delete_lampmeter: boolean;
  view_lampmeter: boolean;
  add_material: boolean;
  change_material: boolean;
  delete_material: boolean;
  view_material: boolean;
  add_needsheet: boolean;
  change_needsheet: boolean;
  delete_needsheet: boolean;
  view_needsheet: boolean;
  add_observationsheet: boolean;
  change_observationsheet: boolean;
  delete_observationsheet: boolean;
  view_observationsheet: boolean;
  add_streetlamp: boolean;
  change_streetlamp: boolean;
  delete_streetlamp: boolean;
  view_streetlamp: boolean;
  add_streetlampcategory: boolean;
  change_streetlampcategory: boolean;
  delete_streetlampcategory: boolean;
  view_streetlampcategory: boolean;
  add_blocking: boolean;
  change_blocking: boolean;
  delete_blocking: boolean;
  view_blocking: boolean;
  add_drain: boolean;
  change_drain: boolean;
  delete_drain: boolean;
  view_drain: boolean;
  add_drainintervention: boolean;
  change_drainintervention: boolean;
  delete_drainintervention: boolean;
  view_drainintervention: boolean;
  add_drainneed: boolean;
  change_drainneed: boolean;
  delete_drainneed: boolean;
  view_drainneed: boolean;
  add_participant: boolean;
  change_participant: boolean;
  delete_participant: boolean;
  view_participant: boolean;
  add_roadsection: boolean;
  change_roadsection: boolean;
  delete_roadsection: boolean;
  view_roadsection: boolean;
  add_roadsectiondegradation: boolean;
  change_roadsectiondegradation: boolean;
  delete_roadsectiondegradation: boolean;
  view_roadsectiondegradation: boolean;
  add_roadsectiondiagnostic: boolean;
  change_roadsectiondiagnostic: boolean;
  delete_roadsectiondiagnostic: boolean;
  view_roadsectiondiagnostic: boolean;
  add_roadsectionintervention: boolean;
  change_roadsectionintervention: boolean;
  delete_roadsectionintervention: boolean;
  view_roadsectionintervention: boolean;
  add_roadsectionneeds: boolean;
  change_roadsectionneeds: boolean;
  delete_roadsectionneeds: boolean;
  view_roadsectionneeds: boolean;
  add_signalisation: boolean;
  change_signalisation: boolean;
  delete_signalisation: boolean;
  view_signalisation: boolean;
  add_signalisationdegradation: boolean;
  change_signalisationdegradation: boolean;
  delete_signalisationdegradation: boolean;
  view_signalisationdegradation: boolean;
  add_signalisationintervention: boolean;
  change_signalisationintervention: boolean;
  delete_signalisationintervention: boolean;
  view_signalisationintervention: boolean;
  add_signalisationneeds: boolean;
  change_signalisationneeds: boolean;
  delete_signalisationneeds: boolean;
  view_signalisationneeds: boolean;
  add_consumable: boolean;
  change_consumable: boolean;
  delete_consumable: boolean;
  view_consumable: boolean;
  add_disease: boolean;
  change_disease: boolean;
  delete_disease: boolean;
  view_disease: boolean;
  add_diseasecategory: boolean;
  change_diseasecategory: boolean;
  delete_diseasecategory: boolean;
  view_diseasecategory: boolean;
  add_diseasestatistics: boolean;
  change_diseasestatistics: boolean;
  delete_diseasestatistics: boolean;
  view_diseasestatistics: boolean;
  add_dropdownprogram: boolean;
  change_dropdownprogram: boolean;
  delete_dropdownprogram: boolean;
  view_dropdownprogram: boolean;
  add_equipment: boolean;
  change_equipment: boolean;
  delete_equipment: boolean;
  view_equipment: boolean;
  add_expressionofneeds: boolean;
  change_expressionofneeds: boolean;
  delete_expressionofneeds: boolean;
  view_expressionofneeds: boolean;
  add_healtharea: boolean;
  change_healtharea: boolean;
  delete_healtharea: boolean;
  view_healtharea: boolean;
  add_healthareas: boolean;
  change_healthareas: boolean;
  delete_healthareas: boolean;
  view_healthareas: boolean;
  add_healthdistrict: boolean;
  change_healthdistrict: boolean;
  delete_healthdistrict: boolean;
  view_healthdistrict: boolean;
  add_healthestablishment: boolean;
  change_healthestablishment: boolean;
  delete_healthestablishment: boolean;
  view_healthestablishment: boolean;
  add_healthestablishmentdisease: boolean;
  change_healthestablishmentdisease: boolean;
  delete_healthestablishmentdisease: boolean;
  view_healthestablishmentdisease: boolean;
  add_healthestablishmentequipment: boolean;
  change_healthestablishmentequipment: boolean;
  delete_healthestablishmentequipment: boolean;
  view_healthestablishmentequipment: boolean;
  add_infrastructure: boolean;
  change_infrastructure: boolean;
  delete_infrastructure: boolean;
  view_infrastructure: boolean;
  add_needs: boolean;
  change_needs: boolean;
  delete_needs: boolean;
  view_needs: boolean;
  add_observation: boolean;
  change_observation: boolean;
  delete_observation: boolean;
  view_observation: boolean;
  add_personnel: boolean;
  change_personnel: boolean;
  delete_personnel: boolean;
  view_personnel: boolean;
  add_personnelhealthestablishment: boolean;
  change_personnelhealthestablishment: boolean;
  delete_personnelhealthestablishment: boolean;
  view_personnelhealthestablishment: boolean;
  add_technicalplatform: boolean;
  change_technicalplatform: boolean;
  delete_technicalplatform: boolean;
  view_technicalplatform: boolean;
  add_session: boolean;
  change_session: boolean;
  add_blacklistedtoken: boolean;
  change_blacklistedtoken: boolean;
  delete_blacklistedtoken: boolean;
  view_blacklistedtoken: boolean;
  add_outstandingtoken: boolean;
  change_outstandingtoken: boolean;
  delete_outstandingtoken: boolean;
  view_outstandingtoken: boolean;
  add_brtline: boolean;
  change_brtline: boolean;
  delete_brtline: boolean;
  view_brtline: boolean;
  add_feederline: boolean;
  change_feederline: boolean;
  delete_feederline: boolean;
  view_feederline: boolean;
  add_firehydrant: boolean;
  change_firehydrant: boolean;
  delete_firehydrant: boolean;
  view_firehydrant: boolean;
  add_greenspace: boolean;
  change_greenspace: boolean;
  delete_greenspace: boolean;
  view_greenspace: boolean;
  add_landuseplan: boolean;
  change_landuseplan: boolean;
  delete_landuseplan: boolean;
  view_landuseplan: boolean;
  add_ravine: boolean;
  change_ravine: boolean;
  delete_ravine: boolean;
  view_ravine: boolean;
  add_schoolfacility: boolean;
  change_schoolfacility: boolean;
  delete_schoolfacility: boolean;
  view_schoolfacility: boolean;
  add_sportsfacility: boolean;
  change_sportsfacility: boolean;
  delete_sportsfacility: boolean;
  view_sportsfacility: boolean;
  add_technicalinfrastructure: boolean;
  change_technicalinfrastructure: boolean;
  delete_technicalinfrastructure: boolean;
  view_technicalinfrastructure: boolean;
  add_workofart: boolean;
  change_workofart: boolean;
  delete_workofart: boolean;
  view_workofart: boolean;
  add_collectionpoint: boolean;
  change_collectionpoint: boolean;
  delete_collectionpoint: boolean;
  view_collectionpoint: boolean;
  add_collectionroute: boolean;
  change_collectionroute: boolean;
  delete_collectionroute: boolean;
  view_collectionroute: boolean;
  add_intervention: boolean;
  change_intervention: boolean;
  delete_intervention: boolean;
  view_intervention: boolean;
  add_landfill: boolean;
  change_landfill: boolean;
  delete_landfill: boolean;
  view_landfill: boolean;
  add_request: boolean;
  change_request: boolean;
  delete_request: boolean;
  view_request: boolean;
  add_subcontractor: boolean;
  change_subcontractor: boolean;
  delete_subcontractor: boolean;
  view_subcontractor: boolean;
  add_subcontractorcontract: boolean;
  change_subcontractorcontract: boolean;
  delete_subcontractorcontract: boolean;
  view_subcontractorcontract: boolean;
  add_transfercenter: boolean;
  change_transfercenter: boolean;
  delete_transfercenter: boolean;
  view_transfercenter: boolean;
  add_transfercentre: boolean;
  change_transfercentre: boolean;
  delete_transfercentre: boolean;
  view_transfercentre: boolean;
  add_wildcollectionpoint: boolean;
  change_wildcollectionpoint: boolean;
  delete_wildcollectionpoint: boolean;
  view_wildcollectionpoint: boolean;
  no_permission: boolean;
  add_idgclaim: boolean;
  view_idgclaim: boolean;
  change_idgclaim: boolean;
  delete_idgclaim: boolean;
}

// export interface AllPermissions {
//   can_has_all_permissions: boolean;
//   can_voir_liste_categorie_patrimoine: boolean;
//   can_voir_detail_categorie_patrimoine: boolean;
//   can_add_categorie_patrimoine: boolean;
//   can_update_categorie_patrimoine: boolean;
//   can_supprimer_categorie_patrimoine: boolean;
//   can_archived_categorie_patrimoine: boolean;
//   can_search_categorie_patrimoine: boolean;
//   can_voir_liste_patrimoine: boolean;
//   can_voir_detail_patrimoine: boolean;
//   can_add_patrimoine: boolean;
//   can_update_patrimoine: boolean;
//   can_supprimer_patrimoine: boolean;
//   can_archived_patrimoine: boolean;
//   can_search_patrimoine: boolean;
//   can_localiser_patrimoine: boolean;
//   can_inventorier_patrimoine: boolean;
//   can_sceller_patrimoine: boolean;
//   can_desceller_patrimoine: boolean;
//   can_voir_liste_rolling_stock: boolean;
//   can_voir_detail_rolling_stock: boolean;
//   can_add_rolling_stock: boolean;
//   can_update_rolling_stock: boolean;
//   can_supprimer_rolling_stock: boolean;
//   can_voir_liste_travaux: boolean;
//   can_voir_detail_travaux: boolean;
//   can_add_travaux: boolean;
//   can_update_travaux: boolean;
//   can_supprimer_travaux: boolean;
//   can_archived_travaux: boolean;
//   can_suspend_travaux: boolean;
//   can_generer_rapport_travaux: boolean;
//   can_voir_liste_zone: boolean;
//   can_voir_detail_zone: boolean;
//   can_add_zone: boolean;
//   can_update_zone: boolean;
//   can_supprimer_zone: boolean;
//   can_archived_zone: boolean;
//   can_search_zone: boolean;
//   can_voir_liste_categorie_contribuable: boolean;
//   can_voir_detail_categorie_contribuable: boolean;
//   can_add_categorie_contribuable: boolean;
//   can_update_categorie_contribuable: boolean;
//   can_supprimer_categorie_contribuable: boolean;
//   can_archived_categorie_contribuable: boolean;
//   can_search_categorie_contribuable: boolean;
//   can_voir_liste_contribuable: boolean;
//   can_voir_detail_contribuable: boolean;
//   can_add_contribuable: boolean;
//   can_update_contribuable: boolean;
//   can_supprimer_contribuable: boolean;
//   can_archived_contribuable: boolean;
//   can_search_contribuable: boolean;
//   can_voir_liste_categorie_recette: boolean;
//   can_voir_detail_categorie_recette: boolean;
//   can_add_categorie_recette: boolean;
//   can_update_categorie_recette: boolean;
//   can_supprimer_categorie_recette: boolean;
//   can_archived_categorie_recette: boolean;
//   can_search_categorie_recette: boolean;
//   can_voir_liste_recette: boolean;
//   can_voir_detail_recette: boolean;
//   can_add_recette: boolean;
//   can_update_recette: boolean;
//   can_supprimer_recette: boolean;
//   can_archived_recette: boolean;
//   can_search_recette: boolean;
//   can_voir_liste_ordre_recette: boolean;
//   can_voir_detail_ordre_recette: boolean;
//   can_add_ordre_recette: boolean;
//   can_update_ordre_recette: boolean;
//   can_supprimer_ordre_recette: boolean;
//   can_archived_ordre_recette: boolean;
//   can_search_ordre_recette: boolean;
//   can_make_first_validation_ordre_recette: boolean;
//   can_publish_ordre_recette: boolean;
//   can_cancel_ordre_recette: boolean;
//   can_generate_rapport_recette: boolean;
//   can_voir_liste_fiche_recette: boolean;
//   can_voir_detail_fiche_recette: boolean;
//   can_add_fiche_recette: boolean;
//   can_update_fiche_recette: boolean;
//   can_supprimer_fiche_recette: boolean;
//   can_archived_fiche_recette: boolean;
//   can_search_fiche_recette: boolean;
//   can_voir_liste_infraction: boolean;
//   can_voir_detail_infraction: boolean;
//   can_add_infraction: boolean;
//   can_update_infraction: boolean;
//   can_supprimer_infraction: boolean;
//   can_archive_infraction: boolean;
//   can_generate_rapport_infraction: boolean;
//   can_generate_bon_sortie_infraction: boolean;
//   can_generate_pv_infraction: boolean;
//   can_calcul_decomptes_infraction: boolean;
//   can_search_infraction: boolean;
//   //
//   can_voir_liste_categorie_infraction: boolean;
//   can_voir_detail_categorie_infraction: boolean;
//   can_add_categorie_infraction: boolean;
//   can_update_categorie_infraction: boolean;
//   can_supprimer_categorie_infraction: boolean;
//   can_voir_liste_sortie_fourriere: boolean;
//   can_voir_detail_sortie_fourriere: boolean;
//   can_add_sortie_fourriere: boolean;
//   can_update_sortie_fourriere: boolean;
//   can_supprimer_sortie_fourriere: boolean;
//   //
//   can_voir_liste_paiement: boolean;
//   can_voir_detail_paiement: boolean;
//   can_add_paiement: boolean;
//   can_update_paiement: boolean;
//   can_supprimer_paiement: boolean;
//   can_archived_paiement: boolean;
//   can_search_paiement: boolean;
//   can_valider_paiement: boolean;
//   //
//   can_voir_liste_fiche_paiement: boolean;
//   can_voir_detail_fiche_paiement: boolean;
//   can_add_fiche_paiement: boolean;
//   can_update_fiche_paiement: boolean;
//   can_supprimer_fiche_paiement: boolean;
//   can_voir_liste_versement_recette: boolean;
//   can_voir_detail_versement_recette: boolean;
//   can_add_versement_recette: boolean;
//   can_update_versement_recette: boolean;
//   can_supprimer_versement_recette: boolean;
//   can_voir_liste_quittance: boolean;
//   can_voir_detail_quittance: boolean;
//   //
//   can_voir_liste_service: boolean;
//   can_voir_detail_service: boolean;
//   can_add_service: boolean;
//   can_update_service: boolean;
//   can_supprimer_service: boolean;
//   can_archived_service: boolean;
//   can_search_service: boolean;
//   can_voir_liste_contrat: boolean;
//   can_voir_detail_contrat: boolean;
//   can_add_contrat: boolean;
//   can_update_contrat: boolean;
//   can_supprimer_contrat: boolean;
//   can_archive_contrat: boolean;
//   can_suspendre_contrat: boolean;
//   can_prolonger_contrat: boolean;
//   can_rompre_contrat: boolean;
//   can_search_contrat: boolean;
//   can_voir_liste_configuration_document_contrat: boolean;
//   can_voir_detail_configuration_document_contrat: boolean;
//   can_add_configuration_document_contrat: boolean;
//   can_update_configuration_document_contrat: boolean;
//   can_supprimer_configuration_document_contrat: boolean;
//   can_voir_liste_quartier: boolean;
//   can_voir_detail_quartier: boolean;
//   can_add_quartier: boolean;
//   can_update_quartier: boolean;
//   can_supprimer_quartier: boolean;
//   can_archived_quartier: boolean;
//   can_search_quartier: boolean;
//   can_voir_liste_arrondissement: boolean;
//   can_voir_detail_arrondissement: boolean;
//   can_add_arrondissement: boolean;
//   can_update_arrondissement: boolean;
//   can_supprimer_arrondissement: boolean;
//   can_archived_arrondissement: boolean;
//   can_search_arrondissement: boolean;
//   //
//   can_voir_liste_user: boolean;
//   can_voir_detail_user: boolean;
//   can_add_user: boolean;
//   can_update_user: boolean;
//   can_supprimer_user: boolean;
//   can_block_user: boolean;
//   //
//   can_voir_liste_personnelle: boolean;
//   can_voir_detail_personnelle: boolean;
//   can_add_personnelle: boolean;
//   can_update_personnelle: boolean;
//   can_supprimer_personnelle: boolean;
//   can_archived_personnelle: boolean;
//   can_search_personnelle: boolean;
//   can_voir_liste_role: boolean;
//   can_voir_detail_role: boolean;
//   can_add_role: boolean;
//   can_update_role: boolean;
//   can_supprimer_role: boolean;
//   can_archived_role: boolean;
//   can_search_role: boolean;
//   can_voir_liste_postes: boolean;
//   can_voir_detail_poste: boolean;
//   can_add_poste: boolean;
//   can_update_poste: boolean;
//   //
//   can_supprimer_poste: boolean;
//   //
//   can_voir_liste_types_contrat: boolean;
//   can_add_type_contrat: boolean;
//   can_update_type_contrat: boolean;
//   can_delete_type_contrat: boolean;
//   can_voir_liste_etapes_workflow: boolean;
//   can_add_etapes_workflow: boolean;
//   can_update_etapes_workflow: boolean;
//   can_delete_etapes_workflow: boolean;
//   can_voir_liste_rib: boolean;
//   can_voir_detail_rib: boolean;
//   can_add_rib: boolean;
//   can_update_rib: boolean;
//   can_supprimer_rib: boolean;
// }

// export const permissionsArray = [
//   "can_voir_liste_categorie_patrimoine",
//   "can_voir_detail_categorie_patrimoine",
//   "can_add_categorie_patrimoine",
//   "can_update_categorie_patrimoine",
//   "can_supprimer_categorie_patrimoine",
//   "can_archived_categorie_patrimoine",
//   "can_search_categorie_patrimoine",
//   "can_voir_liste_patrimoine",
//   "can_voir_detail_patrimoine",
//   "can_add_patrimoine",
//   "can_update_patrimoine",
//   "can_supprimer_patrimoine",
//   "can_archived_patrimoine",
//   "can_search_patrimoine",
//   "can_localiser_patrimoine",
//   "can_inventorier_patrimoine",
//   "can_sceller_patrimoine",
//   "can_desceller_patrimoine",
//   "can_voir_liste_travaux",
//   "can_voir_detail_travaux",
//   "can_add_travaux",
//   "can_update_travaux",
//   "can_supprimer_travaux",
//   "can_archived_travaux",
//   "can_suspend_travaux",
//   "can_generer_rapport_travaux",
//   "can_voir_liste_zone",
//   "can_voir_detail_zone",
//   "can_add_zone",
//   "can_update_zone",
//   "can_supprimer_zone",
//   "can_archived_zone",
//   "can_search_zone",
//   "can_voir_liste_categorie_contribuable",
//   "can_voir_detail_categorie_contribuable",
//   "can_add_categorie_contribuable",
//   "can_update_categorie_contribuable",
//   "can_supprimer_categorie_contribuable",
//   "can_archived_categorie_contribuable",
//   "can_search_categorie_contribuable",
//   "can_voir_liste_contribuable",
//   "can_voir_detail_contribuable",
//   "can_add_contribuable",
//   "can_update_contribuable",
//   "can_supprimer_contribuable",
//   "can_archived_contribuable",
//   "can_search_contribuable",
//   "can_voir_liste_categorie_recette",
//   "can_voir_detail_categorie_recette",
//   "can_add_categorie_recette",
//   "can_update_categorie_recette",
//   "can_supprimer_categorie_recette",
//   "can_archived_categorie_recette",
//   "can_search_categorie_recette",
//   "can_voir_liste_recette",
//   "can_voir_detail_recette",
//   "can_add_recette",
//   "can_update_recette",
//   "can_supprimer_recette",
//   "can_archived_recette",
//   "can_search_recette",
//   "can_voir_liste_ordre_recette",
//   "can_voir_detail_ordre_recette",
//   "can_add_ordre_recette",
//   "can_update_ordre_recette",
//   "can_supprimer_ordre_recette",
//   "can_archived_ordre_recette",
//   "can_search_ordre_recette",
//   "can_generate_rapport_recette",
//   "can_voir_liste_fiche_recette",
//   "can_voir_detail_fiche_recette",
//   "can_add_fiche_recette",
//   "can_update_fiche_recette",
//   "can_supprimer_fiche_recette",
//   "can_archived_fiche_recette",
//   "can_search_fiche_recette",
//   "can_voir_liste_infraction",
//   "can_voir_detail_infraction",
//   "can_add_infraction",
//   "can_update_infraction",
//   "can_supprimer_infraction",
//   "can_archive_infraction",
//   "can_generate_rapport_infraction",
//   "can_generate_bon_sortie_infraction",
//   "can_generate_pv_infraction",
//   "can_calcul_decomptes_infraction",
//   "can_search_infraction",
//   "can_voir_liste_categorie_infraction",
//   "can_voir_detail_categorie_infraction",
//   "can_add_categorie_infraction",
//   "can_update_categorie_infraction",
//   "can_supprimer_categorie_infraction",
//   "can_voir_liste_sortie_fourriere",
//   "can_voir_detail_sortie_fourriere",
//   "can_add_sortie_fourriere",
//   "can_update_sortie_fourriere",
//   "can_supprimer_sortie_fourriere",
//   "can_voir_liste_paiement",
//   "can_voir_detail_paiement",
//   "can_add_paiement",
//   "can_update_paiement",
//   "can_supprimer_paiement",
//   "can_archived_paiement",
//   "can_search_paiement",
//   "can_valider_paiement",
//   "can_voir_liste_fiche_paiement",
//   "can_voir_detail_fiche_paiement",
//   "can_add_fiche_paiement",
//   "can_update_fiche_paiement",
//   "can_supprimer_fiche_paiement",
//   "can_voir_liste_versement_recette",
//   "can_voir_detail_versement_recette",
//   "can_add_versement_recette",
//   "can_update_versement_recette",
//   "can_supprimer_versement_recette",
//   "can_voir_liste_quittance",
//   "can_voir_detail_quittance",
//   "can_voir_liste_service",
//   "can_voir_detail_service",
//   "can_add_service",
//   "can_update_service",
//   "can_supprimer_service",
//   "can_archived_service",
//   "can_search_service",
//   "can_voir_liste_contrat",
//   "can_voir_detail_contrat",
//   "can_add_contrat",
//   "can_update_contrat",
//   "can_supprimer_contrat",
//   "can_archive_contrat",
//   "can_suspendre_contrat",
//   "can_prolonger_contrat",
//   "can_rompre_contrat",
//   "can_search_contrat",
//   "can_voir_liste_configuration_document_contrat",
//   "can_voir_detail_configuration_document_contrat",
//   "can_add_configuration_document_contrat",
//   "can_update_configuration_document_contrat",
//   "can_supprimer_configuration_document_contrat",
//   "can_voir_liste_quartier",
//   "can_voir_detail_quartier",
//   "can_add_quartier",
//   "can_update_quartier",
//   "can_supprimer_quartier",
//   "can_archived_quartier",
//   "can_search_quartier",
//   "can_voir_liste_arrondissement",
//   "can_voir_detail_arrondissement",
//   "can_add_arrondissement",
//   "can_update_arrondissement",
//   "can_supprimer_arrondissement",
//   "can_archived_arrondissement",
//   "can_search_arrondissement",
//   "can_voir_liste_user",
//   "can_voir_detail_user",
//   "can_add_user",
//   "can_update_user",
//   "can_supprimer_user",
//   "can_block_user",
//   "can_voir_liste_personnelle",
//   "can_voir_detail_personnelle",
//   "can_add_personnelle",
//   "can_update_personnelle",
//   "can_supprimer_personnelle",
//   "can_archived_personnelle",
//   "can_search_personnelle",
//   "can_voir_liste_role",
//   "can_voir_detail_role",
//   "can_add_role",
//   "can_update_role",
//   "can_supprimer_role",
//   "can_archived_role",
//   "can_search_role",
//   "can_voir_liste_facture",
//   "can_voir_liste_postes",
//   "can_voir_detail_poste",
//   "can_add_poste",
//   "can_update_poste",
//   "can_supprimer_poste",
//   "can_voir_liste_types_contrat",
//   "can_add_type_contrat",
//   "can_update_type_contrat",
//   "can_delete_type_contrat",
//   "can_voir_liste_etapes_workflow",
//   "can_add_etapes_workflow",
//   "can_update_etapes_workflow",
//   "can_delete_etapes_workflow",
//   "can_voir_liste_types_fiche_recette",
//   "can_add_type_fiche_recette",
//   "can_update_type_fiche_recette",
//   "can_delete_type_fiche_recette",
//   "can_voir_contrat_in_zone",
//   "can_voir_patrimoine_in_zone",
//   "can_faire_versement_percepteur",
//   "can_voir_liste_rib",
//   "can_voir_detail_rib",
//   "can_add_rib",
//   "can_update_rib",
//   "can_supprimer_rib",
//   "can_voir_liste_rolling_stock",
//   "can_voir_detail_rolling_stock",
//   "can_add_rolling_stock",
//   "can_update_rolling_stock",
//   "can_supprimer_rolling_stock",
//   "can_make_first_validation_ordre_recette",
//   "can_publish_ordre_recette",
//   "can_cancel_ordre_recette",
// ];

// export type PermissionType = AllPermissions;

// export type PermissionRecord = Record<string, Array<keyof PermissionType>>;

// export const permissionsRecord: PermissionRecord = {
//   all_permissions_key: ["can_has_all_permissions"],
//   service_key: [
//     "can_voir_liste_service",
//     "can_voir_detail_service",
//     "can_add_service",
//     "can_update_service",
//     "can_supprimer_service",
//     "can_archived_service",
//     "can_search_service",
//   ],
//   poste_key: [
//     "can_voir_liste_postes",
//     "can_voir_detail_poste",
//     "can_add_poste",
//     "can_update_poste",
//     "can_supprimer_poste",
//   ],
//   contrat_key: [
//     "can_voir_liste_contrat",
//     "can_voir_detail_contrat",
//     "can_add_contrat",
//     "can_update_contrat",
//     "can_supprimer_contrat",
//     "can_archive_contrat",
//     "can_suspendre_contrat",
//     "can_prolonger_contrat",
//     "can_rompre_contrat",
//     "can_search_contrat",
//   ],
//   contribuable_key: [
//     "can_voir_liste_contribuable",
//     "can_voir_detail_contribuable",
//     "can_add_contribuable",
//     "can_update_contribuable",
//     "can_supprimer_contribuable",
//     "can_archived_contribuable",
//     "can_search_contribuable",
//   ],
//   infraction_key: [
//     "can_voir_liste_infraction",
//     "can_voir_detail_infraction",
//     "can_add_infraction",
//     "can_update_infraction",
//     "can_supprimer_infraction",
//     "can_archive_infraction",
//     "can_generate_rapport_infraction",
//     "can_generate_bon_sortie_infraction",
//     "can_generate_pv_infraction",
//     "can_calcul_decomptes_infraction",
//     "can_search_infraction",
//   ],
//   sortie_fourriere_key: [
//     "can_voir_liste_sortie_fourriere",
//     "can_voir_detail_sortie_fourriere",
//     "can_add_sortie_fourriere",
//     "can_update_sortie_fourriere",
//     "can_supprimer_sortie_fourriere",
//   ],
//   patrimoine_key: [
//     "can_voir_liste_patrimoine",
//     "can_voir_detail_patrimoine",
//     "can_add_patrimoine",
//     "can_update_patrimoine",
//     "can_supprimer_patrimoine",
//     "can_archived_patrimoine",
//     "can_search_patrimoine",
//     "can_localiser_patrimoine",
//     "can_inventorier_patrimoine",
//     "can_sceller_patrimoine",
//     "can_desceller_patrimoine",
//   ],
//   zone_key: [
//     "can_voir_liste_zone",
//     "can_voir_detail_zone",
//     "can_add_zone",
//     "can_update_zone",
//     "can_supprimer_zone",
//     "can_archived_zone",
//     "can_search_zone",
//   ],
//   rolling_stock_key: [
//     "can_voir_liste_rolling_stock",
//     "can_voir_detail_rolling_stock",
//     "can_add_rolling_stock",
//     "can_update_rolling_stock",
//     "can_supprimer_rolling_stock",
//   ],
//   recette_key: [
//     "can_voir_liste_recette",
//     "can_voir_detail_recette",
//     "can_add_recette",
//     "can_update_recette",
//     "can_supprimer_recette",
//     "can_archived_recette",
//     "can_search_recette",
//   ],
//   ordre_recette_key: [
//     "can_voir_liste_ordre_recette",
//     "can_voir_detail_ordre_recette",
//     "can_add_ordre_recette",
//     "can_update_ordre_recette",
//     "can_supprimer_ordre_recette",
//     "can_archived_ordre_recette",
//     "can_search_ordre_recette",
//     "can_generate_rapport_recette",
//     "can_make_first_validation_ordre_recette",
//     "can_publish_ordre_recette",
//     "can_cancel_ordre_recette",
//   ],
//   paiement_key: [
//     "can_voir_liste_paiement",
//     "can_voir_detail_paiement",
//     "can_add_paiement",
//     "can_update_paiement",
//     "can_supprimer_paiement",
//     "can_archived_paiement",
//     "can_search_paiement",
//     "can_valider_paiement",
//   ],
//   fiche_paiement_key: [
//     "can_voir_liste_fiche_paiement",
//     "can_voir_detail_fiche_paiement",
//     "can_add_fiche_paiement",
//     "can_update_fiche_paiement",
//     "can_supprimer_fiche_paiement",
//   ],
//   quittance_key: ["can_voir_liste_quittance", "can_voir_detail_quittance"],
//   versement_recette_key: [
//     "can_voir_liste_versement_recette",
//     "can_voir_detail_versement_recette",
//     "can_add_versement_recette",
//     "can_update_versement_recette",
//     "can_supprimer_versement_recette",
//   ],
//   fiche_recette_key: [
//     "can_voir_liste_fiche_recette",
//     "can_voir_detail_fiche_recette",
//     "can_add_fiche_recette",
//     "can_update_fiche_recette",
//     "can_supprimer_fiche_recette",
//     "can_archived_fiche_recette",
//     "can_search_fiche_recette",
//   ],
//   user_key: [
//     "can_voir_liste_user",
//     "can_voir_detail_user",
//     "can_add_user",
//     "can_update_user",
//     "can_supprimer_user",
//     "can_block_user",
//   ],
//   rules_key: [
//     "can_voir_liste_role",
//     "can_voir_detail_role",
//     "can_add_role",
//     "can_update_role",
//     "can_supprimer_role",
//     "can_archived_role",
//     "can_search_role",
//   ],
//   personnelle_key: [
//     "can_voir_liste_personnelle",
//     "can_voir_detail_personnelle",
//     "can_add_personnelle",
//     "can_update_personnelle",
//     "can_supprimer_personnelle",
//     "can_archived_personnelle",
//     "can_search_personnelle",
//   ],
//   contract_type_key: [
//     "can_voir_liste_types_contrat",
//     "can_add_type_contrat",
//     "can_update_type_contrat",
//     "can_delete_type_contrat",
//   ],
//   categorie_contribuable_key: [
//     "can_voir_liste_categorie_contribuable",
//     "can_voir_detail_categorie_contribuable",
//     "can_add_categorie_contribuable",
//     "can_update_categorie_contribuable",
//     "can_supprimer_categorie_contribuable",
//     "can_archived_categorie_contribuable",
//     "can_search_categorie_contribuable",
//   ],
//   patrimoine_category_key: [
//     "can_voir_liste_categorie_patrimoine",
//     "can_voir_detail_categorie_patrimoine",
//     "can_add_categorie_patrimoine",
//     "can_update_categorie_patrimoine",
//     "can_supprimer_categorie_patrimoine",
//     "can_archived_categorie_patrimoine",
//     "can_search_categorie_patrimoine",
//   ],
//   categorie_recette_key: [
//     "can_voir_liste_categorie_recette",
//     "can_voir_detail_categorie_recette",
//     "can_add_categorie_recette",
//     "can_update_categorie_recette",
//     "can_supprimer_categorie_recette",
//     "can_archived_categorie_recette",
//     "can_search_categorie_recette",
//   ],
//   categorie_infraction_key: [
//     "can_voir_liste_categorie_infraction",
//     "can_voir_detail_categorie_infraction",
//     "can_add_categorie_infraction",
//     "can_update_categorie_infraction",
//     "can_supprimer_categorie_infraction",
//   ],
//   quartier_key: [
//     "can_voir_liste_quartier",
//     "can_voir_detail_quartier",
//     "can_add_quartier",
//     "can_update_quartier",
//     "can_supprimer_quartier",
//     "can_archived_quartier",
//     "can_search_quartier",
//   ],
//   rib_key: [
//     "can_voir_liste_rib",
//     "can_voir_detail_rib",
//     "can_add_rib",
//     "can_update_rib",
//     "can_supprimer_rib",
//   ],
//   // document_contrat_key: [
//   //   "can_voir_liste_configuration_document_contrat",
//   //   "can_voir_detail_configuration_document_contrat",
//   //   "can_add_configuration_document_contrat",
//   //   "can_update_configuration_document_contrat",
//   //   "can_supprimer_configuration_document_contrat",
//   // ],
// };

// export const permissionsKeys: Array<keyof PermissionType> = [
//   "can_has_all_permissions",

//   "can_voir_liste_quartier",
//   "can_voir_detail_quartier",
//   "can_add_quartier",
//   "can_update_quartier",
//   "can_supprimer_quartier",
//   "can_archived_quartier",
//   "can_search_quartier",
//   "can_voir_liste_arrondissement",
//   "can_voir_detail_arrondissement",
//   "can_add_arrondissement",
//   "can_update_arrondissement",
//   "can_supprimer_arrondissement",
//   "can_archived_arrondissement",
//   "can_search_arrondissement",
// ];

// export const externalUserKeys: Array<keyof PermissionType> = [
//   "can_voir_liste_patrimoine",
//   "can_voir_detail_patrimoine",
//   "can_voir_liste_ordre_recette",
//   "can_voir_detail_ordre_recette",
//   "can_voir_liste_fiche_recette",
//   "can_voir_detail_fiche_recette",
//   "can_voir_liste_infraction",
//   "can_voir_detail_infraction",
//   "can_voir_liste_paiement",
//   "can_voir_detail_paiement",
//   "can_add_paiement",
//   "can_update_paiement",
//   "can_supprimer_paiement",
//   "can_archived_paiement",
//   "can_search_paiement",
//   "can_valider_paiement",
//   "can_voir_liste_contrat",
//   "can_voir_detail_contrat",
//   "can_voir_liste_rolling_stock",
//   "can_voir_detail_rolling_stock",
//   "can_add_rolling_stock",
//   "can_update_rolling_stock",
//   "can_supprimer_rolling_stock",

//   //

//   "can_make_first_validation_ordre_recette",
//   "can_publish_ordre_recette",
//   "can_cancel_ordre_recette",
// ];

// export interface Permission extends AllPermissions {
//   id: number;
//   libelle: string;
//   external_user: boolean;
//   archived: boolean;
//   date_creation: Date;
//   date_modification: Date;
// }

// export interface FavorieInterface {
//   id: number;
//   name: string;
//   link: string;
//   archived: boolean;
//   icon: string;
//   bg_color: string;
//   color: string;
//   user: string;
// }
