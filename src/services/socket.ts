// server/socket.js
const { Server } = require('socket.io');
const { createServer } = require('http');
const { instrument } = require('@socket.io/admin-ui');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  }
});

// Instrumentation pour l'interface admin
instrument(io, {
  auth: false,
  mode: "development"
});

interface SendMessagePayload {
  conversationId: string;
  message: string;
}

io.on('connection', (socket: import('socket.io').Socket) => {
  console.log(`Client connecté: ${socket.id}`);

  // Rejoindre une conversation
  socket.on('joinConversation', (conversationId: string) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} a rejoint ${conversationId}`);
  });

  // Envoi de message
  socket.on('sendMessage', ({ conversationId, message }: SendMessagePayload) => {
    io.to(conversationId).emit('newMessage', message);
  });

  // Gestion de la présence
  socket.on('setUserOnline', (userId: string) => {
    socket.broadcast.emit('userOnline', userId);
  });

  socket.on('disconnect', () => {
    console.log(`Client déconnecté: ${socket.id}`);
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.IO server running on port 3001');
});