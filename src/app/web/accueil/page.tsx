"use client";

// import Link from 'next/link';
// export default DefaultHome;
import { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaHandshake, 
  FaSearch, 
  FaUsers, 
  FaStar, 
  FaRegClock, 
  FaShippingFast, 
  FaPlus
} from 'react-icons/fa';
import { GiWeight, GiEarthAmerica } from 'react-icons/gi';
import { MdPayment, MdReviews } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Link from 'next/link';

const Accueil = () => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Envois sécurisés",
      text: "Vos colis entre de bonnes mains"
    },
    {
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Voyagez utile",
      text: "Rentabilisez vos trajets"
    },
    {
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Économisez",
      text: "Jusqu'à 60% moins cher que les transporteurs classiques"
    },
    {
      image: "https://images.unsplash.com/photo-1476900543704-4312b9c4a2a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Confiance mutuelle",
      text: "Système de notation et avis vérifiés"
    },
    {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Suivi en temps réel",
      text: "Localisation de votre colis à chaque étape"
    }
  ];

  const steps = [
    {
      icon: <FaHandshake className="text-blue-600 text-4xl" />,
      title: "Rencontrez",
      description: "Créez ou trouvez une annonce. Entrez en contact avec une personne de confiance."
    },
    {
      icon: <MdPayment className="text-blue-600 text-4xl" />,
      title: "Paiement sécurisé",
      description: "Payez via notre système intelligent de confirmation à deux étapes."
    },
    {
      icon: <FaShippingFast className="text-blue-600 text-4xl" />,
      title: "Envoi réussi",
      description: "Votre colis est envoyé avec soin et votre vendeur est rémunéré."
    }
  ];

  const stats = [
    { value: 2500, suffix: "+", label: "Utilisateurs", icon: <FaUsers className="text-blue-600 text-3xl" /> },
    { value: 8500, suffix: "+", label: "Kilos échangés", icon: <GiWeight className="text-blue-600 text-3xl" /> },
    { value: 98, suffix: "%", label: "Satisfaction", icon: <FaStar className="text-blue-600 text-3xl" /> }
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
      title: "Sécurité",
      description: "Paiement bloqué jusqu'à réception du colis"
    },
    {
      icon: <GiEarthAmerica className="text-blue-600 text-3xl" />,
      title: "International",
      description: "Plus de 50 pays desservis"
    },
    {
      icon: <FaRegClock className="text-blue-600 text-3xl" />,
      title: "Rapidité",
      description: "Livraison en 2-5 jours selon destination"
    },
    {
      icon: <MdReviews className="text-blue-600 text-3xl" />,
      title: "Avis vérifiés",
      description: "Système de notation transparent"
    }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(carouselInterval);
    };
  }, [steps.length, carouselItems.length]);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Carousel */}
      <section className="relative h-screen">
        {carouselItems.map((item, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `linear-gradient(rgba(42, 92, 154, 0.7), rgba(58, 124, 186, 0.7)), url(${item.image})`,
              zIndex: currentSlide === index ? 10 : 0
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-center text-white max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">{item.title}</h1>
                <p className="text-xl md:text-2xl mb-8 animate-fadeIn">{item.text}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    // href={`${pathname}/add`}
                    href= "/web/annonce/add"
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    <span>Créer une annonce</span>
                  </Link>
                  <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center transition-all">
                    <FaSearch className="mr-2" />
                    Trouver un transporteur
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white" ref={ref1}>
        <div className="container flex-col mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600">Simple, rapide et sécurisé</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md p-8 text-center transition-all ${activeStep === index ? 'ring-4 ring-blue-500 scale-105' : 'opacity-90'}`}
              >
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50" ref={ref2}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2 text-blue-600">
                  {inView2 ? (
                    <CountUp 
                      end={stat.value} 
                      duration={2} 
                      suffix={stat.suffix} 
                    />
                  ) : `0${stat.suffix}`}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container flex-col mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">Ce que nos utilisateurs disent</p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:p-12">
              <blockquote className="mb-6">
                <p className="text-xl italic text-gray-700 mb-6">
                  "Grâce à KiloToGo, j'ai pu envoyer des médicaments à ma mère en Côte d'Ivoire pour moitié prix. Le système de suivi est génial !"
                </p>
                <footer className="flex items-center justify-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="font-bold">Fatou K.</span>, utilisatrice depuis 2022
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container flex-col mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à révolutionner vos envois ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de plus de 2500 utilisateurs satisfaits
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-all shadow-lg">
              Commencer maintenant
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all">
              Voir les tarifs
            </button>
          </div>
        </div>
      </section>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Accueil;