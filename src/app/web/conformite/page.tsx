"use client";

import {
  FaBalanceScale,
  FaExclamationTriangle,
  FaUserCheck,
  FaHandshake
} from 'react-icons/fa';
import { useState } from 'react';

function Conformite() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('0');

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <FaBalanceScale className="text-4xl mr-3" />
            <h1 className="text-4xl font-bold">Engagement de Conformité</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Les règles essentielles pour des transactions sécurisées et transparentes sur KiloToGo
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                En utilisant la plateforme <strong className="text-blue-600">KiloToGo</strong>, chaque utilisateur s'engage à respecter les règles
                suivantes afin d'assurer un échange fiable, sécurisé et responsable entre toutes les parties.
              </p>
              <div className="inline-flex items-center mt-4 px-4 py-2 bg-amber-100 text-amber-800 rounded-full">
                <FaExclamationTriangle className="mr-2" /> Important
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {/* Responsabilité du Voyageur */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('0')}
                  className={`w-full flex items-center p-4 text-left ${activeAccordion === '0' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <FaUserCheck className="text-blue-600 text-xl mr-3" />
                  <span className="font-bold text-gray-800">Responsabilité du Voyageur (vendeur de kilos)</span>
                  <svg
                    className={`ml-auto h-5 w-5 text-gray-500 transform transition-transform ${activeAccordion === '0' ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeAccordion === '0' && (
                  <div className="p-4 pt-0">
                    <ul className="space-y-3 text-gray-700 pl-2">
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Déclarer honnêtement le poids, la disponibilité et l'itinéraire du voyage.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Ne jamais transporter de colis contenant des produits illicites, dangereux ou interdits.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Respecter les délais d'envoi et maintenir un contact constant avec l'expéditeur.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Ne débloquer les fonds qu'après confirmation réelle de l'envoi.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Fournir une preuve d'expédition claire et vérifiable pour chaque transaction.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Responsabilité de l'Expéditeur */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('1')}
                  className={`w-full flex items-center p-4 text-left ${activeAccordion === '1' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <FaUserCheck className="text-blue-600 text-xl mr-3" />
                  <span className="font-bold text-gray-800">Responsabilité de l'Expéditeur (acheteur de kilo)</span>
                  <svg
                    className={`ml-auto h-5 w-5 text-gray-500 transform transition-transform ${activeAccordion === '1' ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeAccordion === '1' && (
                  <div className="p-4 pt-0">
                    <ul className="space-y-3 text-gray-700 pl-2">
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Déclarer en toute transparence la nature du colis à expédier.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Ne pas envoyer de marchandises illégales, périssables ou non conformes à la réglementation du pays de destination.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Envoyer le code de validation uniquement après réception de la preuve d'expédition.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Fournir des informations exactes sur le contenu et la valeur des colis.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Respecter les conditions d'emballage et de préparation des colis.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Engagement commun */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('2')}
                  className={`w-full flex items-center p-4 text-left ${activeAccordion === '2' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <FaHandshake className="text-blue-600 text-xl mr-3" />
                  <span className="font-bold text-gray-800">Engagement commun</span>
                  <svg
                    className={`ml-auto h-5 w-5 text-gray-500 transform transition-transform ${activeAccordion === '2' ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeAccordion === '2' && (
                  <div className="p-4 pt-0">
                    <ul className="space-y-3 text-gray-700 pl-2">
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Respect mutuel entre utilisateurs dans la messagerie et dans les transactions.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Signalement immédiat de toute tentative de fraude ou de comportement suspect.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Acceptation de la retenue de 5% sur chaque transaction comme commission pour la plateforme.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Utilisation d'un système de paiement sécurisé via la plateforme.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>Respect des lois locales et internationales concernant le transport de marchandises.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Warning Section */}
            <div className="mt-10 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center mb-3">
                <FaExclamationTriangle className="text-red-600 text-xl mr-3" />
                <h5 className="text-lg font-bold text-red-800">Conséquences du non-respect</h5>
              </div>
              <p className="text-red-700">
                Tout manquement à ces engagements peut entraîner la suspension du compte, la perte d'accès à la plateforme 
                ou des poursuites légales conformément aux lois locales et internationales en vigueur.
              </p>
            </div>

            {/* Acceptance Section */}
            <div className="mt-10 text-center p-6 bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-800 mb-1">
                En continuant à utiliser KiloToGo, vous acceptez ces conditions de manière libre, éclairée et volontaire.
              </p>
              <small className="text-gray-500">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conformite;