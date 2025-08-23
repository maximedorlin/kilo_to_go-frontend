// src/components/web/AnnoncesList.tsx
import React from 'react';
import CardAnnonce from './CardAnnonce';
import { Annonce } from '@/interfaces/kilo/anononce.interface';

interface AnnoncesListProps {
  annonces: Annonce[];
  onLike: (id: number) => void;
  onMessage: (id: number) => void;
  onFavorite: (id: number) => void;
  loading: boolean;
  error: string | null;
  onResetFilters?: () => void;
}

const AnnoncesList: React.FC<AnnoncesListProps> = ({
  annonces,
  onLike,
  onMessage,
  onFavorite,
  loading,
  error,
  onResetFilters
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Chargement des annonces...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (annonces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
        <img
          src="/empty-state.svg"
          alt="Aucune annonce trouvée"
          className="w-48 h-48 mb-6 opacity-70"
        />
        <h4 className="text-lg font-medium text-gray-700 mb-2">Aucune annonce ne correspond à vos critères</h4>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {annonces.map((annonce) => (
        <CardAnnonce
          key={annonce.id}
          annonce={annonce}
          onLike={onLike}
          onMessage={onMessage}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};

export default AnnoncesList;