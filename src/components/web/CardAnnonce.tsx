import { Annonce } from '@/interfaces/kilo/anononce.interface';
import Link from 'next/link';
import React from 'react';

interface CardAnnonceProps {
  annonce: Annonce;
  onLike: (id: number) => void;
  onMessage: (id: number) => void;
  onFavorite: (id: number) => void;
}

const CardAnnonce: React.FC<CardAnnonceProps> = ({ 
  annonce, 
  onLike, 
  onMessage,
  onFavorite 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      {/* Header de la carte */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{annonce.titre}</h3>
        <p className="text-gray-600 text-sm mb-4">{annonce.description}</p>
        
        {/* Informations supplémentaires */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <span className="font-semibold">Prix/kg:</span> {annonce.prixKilo}€
          </div>
          <div>
            <span className="font-semibold">Disponible:</span> {annonce.poidsDisponible}kg
          </div>
          <div>
            <span className="font-semibold">Départ:</span> {annonce.villeDepart}
          </div>
          <div>
            <span className="font-semibold">Arrivée:</span> {annonce.villeArrivee}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => onLike(annonce.id)}
            aria-label={annonce.isLiked ? "Retirer le like" : "Ajouter un like"}
            className={`p-2 rounded-full ${annonce.isLiked ? 'text-red-500' : 'text-gray-400'}`}
          >
            ♥ {annonce.likes}
          </button>
          
          <button 
            onClick={() => onFavorite(annonce.id)}
            aria-label={annonce.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`p-2 text-xl ${annonce.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            {annonce.isFavorite ? '★' : '☆'}
          </button>
          
          <Link
          href= "/web/messagerie">
          <button 
            onClick={() => onMessage(annonce.id)}
            aria-label="Contacter l'annonceur"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
          >
            Contacter
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardAnnonce); // Optimisation avec React.memo