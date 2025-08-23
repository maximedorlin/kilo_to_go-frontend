import { BaseData } from "./base.interface";

export interface QuaterFeature {
  type: string;
  features: Feature[];
}

export interface Feature {
  id: string;
  type: string;
  geometry: Geometry | null;
  properties: Quater;
}

export interface Geometry {
  type: string;
  coordinates: any;
}

export interface Quater {
  created_at: Date;
  updated_at: Date;
  name_quater: string;
  code: string;
  population: number;
  sup: number;
  subdivision: string;
}

export interface SubdivisionHighFeatureCollection {
  type: string;
  features: Feature[];
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: Date;
  crs: CRS;
}

export interface SubdivisionHighFeature {
  type: string;
  features: SubdivisionFeature[];
}

export interface SubdivisionFeature {
  id: string;
  type: string;
  geometry?: SubdivisionGeometry;
  properties: SubdivisionProperties;
}

export interface SubdivisionGeometry {
  type: string;
  coordinates: number[][][];
}

export interface SubdivisionProperties {
  created_at: Date;
  updated_at: Date;
  name_subdivision: string;
  population: number | null;
  repart: number | null;
  primaire: number | null;
  ppublic: number | null;
  secondaire: number | null;
}
export interface SubdivisionInterface extends SubdivisionProperties {
  id: string;
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  name: string;
}

export enum GeometryType {
  Polygon = "Polygon",
  MultiPolygon = "MultiPolygon",
}

export enum GeometryName {
  Geom = "geom",
}

export enum FeatureType {
  Feature = "Feature",
}

export interface QuaterInterface extends BaseData {
  code: string;
  name_quater: string | null;
  population: number | string;
  sup: number | string;
  subdivision_id: string;
  subdivision?: string;
  geom: string | QuarterGeometry | null;
}

export interface SubdivisionInterfaces extends BaseData {
  name_subdivision: string;
  population: number;
  repart: number;
  primaire: number;
  ppublic: number;
  secondaire: number;
  geom: string | SubdivisionGeometry | null;
}

export interface QuarterFeatureCollection {
  type: string;
  features: QuarterFeature[];
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp?: Date;
  crs?: CRS;
  links?: Link[];
}

export interface QuarterFeature {
  id: string;
  type: string;
  geometry: QuarterGeometry | null;
  geometry_name?: GeometryName;
  properties: QuarterProperties;
}

export interface QuarterGeometry {
  type: GeometryType;
  coordinates: Array<Array<Array<number[]>>>; // Adapté pour MultiPolygon
}

export interface QuarterProperties {
  created_at: Date;
  updated_at: Date;
  name_quater: string;
  code: string | null;
  population: number;
  sup: number;
  subdivision_id: string;
}

// Réutilisation des interfaces communes existantes
export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  name: string;
}

export interface Link {
  title: string;
  type: string;
  rel: string;
  href: string;
}

export interface QuarterInterface extends QuarterProperties {
  id: string;
  geom?: QuarterGeometry | null;
}

export interface SubdivisionsInterface {
  id: string;
  type: string;
  geometry: SubdivisionGeometry;
  properties: Properties;
}

export interface Properties {
  created_at: Date;
  updated_at: Date;
  name_subdivision: string;
  population: number;
  repart: number;
  primaire: number;
  ppublic: number;
  secondaire: number;
}

export interface QuatersInterface {
  id: string;
  type: string;
  geometry: QuarterGeometry;
  properties: Properties;
}

export interface Properties {
  created_at: Date;
  updated_at: Date;
  name_quater: string;
  code: string;
  population: number;
  sup: number;
  subdivision: string;
}

export interface Disease {
  id: string;
  disease_name: string;
  disease_symptoms: string;
  transmissible: boolean;
  predefined_category?: string;
  custom_category?: string;
  category_display: string;
}
export type ObsevationCreation = Omit<Disease, "id">;

export interface DiseaseWithPagination extends BasePagination {
  [x: string]: any;
  results: Disease[];
}

export const PREDEFINED_CATEGORIES = [
  "Maladies environnementales / professionnelles",
  "Maladies dégénératives",
  "Maladies infectieuses",
  "Maladies métaboliques",
  "Maladies auto-immunes",
  "Maladies génétiques",
];

export const PREDEFINED_CATEGORIES_FOR_CREATION = [
  {
    id: "environnementale",
    libelle: "Maladies environnementales / professionnelles",
  },

  {
    id: "degenerative",
    libelle: "Maladies dégénératives",
  },

  {
    id: "infectieuse",
    libelle: "Maladies infectieuses",
  },

  {
    id: "metabolique",
    libelle: "Maladies métaboliques",
  },

  {
    id: "auto_immune",
    libelle: "Maladies auto-immunes",
  },

  {
    id: "genetique",
    libelle: "Maladies génétiques",
  },
];

export interface BaseInterface {
  id: string;
  created_at: string;
  updated_at: string;
}

export enum TypeParticipantsType {
  physique = "physique",
  morale = "morale",
}

export enum ParticipantsProfilType {
  chef_equipe = "chef_equipe",
  technicien = "technicien",
  superviseur = "superviseur",
  entreprise = "entreprise",
}

export interface ParticipantsInterface extends BaseInterface {
  type_participant: TypeParticipantsType;
  profil: ParticipantsProfilType;
  nom_complet: string;
  telephone: string;
  email: string;
}

export interface ParticipantsWithPagination extends BasePagination {
  [x: string]: any;
  results: ParticipantsInterface[];
}

export interface ParticipantsStatisticsInterface {
  total: number;
  type_participant: Record<string, number>;
  profil: Record<string, number>;
}

export const ParticipantsProfilList = [
  "chef_equipe",
  "technicien",
  "superviseur",
  "entreprise",
] as const;

export const TypeParticipantsList = ["physique", "morale"] as const;

// Interface principale représentant un personnel
export interface Personnel {
  id: string;
  personnel_type: string;
  personnel_description: string;
  created_at?: string;
  updated_at?: string;
}

// Interface de pagination de base (souvent renvoyée par Django REST Framework)
export interface BasePagination {
  count: number;
  next: string | null;
  previous: string | null;
}

// Interface pour une réponse paginée contenant les personnels
export interface PersonnelWithPagination extends BasePagination {
  results: Personnel[];
  [x: string]: any; // Pour autoriser des propriétés supplémentaires (par ex : "filters", "metadata", etc.)
}

// Interface pour des statistiques agrégées (si ton backend les fournit)
export interface PersonnelStatisticsInterface {
  total: number;
  personnel_type_distribution: Record<string, number>;
}

// Liste de types possibles de personnel (si tu as des valeurs prédéfinies)
export const PersonnelTypeList = [
  "médecin",
  "infirmier",
  "technicien",
  "administratif",
  "autre",
] as const;
