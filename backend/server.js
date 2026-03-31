import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(cors());

const usuarios = [
  {
    id: 1,
    nome: "Luis",
    nacionalidade: "Brasileiro"
  },
  {
    id: 2,
    nome: "Isabele",
    nacionalidade: "Brasileira"
  },
  {
    id: 3,
    nome: "Carlos",
    nacionalidade: "Português"
  },
  {
    id: 4,
    nome: "Ana",
    nacionalidade: "Argentina"
  },
  {
    id: 5,
    nome: "Mariana",
    nacionalidade: "Brasileira"
  },
  {
    id: 6,
    nome: "João",
    nacionalidade: "Brasileiro"
  },
  {
    id: 7,
    nome: "Pedro",
    nacionalidade: "Mexicano"
  },
  {
    id: 8,
    nome: "Lucia",
    nacionalidade: "Espanhola"
  },
  {
    id: 9,
    nome: "Fernando",
    nacionalidade: "Chileno"
  },
  {
    id: 10,
    nome: "Sofia",
    nacionalidade: "Colombiana"
  }
];

// Endpoint que retorna um usuário pelo ID
app.get('/usuario/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado"
    });
  }

  res.json(usuario);
});

// Porta do servidor
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});