import Quarto from '../models/Quarto.js';

export const criarQuarto = async (dados: any) => {
  const novoQuarto = new Quarto(dados);
  return await novoQuarto.save();
};

export const atualizarStatusQuarto = async (id: string, status: string) => {
  //atualiza o quarto e já retorna o documento novo atualizado
  const quarto = await Quarto.findByIdAndUpdate(id, { status }, { new: true });
  
  if (!quarto) {
    throw new Error('Quarto não encontrado no sistema.');
  }
  return quarto;
};