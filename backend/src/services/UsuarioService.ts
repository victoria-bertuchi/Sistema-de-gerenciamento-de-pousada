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

export const buscarTodosUsuarios = async () => {
  return await Usuario.find().sort({ nome: 1 });
};

export const buscarUsuarioPorEmail = async (email: string) => {
  return await Usuario.findOne({ email: email.toLowerCase().trim() });
};

export const atualizarDadosUsuario = async (id: string, novosDados: any) => {
  // Atualiza os dados e retorna o documento novo atualizado
  return await Usuario.findByIdAndUpdate(id, novosDados, { new: true });
};

export const deletarUsuarioPorId = async (id: string) => {
  return await Usuario.findByIdAndDelete(id);
};