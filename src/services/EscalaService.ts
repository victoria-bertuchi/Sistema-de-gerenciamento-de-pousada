import Escala from '../models/Escala.js';

export const criarNovaEscala = async (dados: any) => {
  const novaEscala = new Escala(dados);
  return await novaEscala.save();
};