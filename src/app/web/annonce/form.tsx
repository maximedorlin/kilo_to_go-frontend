"use client";

import React, { useState, FormEvent } from 'react';
import { 
  FaPlane, 
  FaBoxOpen, 
  FaInfoCircle, 
  FaCalendarAlt, 
  FaWeightHanging,
  FaCheckCircle
} from 'react-icons/fa';
import { MdDescription, MdLocalShipping } from 'react-icons/md';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/services/AuthContext';
import { db, storage } from '@/services/firebaseConfig';

interface FormData {
  titre: string;
  PaysDepart: string;
  PaysArrivee: string;
  villeDepart: string;
  villeArrivee: string;
  dateDepart: string;
  dateArrivee: string;
  poidsDisponible: string;
  prixParKilo: string;
  typeTransport: string;
  description: string;
  restrictions: string;
  emballageFourni: boolean;
  assuranceIncluse: boolean;
  photoBillet: File | null;
  photoColis: File | null;
}

const CreerAnnonce: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    titre: '',
    PaysDepart: '',
    PaysArrivee: '',
    villeDepart: '',
    villeArrivee: '',
    dateDepart: '',
    dateArrivee: '',
    poidsDisponible: '',
    prixParKilo: '',
    typeTransport: 'avion',
    description: '',
    restrictions: '',
    emballageFourni: false,
    assuranceIncluse: false,
    photoBillet: null,
    photoColis: null
  });

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['titre', 'villeDepart', 'villeArrivee', 'dateDepart', 'poidsDisponible', 'prixParKilo'];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = 'Ce champ est requis';
      }
    });

    if (formData.poidsDisponible && parseFloat(formData.poidsDisponible) <= 0) {
      newErrors.poidsDisponible = 'Doit être supérieur à 0';
    }

    if (formData.prixParKilo && parseFloat(formData.prixParKilo) <= 0) {
      newErrors.prixParKilo = 'Doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'photoBillet' | 'photoColis') => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [field]: 'La taille maximale est de 5MB' }));
        return;
      }
      
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, [field]: 'Seules les images sont acceptées' }));
        return;
      }
      
      setErrors(prev => ({ ...prev, [field]: '' }));
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!user) return;

    setIsLoading(true);
    setSuccess(false);

    try {
      // Upload images in parallel
      const [billetUrl, colisUrl] = await Promise.all([
        formData.photoBillet ? uploadImage(formData.photoBillet, 'billet') : Promise.resolve(null),
        formData.photoColis ? uploadImage(formData.photoColis, 'colis') : Promise.resolve(null)
      ]);

      await addDoc(collection(db, 'annonces'), {
        ...formData,
        photoBilletURL: billetUrl,
        photoColisURL: colisUrl,
        utilisateurId: user.uid,
        emailUtilisateur: user.email,
        dateCreation: Timestamp.now()
      });

      setSuccess(true);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      setErrors(prev => ({ ...prev, form: "Erreur lors de la création de l'annonce" }));
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File, type: string) => {
    const storageRef = ref(storage, `annonces/${Date.now()}-${type}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      PaysDepart: '',
      PaysArrivee: '',
      villeDepart: '',
      villeArrivee: '',
      dateDepart: '',
      dateArrivee: '',
      poidsDisponible: '',
      prixParKilo: '',
      typeTransport: 'avion',
      description: '',
      restrictions: '',
      emballageFourni: false,
      assuranceIncluse: false,
      photoBillet: null,
      photoColis: null
    });
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-5 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <MdLocalShipping className="mr-3" />
              Créer une nouvelle annonce de transport
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            {success ? (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <FaCheckCircle className="mr-2 text-xl" />
                  <span className="font-medium">Annonce créée avec succès !</span>
                </div>
              </div>
            ) : errors.form ? (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {errors.form}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1 : Infos de base */}
              <section>
                <h3 className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
                  <FaInfoCircle className="mr-2" /> Informations de base
                </h3>

                <div className="mb-4">
                  <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'annonce*
                  </label>
                  <input
                    type="text"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Ex: 10kg disponibles Paris → Douala"
                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.titre ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {['PaysDepart', 'PaysArrivee', 'villeDepart', 'villeArrivee'].map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.includes('Pays') ? 'Pays' : 'Ville'} {field.includes('Depart') ? 'de départ*' : "d'arrivée*"}
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        value={formData[field as keyof FormData] as string}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[field] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 2 : Dates */}
              <section>
                <h3 className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
                  <FaCalendarAlt className="mr-2" /> Dates de voyage
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateDepart" className="block text-sm font-medium text-gray-700 mb-1">
                      Date de départ*
                    </label>
                    <input
                      type="date"
                      id="dateDepart"
                      name="dateDepart"
                      value={formData.dateDepart}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.dateDepart ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dateDepart && <p className="mt-1 text-sm text-red-600">{errors.dateDepart}</p>}
                  </div>
                  <div>
                    <label htmlFor="dateArrivee" className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'arrivée (optionnel)
                    </label>
                    <input
                      type="date"
                      id="dateArrivee"
                      name="dateArrivee"
                      value={formData.dateArrivee}
                      onChange={handleChange}
                      min={formData.dateDepart || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 3 : Détails */}
              <section>
                <h3 className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
                  <FaWeightHanging className="mr-2" /> Détails du transport
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="poidsDisponible" className="block text-sm font-medium text-gray-700 mb-1">
                      Poids disponible (kg)*
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="poidsDisponible"
                        name="poidsDisponible"
                        value={formData.poidsDisponible}
                        onChange={handleChange}
                        min="0.1"
                        step="0.1"
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.poidsDisponible ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <span className="absolute right-3 top-2 text-gray-500">kg</span>
                    </div>
                    {errors.poidsDisponible && <p className="mt-1 text-sm text-red-600">{errors.poidsDisponible}</p>}
                  </div>
                  <div>
                    <label htmlFor="prixParKilo" className="block text-sm font-medium text-gray-700 mb-1">
                      Prix par kilo (€)*
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="prixParKilo"
                        name="prixParKilo"
                        value={formData.prixParKilo}
                        onChange={handleChange}
                        min="0.1"
                        step="0.1"
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.prixParKilo ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <span className="absolute right-3 top-2 text-gray-500">€</span>
                    </div>
                    {errors.prixParKilo && <p className="mt-1 text-sm text-red-600">{errors.prixParKilo}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="typeTransport" className="block text-sm font-medium text-gray-700 mb-1">
                    Mode de transport
                  </label>
                  <select
                    id="typeTransport"
                    name="typeTransport"
                    value={formData.typeTransport}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="avion">Avion</option>
                    <option value="voiture">Voiture</option>
                    <option value="train">Train</option>
                    <option value="bateau">Bateau</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="emballageFourni"
                      checked={formData.emballageFourni}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-gray-700">Emballage fourni</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="assuranceIncluse"
                      checked={formData.assuranceIncluse}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-gray-700">Assurance incluse</span>
                  </label>
                </div>
              </section>

              {/* SECTION 4 : Description */}
              <section>
                <h3 className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
                  <MdDescription className="mr-2" /> Description et restrictions
                </h3>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700 mb-1">
                    Restrictions
                  </label>
                  <textarea
                    id="restrictions"
                    name="restrictions"
                    rows={2}
                    value={formData.restrictions}
                    onChange={handleChange}
                    placeholder="Ex: Pas d'objets fragiles, pas de produits alimentaires..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </section>

              {/* SECTION 5 : Photos */}
              <section>
                <h3 className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
                  <FaBoxOpen className="mr-2" /> Photos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="photoBillet" className="block text-sm font-medium text-gray-700 mb-1">
                      Photo du billet d'avion (optionnel)
                    </label>
                    <input
                      type="file"
                      id="photoBillet"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'photoBillet')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.photoBillet && <p className="mt-1 text-sm text-red-600">{errors.photoBillet}</p>}
                  </div>
                  <div>
                    <label htmlFor="photoColis" className="block text-sm font-medium text-gray-700 mb-1">
                      Photo du colis ou de vous (optionnel)
                    </label>
                    <input
                      type="file"
                      id="photoColis"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'photoColis')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.photoColis && <p className="mt-1 text-sm text-red-600">{errors.photoColis}</p>}
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publication en cours...
                    </>
                  ) : (
                    <>
                      <FaPlane className="mr-2" /> Publier mon annonce
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreerAnnonce;