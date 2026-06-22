import type { Request, Response } from 'express';
import { processarNovaReserva } from '../services/ReservaService.js';

export const criarReserva = async (req: Request, res: Response) => {
  try {
    const reserva = await processarNovaReserva(req.body);
    return res.status(201).json({ mensagem: 'Reserva efetuada e calculada com sucesso!', reserva });
  } catch (erro: any) {
    return res.status(400).json({ erro: erro.message });
  }
};