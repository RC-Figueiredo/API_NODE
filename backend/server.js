const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();

// Criar servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO - instância do Socket.IO que fica "acoplada" ao servidor HTTP criado;
const io = new Server(server);

// Conexão Socket - sempre que um cliente se conecta, essa função é executada (se 5 pessoas se conectarem, a função roda 5 vezes)
io.on('connection', (socket) => { // -> cada cliente recebe um objeto socket (representa, apenas, aquele usuário)
  console.log('Usuário conectado:', socket.id);

  // Evento quando usuário entra no chat
  socket.on('join', ({ username }) => { //Fica escutando o evento 'join' (enviado pelo frontend)
    socket.username = username;

    console.log(`${username} entrou`);

    io.emit('message', {
      type: 'system',
      text: `${username} entrou no chat`
    });
  });

  // Evento de mensagem
  socket.on('chat', ({ text }) => {
    if (!socket.username) return;

    io.emit('message', {
      type: 'chat',
      username: socket.username,
      text
    });
  });

  // Quando desconecta
  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('message', {
        type: 'system',
        text: `${socket.username} saiu do chat`
      });
    }

    console.log('Usuário desconectado:', socket.id);
  });
});

// Rota básica para o Render detectar
app.get('/', (req, res) => {
  res.send('Servidor Socket.IO rodando');
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});