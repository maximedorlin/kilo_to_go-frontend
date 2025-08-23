"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMessageSquare, FiClock, FiUser, FiCheck } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';

type Interlocuteur = {
  id: string;
  name: string;
  online: boolean;
};

type DernierMessage = {
  text: string;
  timestamp: string;
  read: boolean;
};

type Conversation = {
  id: string;
  annonceId: number;
  titreAnnonce: string;
  dernierMessage: DernierMessage;
  interlocuteur: Interlocuteur;
  unread: number;
};

const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setTimeout(() => {
          const mockData: Conversation[] = [
            {
              id: 'conv-1',
              annonceId: 101,
              titreAnnonce: "10 kg dispo - Douala → Paris",
              dernierMessage: {
                text: "Merci, j'envoie le code ce soir.",
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                read: false
              },
              interlocuteur: {
                id: 'user-2',
                name: "Jean",
                online: true
              },
              unread: 2
            },
            {
              id: 'conv-2',
              annonceId: 102,
              titreAnnonce: "8 kg - Yaoundé → Bruxelles",
              dernierMessage: {
                text: "Est-ce que je peux envoyer un petit colis ?",
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                read: true
              },
              interlocuteur: {
                id: 'user-3',
                name: "Clara",
                online: false
              },
              unread: 0
            },
            {
              id: 'conv-3',
              annonceId: 103,
              titreAnnonce: "5 kg - Abidjan → Marseille",
              dernierMessage: {
                text: "Le colis est bien arrivé, merci beaucoup !",
                timestamp: new Date(Date.now() - 172800000).toISOString(),
                read: true
              },
              interlocuteur: {
                id: 'user-4',
                name: "Amina",
                online: true
              },
              unread: 0
            }
          ];
          setConversations(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Erreur de chargement des conversations");
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversations, loading, error };
};

const MesMessages: React.FC = () => {
  const { conversations, loading, error } = useConversations();
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setUnreadCount(conversations.reduce((acc, conv) => acc + conv.unread, 0));
  }, [conversations]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <FiMessageSquare className="text-blue-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">Mes conversations</h1>
          </div>
          
          {unreadCount > 0 && (
            <div className="relative">
              <IoMdNotificationsOutline className="text-2xl text-gray-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {conversations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune conversation pour le moment</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/messages/${conv.annonceId}`}
                  className={`block p-4 hover:bg-gray-50 transition-colors ${conv.unread > 0 ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Online status and avatar */}
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FiUser className="text-lg" />
                      </div>
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        conv.interlocuteur.online ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {conv.titreAnnonce}
                        </h2>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <FiClock className="flex-shrink-0" />
                          <span>{formatDate(conv.dernierMessage.timestamp)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-1">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {conv.interlocuteur.name}
                          </p>
                          <p className={`text-sm truncate ${
                            !conv.dernierMessage.read ? 'font-semibold text-gray-900' : 'text-gray-500'
                          }`}>
                            {conv.dernierMessage.text}
                          </p>
                        </div>

                        {conv.unread > 0 ? (
                          <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conv.unread}
                          </span>
                        ) : (
                          <FiCheck className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MesMessages;