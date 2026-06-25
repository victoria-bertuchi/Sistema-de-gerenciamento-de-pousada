import type { Request, Response } from 'express';
import { criarNovaEscala } from '../services/EscalaService.js';

export const criarEscala = async (req: Request, res: Response) => {
  try {
    const escala = await criarNovaEscala(req.body);
    return res.status(201).json({ mensagem: 'Escala de trabalho montada!', escala });
  } catch (erro: any) {
    return res.status(400).json({ erro: 'Erro ao montar a escala', detalhes: erro.message });
  }
};