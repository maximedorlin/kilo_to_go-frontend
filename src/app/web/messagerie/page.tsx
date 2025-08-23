"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

type Message = {
  id: number;
  from: string;
  text: string;
  timestamp: string;
};

const MessagePage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial messages (mock or API)
  const loadMessages = useCallback(() => {
    try {
      // Mock data - replace with actual API call
      setMessages([
        {
          id: 1,
          from: 'Jean',
          text: "Bonjour, votre colis est prêt ?",
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 2,
          from: 'user',
          text: "Oui, je l'apporte à l'aéroport demain.",
          timestamp: new Date(Date.now() - 7100000).toISOString()
        }
      ]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load messages');
      setLoading(false);
    }
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  // Handle new incoming messages
  const handleNewMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
    scrollToBottom();
  }, [scrollToBottom]);

  // Initialize socket connection
  useEffect(() => {
    if (!conversationId) {
      setError("Missing conversation ID");
      setLoading(false);
      return;
    }

    try {
      socketRef.current = io(process.env.REACT_APP_WS_URL || 'http://localhost:3001', {
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
      });

      const socket = socketRef.current;

      const handleConnect = () => {
        loadMessages();
        setOnlineStatus(true);
      };

      const handleDisconnect = () => {
        setOnlineStatus(false);
      };

      const handleConnectError = (err: Error) => {
        console.error('Connection error:', err);
        setError('Failed to connect to messaging server');
        setLoading(false);
      };

      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      socket.on('connect_error', handleConnectError);
      socket.on('newMessage', handleNewMessage);
      socket.on('userStatus', setOnlineStatus);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
        socket.off('connect_error', handleConnectError);
        socket.off('newMessage', handleNewMessage);
        socket.off('userStatus', setOnlineStatus);
        socket.disconnect();
      };
    } catch (err) {
      console.error('Socket initialization error:', err);
      setError('Failed to initialize messaging');
      setLoading(false);
    }
  }, [conversationId, loadMessages, handleNewMessage]);

  // Send message handler
  const handleSend = useCallback(() => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      from: 'user',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    if (socketRef.current?.connected) {
      socketRef.current.emit('sendMessage', {
        conversationId,
        message
      });
    } else {
      // Fallback if socket isn't connected
      setMessages(prev => [...prev, message]);
    }

    setNewMessage('');
    scrollToBottom();
  }, [newMessage, conversationId, scrollToBottom]);

  // Handle Enter key press
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with online status */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Conversation</h1>
        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full mr-2 ${onlineStatus ? 'bg-green-400' : 'bg-gray-400'}`}></span>
          <span>{onlineStatus ? 'En ligne' : 'Hors ligne'}</span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${msg.from === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow'}`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className={`text-xs mt-1 ${msg.from === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-300 p-4 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez un message..."
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;