import type { Request, Response } from 'express';
import { criarQuarto, atualizarStatusQuarto } from '../services/QuartoService.js';

export const cadastrarQuarto = async (req: Request, res: Response) => {
  try {
    const quarto = await criarQuarto(req.body);
    return res.status(201).json({ mensagem: 'Quarto configurado com sucesso!', quarto });
  } catch (erro: any) {
    return res.status(400).json({ erro: 'Erro ao cadastrar quarto', detalhes: erro.message });
  }
};

export const atualizarStatus = async (req: Request, res: Response) => {
  try {
    // Extraímos as variáveis e garantimos ao TypeScript (as string) o formato correto
    const id = req.params.id as string;
    const status = req.body.status as string; 

    const quarto = await atualizarStatusQuarto(id, status);
    return res.status(200).json({ mensagem: 'Status do quarto atualizado!', quarto });
  } catch (erro: any) {
    return res.status(404).json({ erro: erro.message });
  }
};