import express from 'express';
import mongoose from 'mongoose';
import rotas from './routes.js'; //importa o mapa de rotas

const app = express();

//ensina o servidor a entender dados no formato JSON (que o front-end vai enviar)
app.use(express.json());

//avisa o servidor para usar omapa de rotas com o prefixo "/api"
app.use('/api', rotas);

//URL de conexão do MongoDB
const uri = 'mongodb://127.0.0.1:27017/sistema_pousada';

//conecta no banco de dados e liga o servidor
mongoose.connect(uri).then(() => {
  console.log('Banco de dados conectado com sucesso.');
  
  //liga a "porta de entrada" na porta 3000 do seu computador
  app.listen(3000, () => {
    console.log('Servidor da pousada rodando em http://localhost:3000');
  });
}).catch((erro) => {
  console.error('Erro ao conectar no mongodb', erro);
});