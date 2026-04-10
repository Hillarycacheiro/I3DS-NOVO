// ====================================
// SERVIDOR DE CHAT EM TEMPO REAL
// ====================================
// Este servidor gerencia as conexões de usuários e distribui mensagens
// Tecnologias:
// - Express: Framework web para HTTP
// - Socket.io: Comunicação bidirecional em tempo real via WebSocket

const app = require("express")(); // Importa a biblioteca Express
const server = require("http").createServer(app); // Importa módulo HTTP nativo do Node.js (necessário para o Socket.io)
const io = require("socket.io")(server, {
  // Importa Socket.io e configura para o servidor HTTP
  // CORS (Cross-Origin Resource Sharing): permite que clientes de outros domínios/IPs se conectem
  // Altere o IP para o IP da máquina onde o servidor está rodando
  cors: { origin: "http://localhost:5173" },
  // Exemplo: "http://localhost:5173" para desenvolvimento local
  // Exemplo: "http://seu.ip.aqui:5173" para rede
});

const PORT = 3001; // Porta na qual o servidor irá escutar conexões

// =============================================
// EVENT LISTENER: Quando um cliente se conecta
// =============================================
io.on("connection", (socket) => {
  // "socket" representa a conexão de um único cliente
  // Cada cliente que se conecta recebe um novo objeto "socket"
  // socket.id: ID único do cliente (gerado automaticamente)
  // socket.data: Objeto para armazenar dados do cliente (username, etc)

  // ==================================
  // EVENTO: Usuário define seu nome
  // ==================================
  socket.on("set_username", (username) => {
    // Armazena o nome de usuário no objeto socket para uso posterior
    socket.data.username = username;
    // Registra no console que um usuário conectou
    userName(username, socket.id);
  });

  // ==================================
  // EVENTO: Usuário desconecta
  // ==================================
  socket.on("disconnect", (reason) => {
    // Registra informação sobre desconexão
    console.log(
      `Usuário ${socket.data.username} desconetado! Sua id era ${socket.id}`,
    );
    // Motivo da desconexão. Motivos comuns: "client namespace disconnect", "client left", etc
    console.log(`Motivo: ${reason}`);
  });

  // ==================================
  // EVENTO: Servidor recebe mensagem
  // ==================================

  socket.on("message", (text) => {
    // Quando um cliente envia uma mensagem, o servidor:
    // 1. Cria um objeto com dados da mensagem
    // 2. Envia para TODOS os clientes conectados usando io.emit()
    // Isso permite que todos vejam a mensagem em tempo real
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
    console.log(`Usuário ${socket.data.username} enviou uma mensagem!`);
  });
});

// Registra no console quando um novo usuário se conecta
const userName = (username, id) => {
  console.log(`Usuário ${username} conectado com o seguinte id: ${id}`);
};

// ==================================
// INICIAR O SERVIDOR
// ==================================
server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}...`);
  console.log(`Cliente deve conectar em http://seu-ip:${PORT}`);
});