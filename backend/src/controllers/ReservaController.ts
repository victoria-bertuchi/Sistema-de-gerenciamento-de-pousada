import type { Request, Response } from 'express';
import { processarNovaReserva, buscarStatusDosQuartosPorData, atualizarReservaExistente } from '../services/ReservaService.js';
import Reserva from '../models/Reserva.js';

export const criarReserva = async (req: Request, res: Response) => {
  try {
    const reserva = await processarNovaReserva(req.body);
    return res.status(201).json({ mensagem: 'Reserva efetuada e calculada com sucesso!', reserva });
  } catch (erro: any) {
    return res.status(400).json({ erro: erro.message });
  }
};

export const listarCronogramaPorData = async (req: Request, res: Response) => {
  try {
    const { data } = req.query; 

    if (!data) {
      return res.status(400).json({ erro: 'A data é obrigatória para filtrar o cronograma.' });
    }

    const dadosCronograma = await buscarStatusDosQuartosPorData(data as string);
    return res.status(200).json(dadosCronograma);
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao carregar o cronograma.', detalhes: erro.message });
  }
};

export const excluirReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 

    const reservaDeletada = await Reserva.findByIdAndDelete(id);

    if (!reservaDeletada) {
      return res.status(404).json({ erro: 'Reserva não encontrada para exclusão.' });
    }

    return res.status(200).json({ mensagem: 'Reserva excluída com sucesso do banco de dados!' });
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao excluir a reserva.', detalhes: erro.message });
  }
};
export const editarReserva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; 
    
    const reservaModificada = await atualizarReservaExistente(id, req.body);

    if (!reservaModificada) {
      return res.status(404).json({ erro: 'Reserva não encontrada para edição.' });
    }

    return res.status(200).json({ mensagem: 'Reserva alterada com sucesso!', reserva: reservaModificada });
  } catch (erro: any) {
    return res.status(400).json({ erro: erro.message });
  }
};
