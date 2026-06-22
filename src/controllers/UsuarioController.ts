import type { Request, Response } from 'express';
import { criarUsuario } from '../services/UsuarioService.js';

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    //o controller apenas repassa os dados (req.body) para o service
    const usuario = await criarUsuario(req.body);
    
    //devolve a resposta de sucesso
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario });
  } catch (erro: any) {
    //se o service jogar um erro (ex: e-mail repetido), o controller avisa o front-end
    return res.status(400).json({ erro: erro.message });
  }
};