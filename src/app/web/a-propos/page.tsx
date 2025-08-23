"use client";

import React from 'react';
import { 
  FaPlane, 
  FaSuitcase, 
  FaHandshake, 
  FaShieldAlt,
  FaGlobeAmericas,
  FaChartLine,
  FaUsers,
  FaStar,
  FaLeaf,
  FaRocket
} from 'react-icons/fa';
import Image from 'next/image';

import { IMAGES } from "@/constants/images";

function Apropos() {
  const stats = [
    { value: 2500, label: 'Utilisateurs actifs', icon: <FaUsers className="text-blue-600" size={32} /> },
    { value: 8500, label: 'Kilos transportés', icon: <FaSuitcase className="text-blue-600" size={32} /> },
    { value: 98, label: 'Taux de satisfaction', icon: <FaStar className="text-blue-600" size={32} /> },
    { value: 50, label: 'Pays desservis', icon: <FaGlobeAmericas className="text-blue-600" size={32} /> }
  ];

  const values = [
    {
      icon: <FaHandshake className="text-blue-600" size={40} />,
      title: "Confiance",
      description: "Notre système de notation et vérification garantit des échanges sécurisés."
    },
    {
      icon: <FaLeaf className="text-blue-600" size={40} />,
      title: "Écologie",
      description: "Optimiser les voyages existants pour réduire l'empreinte carbone."
    },
    {
      icon: <FaChartLine className="text-blue-600" size={40} />,
      title: "Économie",
      description: "Jusqu'à 60% moins cher que les transporteurs traditionnels."
    },
    {
      icon: <FaGlobeAmericas className="text-blue-600" size={40} />,
      title: "Ouverture",
      description: "Relier les communautés vers des destinations moins desservies."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      icon: <FaSuitcase className="text-blue-600" size={28} />,
      title: "Créez ou trouvez une annonce",
      description: "Publiez votre besoin ou parcourez les voyages programmés."
    },
    {
      step: 2,
      icon: <FaHandshake className="text-blue-600" size={28} />,
      title: "Contactez le voyageur",
      description: "Échangez directement pour les détails du transport."
    },
    {
      step: 3,
      icon: <FaShieldAlt className="text-blue-600" size={28} />,
      title: "Paiement sécurisé",
      description: "Montant bloqué jusqu'à confirmation de livraison."
    },
    {
      step: 4,
      icon: <FaPlane className="text-blue-600" size={28} />,
      title: "Suivi en temps réel",
      description: "Suivez votre colis jusqu'à destination."
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-24 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Notre histoire
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Plus qu'un service, une communauté</h1>
            <p className="text-xl md:text-2xl mb-8">
              KiloToGo révolutionne le transport de colis en connectant voyageurs et expéditeurs pour des envois économiques, écologiques et sécurisés.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                Rejoindre la communauté
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-bold transition-all">
                Voir les témoignages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Image 
                src={IMAGES.mission}
                alt="Notre mission" 
                width={600}
                height={400}
                className="w-full h-auto max-h-[500px] rounded-xl shadow-xl object-cover"
                priority
              />
            </div>
            <div className="lg:w-1/2">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Notre raison d'être
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Révolutionner le transport de colis entre particuliers</h2>
              <p className="text-xl text-gray-600 mb-6">
                Chez KiloToGo, nous transformons les voyages en opportunités de transport mutuellement bénéfiques.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaPlane className="text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">Pour les voyageurs</strong> - Rentabilisez l'espace disponible dans vos bagages
                  </div>
                </li>
                <li className="flex items-start">
                  <FaSuitcase className="text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">Pour les expéditeurs</strong> - Envoyez vos colis à moindre coût en toute sécurité
                  </div>
                </li>
                <li className="flex items-start">
                  <FaUsers className="text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">Pour les communautés</strong> - Maintenez des liens forts malgré la distance
                  </div>
                </li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold flex items-center transition-all shadow-md">
                <FaRocket className="mr-2" />
                Découvrir notre vision
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-white">
        <div className="container flex-col mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              En un clin d'œil
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">KiloToGo en chiffres</h2>
            <p className="text-xl text-gray-600">Notre impact depuis le lancement</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-blue-600 text-3xl font-bold mb-2">{stat.value}+</h3>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container flex-col mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <Image
                src={IMAGES.values}
                alt="Nos valeurs"
                width={600}
                height={400}
                className="w-full h-auto max-h-[500px] rounded-xl shadow-xl object-cover"
              />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Notre ADN
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Les valeurs qui nous animent</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="py-16 bg-white">
        <div className="container flex-col mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Simplicité
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600">En 4 étapes seulement</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                  Étape {item.step}
                </span>
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* L'équipe */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Image
                src={IMAGES.team}
                alt="Notre équipe"
                width={600}
                height={400}
                className="w-full h-auto max-h-[500px] rounded-xl shadow-xl object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Humain avant tout
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Une équipe passionnée</h2>
              <p className="text-xl text-gray-600 mb-6">
                KiloToGo a été fondé par trois amis d'enfance originaires de Dakar, Paris et Montréal, 
                unis par une vision commune.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Amélioration continue de l'expérience utilisateur</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Extension de notre réseau de destinations</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Garantie de sécurité pour toutes vos transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Construction d'une communauté de membres fiables</span>
                </li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-md">
                Rencontrer l'équipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à nous rejoindre ?</h2>
            <p className="text-xl md:text-2xl mb-8">
              Que vous soyez voyageur occasionnel, expatrié ou simplement curieux, KiloToGo a une solution adaptée pour vous.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                Commencer maintenant
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-bold transition-all">
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apropos;