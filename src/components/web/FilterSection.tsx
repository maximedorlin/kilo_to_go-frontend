// src/components/web/FilterSection.tsx
import { Filters } from '@/interfaces/kilo/anononce.interface';
import React from 'react';
import { FaFilter, FaLocationArrow, FaCalendarAlt, FaSearch, FaTimes } from 'react-icons/fa';

interface FilterSectionProps {
  filters: Filters;
  showFilters: boolean;
  sortOption: string;
  filteredCount: number;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onResetFilters: () => void;
  onToggleFilters: () => void;
  onSortChange: (option: string) => void;
}

const sortOptions = {
  'date-asc': 'Date (plus ancien)',
  'date-desc': 'Date (plus récent)',
  'prix-asc': 'Prix (croissant)',
  'prix-desc': 'Prix (décroissant)',
  'poids-asc': 'Poids (croissant)',
  'poids-desc': 'Poids (décroissant)',
  'note-desc': 'Meilleures notes'
};

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  showFilters,
  sortOption,
  filteredCount,
  onFilterChange,
  onResetFilters,
  onToggleFilters,
  onSortChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          <FaFilter className="mr-2 text-blue-600" />
          Filtres et tri
        </h3>
        <button
          onClick={onToggleFilters}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
        >
          {showFilters ? (
            <>
              <FaTimes className="mr-1" /> Masquer les filtres
            </>
          ) : (
            <>
              <FaSearch className="mr-1" /> Afficher les filtres
            </>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaLocationArrow className="mr-2 text-blue-600" />
                Pays de départ
              </label>
              <input
                type="text"
                name="PaysDepart"
                placeholder="Ex: Cameroun"
                value={filters.PaysDepart}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaLocationArrow className="mr-2 text-blue-600" />
                Pays d'arrivée
              </label>
              <input
                type="text"
                name="PaysArrivee"
                placeholder="Ex: Canada"
                value={filters.PaysArrivee}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaLocationArrow className="mr-2 text-blue-600" />
                Ville de départ
              </label>
              <input
                type="text"
                name="villeDepart"
                placeholder="Ex: Yaoundé"
                value={filters.villeDepart}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaLocationArrow className="mr-2 text-blue-600" />
                Ville d'arrivée
              </label>
              <input
                type="text"
                name="villeArrivee"
                placeholder="Ex: Montréal"
                value={filters.villeArrivee}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Date de départ
              </label>
              <input
                type="date"
                name="dateDepart"
                min={new Date().toISOString().split('T')[0]}
                value={filters.dateDepart}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaFilter className="mr-2 text-blue-600" />
                Type de transport
              </label>
              <select
                name="typeTransport"
                value={filters.typeTransport}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous</option>
                <option value="avion">Avion</option>
                <option value="voiture">Voiture</option>
                <option value="train">Train</option>
                <option value="bateau">Bateau</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poids min (kg)
              </label>
              <input
                type="number"
                name="poidsMin"
                min="0"
                placeholder="Min"
                value={filters.poidsMin}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poids max (kg)
              </label>
              <input
                type="number"
                name="poidsMax"
                min="0"
                placeholder="Max"
                value={filters.poidsMax}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix max/kg (Fcfa)
              </label>
              <input
                type="number"
                name="prixMax"
                min="0"
                step="0.5"
                placeholder="Prix maximum"
                value={filters.prixMax}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                onClick={onResetFilters}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-sm text-gray-600">
          {filteredCount} {filteredCount > 1 ? 'annonces trouvées' : 'annonce trouvée'}
        </div>

        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {Object.entries(sortOptions).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;