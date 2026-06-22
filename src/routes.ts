import { Router } from 'express';

//importando os  recepcionistas (Controllers)
import { cadastrarUsuario } from './controllers/UsuarioController.js';
import { cadastrarQuarto, atualizarStatus } from './controllers/QuartoController.js';
import { criarReserva } from './controllers/ReservaController.js';
import { criarEscala } from './controllers/EscalaController.js';

const router = Router();
//placa de sinalização (rotas)
//rota para Usuários
router.post('/usuarios', cadastrarUsuario);

//rotas para Quartos
router.post('/quartos', cadastrarQuarto);
router.put('/quartos/:id/status', atualizarStatus); // O ":id" avisa que ali vai o código do quarto

//rota para Reservas
router.post('/reservas', criarReserva);

//rota para Escala de Funcionários
router.post('/escalas', criarEscala);

export default router;