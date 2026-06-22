import Usuario from '../models/Usuario.js';

export const criarUsuario = async (dados: any) => {
  //verifica se o e-mail já existe no banco
  const usuarioExistente = await Usuario.findOne({ email: dados.email });
  if (usuarioExistente) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  //cria e salva o novo usuário
  const novoUsuario = new Usuario(dados);
  return await novoUsuario.save();
};