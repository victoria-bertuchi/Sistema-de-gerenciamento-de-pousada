import type { Request, Response } from 'express';
import { criarQuarto, atualizarStatusQuarto, buscarTodosQuartos } from '../services/QuartoService.js';

export const cadastrarQuarto = async (req: Request, res: Response) => {
  try {
    const quarto = await criarQuarto(req.body);
    return res.status(201).json({ mensagem: 'Quarto configurado com sucesso!', quarto });
  } catch (erro: any) {
    return res.status(400).json({ erro: 'Erro ao cadastrar quarto', detalhes: erro.message });
  }
};

export const listarQuartos = async (req: Request, res: Response) => {
  try {
    const quartos = await buscarTodosQuartos();
    return res.status(200).json(quartos); 
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao buscar quartos', detalhes: erro.message });
  }
};

export const atualizarStatus = async (req: Request, res: Response) => {
  try {
    // Extraímos as variáveis e garantimos ao TypeScript (as string) o formato correto
    const id = req.params.id as string; 
    const { status, funcionario } = req.body;

    const quartoAtualizado = await atualizarStatusQuarto(id, status, funcionario);

    return res.status(200).json(quartoAtualizado);
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao atualizar status do quarto', detalhes: erro.message });
  }
};
