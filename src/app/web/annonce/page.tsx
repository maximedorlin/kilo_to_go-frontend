"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt, FaPlus, FaArrowUp } from 'react-icons/fa';
import FilterSection from '@/components/web/FilterSection';
import AnnoncesList from '@/components/web/AnnoncesList';
import { Annonce, Filters } from '@/interfaces/kilo/anononce.interface';

// Mock data
const AnnoncesMock: Annonce[] = [
  {
    id: 1,
    titre: "10 kg disponibles - Douala vers Paris",
    description: "Vol direct Air France le 25 juillet. Je peux transporter des objets jusqu'à 5kg par colis. Emballage sécurisé recommandé.",
    poidsDisponible: 10,
    villeDepart: "Douala",
    villeArrivee: "Paris",
    dateDepart: "2025-07-25",
    dateArrivee: "2025-07-26",
    dateVoyage: "2025-07-25", // Ajout de la propriété manquante
    prixKilo: 8,
    typeTransport: "avion",
    note: 4.5,
    avis: 12,
    likes: 4,
    isLiked: false,
    isFavorite: false,
    photos: ["bagage1.jpg", "bagage2.jpg"],
    PaysDepart: "Cameroun", // Ajout des propriétés optionnelles
    PaysArrivee: "France"
  },
  {
    id: 2,
    titre: "8 kg disponibles - Yaoundé vers Bruxelles",
    description: "Transport sécurisé, possibilité de prendre des documents importants. Je voyage avec Brussels Airlines.",
    poidsDisponible: 8,
    villeDepart: "Yaoundé",
    villeArrivee: "Bruxelles",
    dateDepart: "2025-08-10",
    dateArrivee: "2025-08-11",
    dateVoyage: "2025-08-10", // Ajout de la propriété manquante
    prixKilo: 7.5,
    typeTransport: "avion",
    note: 4.2,
    avis: 8,
    likes: 2,
    isLiked: false,
    isFavorite: false,
    photos: ["bagage3.jpg"],
    PaysDepart: "Cameroun",
    PaysArrivee: "Belgique"
  },
  {
    id: 3,
    titre: "15 kg en voiture - Libreville à Dakar",
    description: "Trajet en voiture via plusieurs pays. Je pars le 15 août avec possibilité de transport sécurisé pour vos colis.",
    poidsDisponible: 15,
    villeDepart: "Libreville",
    villeArrivee: "Dakar",
    dateDepart: "2025-08-15",
    dateArrivee: "2025-08-20",
    dateVoyage: "2025-08-15", // Ajout de la propriété manquante
    prixKilo: 5,
    typeTransport: "voiture",
    note: 4.7,
    avis: 15,
    likes: 7,
    isLiked: false,
    isFavorite: false,
    photos: ["voiture1.jpg", "voiture2.jpg"],
    PaysDepart: "Gabon",
    PaysArrivee: "Sénégal"
  },
    {
    id: 4,
    titre: "8 kg disponibles - Yaoundé vers Bruxelles",
    description: "Transport sécurisé, possibilité de prendre des documents importants. Je voyage avec Brussels Airlines.",
    poidsDisponible: 10,
    villeDepart: "Yaoundé",
    villeArrivee: "Bruxelles",
    dateDepart: "2025-08-10",
    dateArrivee: "2025-08-11",
    dateVoyage: "2025-08-10", // Ajout de la propriété manquante
    prixKilo: 7.5,
    typeTransport: "avion",
    note: 4.2,
    avis: 12,
    likes: 2,
    isLiked: false,
    isFavorite: false,
    photos: ["bagage3.jpg"],
    PaysDepart: "Cameroun",
    PaysArrivee: "Belgique"
  }
];

const AnnoncesPage: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    PaysDepart: '',
    PaysArrivee: '',
    villeDepart: '',
    villeArrivee: '',
    dateDepart: '',
    poidsMin: '',
    poidsMax: '',
    typeTransport: '',
    prixMax: ''
  });
  const [sortOption, setSortOption] = useState('date-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Chargement initial des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulation API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnnonces(AnnoncesMock);
      } catch (err) {
        setError('Erreur lors du chargement des annonces');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonctions memoïsées
  const handleFilterChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      PaysDepart: '',
      PaysArrivee: '',
      villeDepart: '',
      villeArrivee: '',
      dateDepart: '',
      poidsMin: '',
      poidsMax: '',
      typeTransport: '',
      prixMax: ''
    });
  }, []);

  const handleLike = useCallback((id: number) => {
    setAnnonces(prev => prev.map(annonce =>
      annonce.id === id ? {
        ...annonce,
        likes: annonce.isLiked ? annonce.likes - 1 : annonce.likes + 1,
        isLiked: !annonce.isLiked
      } : annonce
    ));
  }, []);

  const handleFavorite = useCallback((id: number) => {
    setAnnonces(prev => prev.map(annonce =>
      annonce.id === id ? {
        ...annonce,
        isFavorite: !annonce.isFavorite
      } : annonce
    ));
  }, []);

  const handleMessage = useCallback((id: number) => {
    alert(`Ouverture messagerie pour l'annonce ${id}`);
  }, []);

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filtrage et tri memoïsés
  const filteredAnnonces = useMemo(() => {
    return annonces.filter(annonce => {
      return (
        (filters.PaysDepart === '' ||
          (annonce.PaysDepart?.toLowerCase().includes(filters.PaysDepart.toLowerCase()))) &&
        (filters.PaysArrivee === '' ||
          (annonce.PaysArrivee?.toLowerCase().includes(filters.PaysArrivee.toLowerCase()))) &&
        (filters.villeDepart === '' ||
          annonce.villeDepart.toLowerCase().includes(filters.villeDepart.toLowerCase())) &&
        (filters.villeArrivee === '' ||
          annonce.villeArrivee.toLowerCase().includes(filters.villeArrivee.toLowerCase())) &&
        (filters.dateDepart === '' || annonce.dateDepart >= filters.dateDepart) &&
        (filters.poidsMin === '' || annonce.poidsDisponible >= Number(filters.poidsMin)) &&
        (filters.poidsMax === '' || annonce.poidsDisponible <= Number(filters.poidsMax)) &&
        (filters.typeTransport === '' || annonce.typeTransport === filters.typeTransport) &&
        (filters.prixMax === '' || annonce.prixKilo <= Number(filters.prixMax))
      )
    });
  }, [annonces, filters]);

  const sortedAnnonces = useMemo(() => {
    return [...filteredAnnonces].sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return new Date(a.dateDepart).getTime() - new Date(b.dateDepart).getTime();
        case 'date-desc':
          return new Date(b.dateDepart).getTime() - new Date(a.dateDepart).getTime();
        case 'prix-asc': return a.prixKilo - b.prixKilo;
        case 'prix-desc': return b.prixKilo - a.prixKilo;
        case 'poids-asc': return a.poidsDisponible - b.poidsDisponible;
        case 'poids-desc': return b.poidsDisponible - a.poidsDisponible;
        case 'note-desc': return b.note - a.note;
        default: return 0;
      }
    });
  }, [filteredAnnonces, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="container flex-col  mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaExternalLinkAlt className="mr-2 text-blue-600" />
            Annonces de transport disponibles
          </h1>
          <Link
            href="web/annonce/add"
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <FaPlus className="mr-2" />
            <span>Créer une annonce</span>
          </Link>
        </div>

        <div className='widht-full flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 justify-center'>
          <FilterSection
            filters={filters}
            showFilters={showFilters}
            sortOption={sortOption}
            filteredCount={sortedAnnonces.length}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onSortChange={handleSortChange}
          />
        </div>

        <div className='widht-full'>
          <AnnoncesList
            annonces={sortedAnnonces}
            onLike={handleLike}
            onMessage={handleMessage}
            onFavorite={handleFavorite}
            loading={loading}
            error={error}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Bouton de retour en haut */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
          aria-label="Remonter en haut de la page"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default AnnoncesPage;