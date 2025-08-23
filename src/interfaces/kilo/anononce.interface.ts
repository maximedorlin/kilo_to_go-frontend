// annonce.interfaces.ts

import { Transaction } from "./transaction.interface";

// Enums
export enum AnnonceCategorie {
  ELECTRONIQUE = 'electronique',
  VETEMENTS = 'vetements',
  MEUBLES = 'meubles',
  // Ajoutez d'autres catégories selon vos besoins
}

export enum AnnonceStatus {
  DISPONIBLE = 'disponible',
  VENDU = 'vendu',
  EN_COURS = 'en_cours',
  // Ajoutez d'autres statuts selon vos besoins
}

// Interfaces principales
// export interface Annonce {
//   id?: number;
//   utilisateurId: number; // ID de l'utilisateur plutôt que l'objet entier
//   titre: string;
//   description: string;
//   categorie: AnnonceCategorie;
//   prix: number;
//   devise?: string;
//   poids: number;
//   dimensions: string;
//   villeDepart: string;
//   villeArrivee: string;
//   dateDepartPrevu?: string; // Format ISO
//   dateArriveePrevu?: string; // Format ISO
//   statut?: AnnonceStatus;
//   dateCreation?: string;
//   dateModification?: string;
//   transaction?: Transaction; // Optionnel
// }


// src/types/annonce.ts
export type Annonce = {
  id: number;
  titre: string;
  description: string;
  poidsDisponible: number;
  villeDepart: string;
  villeArrivee: string;
  dateDepart: string;
  dateArrivee: string;
  dateVoyage: string;
  prixKilo: number;
  typeTransport: string;
  note: number;
  avis: number;
  likes: number;
  isLiked: boolean;
  isFavorite: boolean;
  photos: string[];
  PaysDepart?: string;
  PaysArrivee?: string;
};

export type Filters = {
  PaysDepart: string;
  PaysArrivee: string;
  villeDepart: string;
  villeArrivee: string;
  dateDepart: string;
  poidsMin: string;
  poidsMax: string;
  typeTransport: string;
  prixMax: string;
};





// Interfaces pour les requêtes
export interface CreateAnnonceRequest extends Omit<Annonce, 'id' | 'dateCreation' | 'dateModification'> {}
export interface UpdateAnnonceRequest extends Partial<Omit<Annonce, 'id' | 'utilisateurId' | 'dateCreation'>> {}

export interface CreateTransactionRequest {
  annonceId: number;
  transaction: Omit<Transaction, 'id'>;
}