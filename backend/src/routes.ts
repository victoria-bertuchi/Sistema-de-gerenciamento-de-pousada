import { Router } from 'express';

//importando os  recepcionistas (Controllers)
import { cadastrarUsuario, listarUsuarios, loginUsuario, editarPerfilUsuario, excluirUsuario } from './controllers/UsuarioController.js';
import { cadastrarQuarto, atualizarStatus, listarQuartos } from './controllers/QuartoController.js';
import { criarReserva, listarCronogramaPorData, excluirReserva, editarReserva } from './controllers/ReservaController.js';
import { criarEscala } from './controllers/EscalaController.js';

const router = Router();
//placa de sinalização (rotas)

//rota para Usuários
router.post('/usuarios', cadastrarUsuario);
router.get('/usuarios', listarUsuarios);
router.post('/usuarios/login', loginUsuario);
router.put('/usuarios/perfil/:id', editarPerfilUsuario);
router.delete('/usuarios/:id', excluirUsuario);

//rotas para Quartos
router.post('/quartos', cadastrarQuarto);
router.put('/quartos/:id', atualizarStatus);
router.get('/quartos', listarQuartos); // O ":id" avisa que ali vai o código do quarto

//rota para Reservas
router.post('/reservas', criarReserva);
router.get('/cronograma', listarCronogramaPorData);
router.delete('/reservas/:id', excluirReserva);
router.put('/reservas/:id', editarReserva);

//rota para Escala de Funcionários
router.post('/escalas', criarEscala);

export default router;