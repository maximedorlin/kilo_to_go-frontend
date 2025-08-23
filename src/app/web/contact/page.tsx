"use client";

import React, { useState, useRef } from 'react';
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRobot,
  FaCalendarAlt,
  FaVideo,
  FaUser
} from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { IoMdSend } from 'react-icons/io';
import { TbMessageChatbot } from 'react-icons/tb';
import Image from 'next/image';
import { IMAGES } from '@/constants/images';

interface ContactFormState {
  fullName: string;
  emailAddress: string;
  subject: string;
  messageContent: string;
}

function Contact() {
  const [contactForm, setContactForm] = useState<ContactFormState>({
    fullName: '',
    emailAddress: '',
    subject: '',
    messageContent: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const [activeView, setActiveView] = useState<'contactForm' | 'liveSupport'>('contactForm');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('success');
      formRef.current?.reset();
      setContactForm({
        fullName: '',
        emailAddress: '',
        subject: '',
        messageContent: ''
      });
    }, 1500);
  };

  const contactOptions = [
    {
      icon: <FaMapMarkerAlt size={28} />,
      title: "Notre siège social",
      info: "12 Rue du Transport, 75015 Paris",
      actionText: "Voir sur la carte",
      accentColor: "bg-orange-400"
    },
    {
      icon: <FaPhoneAlt size={28} />,
      title: "Service client",
      info: "+33 1 23 45 67 89",
      actionText: "Appeler maintenant",
      accentColor: "bg-blue-500"
    },
    {
      icon: <FaEnvelope size={28} />,
      title: "Email professionnel",
      info: "contact@kilotogo.com",
      actionText: "Nous écrire",
      accentColor: "bg-green-500"
    }
  ];

  const supportServices = [
    {
      icon: <TbMessageChatbot size={32} />,
      title: "Assistant virtuel",
      description: "Obtenez des réponses immédiates à vos questions",
      actionText: "Démarrer le chat",
      isInteractive: true,
      accentColor: "text-purple-500"
    },
    {
      icon: <RiCustomerService2Fill size={32} />,
      title: "Support téléphonique",
      description: "Échangez directement avec un conseiller",
      actionText: "Appeler le support",
      isInteractive: true,
      accentColor: "text-blue-500"
    },
    {
      icon: <FaCalendarAlt size={32} />,
      title: "Visio-conférence",
      description: "Planifiez un rendez-vous avec notre équipe",
      actionText: "Choisir un horaire",
      isInteractive: true,
      accentColor: "text-orange-500"
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0 relative z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500">
                <span className="text-blue-800">Échangez</span> avec notre équipe
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Chez KiloToGo, nous privilégions des solutions de contact modernes et accessibles
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  className={`flex items-center justify-center px-6 py-3 rounded-full border-2 transition-all ${activeView === 'contactForm' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setActiveView('contactForm')}
                >
                  <FaPaperPlane className="mr-2" />
                  Formulaire de contact
                </button>
                <button
                  className={`flex items-center justify-center px-6 py-3 rounded-full border-2 transition-all ${activeView === 'liveSupport' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setActiveView('liveSupport')}
                >
                  <FaRobot className="mr-2" />
                  Options en direct
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <Image
                src={IMAGES.team}
                alt="Notre équipe"
                width={600}
                height={400}
                className="w-full h-auto max-h-[500px] rounded-xl shadow-xl object-cover"
              />

            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content */}
      {activeView === 'contactForm' ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                <h2 className="text-3xl font-bold text-blue-700 mb-8 flex items-center">
                  <FaPaperPlane className="mr-3" />
                  Votre message nous intéresse
                </h2>

                {formStatus === 'success' && (
                  <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                    Merci ! Nous traitons votre demande et reviendrons vers vous rapidement.
                  </div>
                )}

                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <FaUser />
                        </div>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={contactForm.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="Votre nom complet"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <FaEnvelope />
                        </div>
                        <input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          value={contactForm.emailAddress}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Objet de votre message
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-1">
                      Votre message
                    </label>
                    <textarea
                      id="messageContent"
                      name="messageContent"
                      value={contactForm.messageContent}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full flex justify-center items-center py-4 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg ${formStatus === 'sending' ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <IoMdSend className="mr-2" />
                        Envoyer mon message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="container flex-col mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
              <RiCustomerService2Fill className="mr-3 text-blue-600" />
              Nos solutions d'assistance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportServices.map((service, index) => (
                <div
                  key={`support-${index}`}
                  className={`bg-white rounded-xl p-8 shadow-md border border-gray-200 transition-all hover:shadow-lg ${service.isInteractive ? 'hover:-translate-y-2 border-t-4 border-orange-400' : ''}`}
                >
                  <div className={`text-4xl mb-6 ${service.accentColor}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button className={`px-6 py-2 rounded-full font-medium transition-all ${service.isInteractive ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {service.actionText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div
                key={`contact-${index}`}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${option.accentColor} rounded-full flex items-center justify-center text-white text-2xl mb-6`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.info}</p>
                <button className={`px-6 py-2 rounded-full font-medium text-white ${option.accentColor} hover:opacity-90 transition-opacity`}>
                  {option.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Conference Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Échange en visioconférence</h2>
              <p className="text-lg text-gray-700 mb-8">
                Programmez une consultation vidéo pour discuter de vos besoins spécifiques.
                Idéal pour les demandes complexes ou les partenariats.
              </p>
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-md transition-all flex items-center">
                <FaVideo className="mr-2" />
                Planifier une session
              </button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden h-64 md:h-80 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-blue-100 opacity-30"></div>
                <button className="z-10 w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transform transition-transform hover:scale-110">
                  <FaVideo />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation */}
      {/* <style jsx global>{` */}
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
}

export default Contact;