import type { Request, Response } from 'express';
import { criarUsuario, buscarTodosUsuarios, buscarUsuarioPorEmail, atualizarDadosUsuario, deletarUsuarioPorId } from '../services/UsuarioService.js';
import Quarto from '../models/Quarto.js';

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    //o controller apenas repassa os dados (req.body) para o service
    const { nome, cargo, email, senha } = req.body;

    const cargoMinusculo = cargo.toLowerCase();
    const nivelAcesso = (cargoMinusculo.includes('gerente') || cargoMinusculo.includes('dono') || cargoMinusculo.includes('adm')) 
      ? 'administrador' 
      : 'funcionario';

    const usuario = await criarUsuario({
      nome,
      cargo,       
      email,
      senha,
      nivelAcesso 
    });

    //devolve a resposta de sucesso
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario });
    
  } catch (erro: any) {
    //se o service jogar um erro (ex: e-mail repetido), o controller avisa o front-end
    return res.status(400).json({ erro: erro.message });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await buscarTodosUsuarios();

    const usuariosComQuartos = await Promise.all(
      usuarios.map(async (usuario: any) => {
        const nomeLimpo = usuario.nome.trim();

        const quartosAtribuidos = await Quarto.find({ 
          funcionario: { $regex: new RegExp(`^${nomeLimpo}$`, 'i') } 
        });
        
        const nomesDosQuartos = quartosAtribuidos.map(q => q.nome);

        const usuarioObjeto = usuario.toObject();

        return {
          _id: usuarioObjeto._id,
          nome: usuarioObjeto.nome,
          email: usuarioObjeto.email,
          cargo: usuarioObjeto.cargo,
          nivelAcesso: usuarioObjeto.nivelAcesso === 'administrador' ? 'admin' : usuarioObjeto.nivelAcesso,
          quartos: nomesDosQuartos 
        };
      })
    );

    return res.status(200).json(usuariosComQuartos);
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: erro.message });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body; 

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Por favor, preencha e-mail e senha.' });
    }

    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ erro: 'E-mail não encontrado no sistema.' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    return res.status(200).json({
      usuario: {
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        nivelAcesso: usuario.nivelAcesso === 'administrador' ? 'admin' : usuario.nivelAcesso 
      }
    });

  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro interno ao realizar login', detalhes: erro.message });
  }
};

export const editarPerfilUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; 
    
    const dadosRecebidos = req.body;

    const camposParaAtualizar: any = {};
    
    if (dadosRecebidos.nome !== undefined) camposParaAtualizar.nome = dadosRecebidos.nome;
    if (dadosRecebidos.email !== undefined) camposParaAtualizar.email = dadosRecebidos.email;
    if (dadosRecebidos.senha !== undefined) camposParaAtualizar.senha = dadosRecebidos.senha;

    const usuarioAtualizado = await atualizarDadosUsuario(id, camposParaAtualizar);

    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ 
      mensagem: 'Perfil atualizado com sucesso!', 
      usuario: {
        _id: usuarioAtualizado._id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        cargo: usuarioAtualizado.cargo,
        nivelAcesso: usuarioAtualizado.nivelAcesso
      }
    });
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao atualizar perfil', detalhes: erro.message });
  }
};

export const excluirUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const usuarioExcluido = await deletarUsuarioPorId(id);

    if (!usuarioExcluido) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Funcionário excluído com sucesso!' });
  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao excluir funcionário', detalhes: erro.message });
  }
};