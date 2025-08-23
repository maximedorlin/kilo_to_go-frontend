

// user.model.ts
export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  codePostal?: string;
  inscriptionDate?: string; // ISO string format
  statut?: 'actif' | 'inactif' | 'suspendu';
  reputationScore?: number;
  profilePhoto?: string;
  verifie?: boolean;
  lastLogin?: string; // ISO string format
}

export interface ForgotPasswordDTO {
  email: string;
  password: string;
}

export interface ResetPasswordDTO {
  newPassword: string;
}

