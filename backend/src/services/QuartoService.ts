import Quarto from '../models/Quarto.js';

export const criarQuarto = async (dados: any) => {
  const novoQuarto = new Quarto(dados);
  return await novoQuarto.save();
};

export const atualizarStatusQuarto = async (id: string, status: string, funcionario?: string) => {
  let statusTratado = status.toLowerCase().trim();
  if (statusTratado.includes('dispon')) statusTratado = 'disponivel';
  if (statusTratado.includes('limpeza') || statusTratado.includes('aguardando')) statusTratado = 'aguardando_limpeza';

  //atualiza o quarto e já retorna o documento novo atualizado
  const quarto = await Quarto.findByIdAndUpdate(id, { status: statusTratado,funcionario: funcionario || ''}, { new: true });
  
  if (!quarto) {
    throw new Error('Quarto não encontrado no sistema.');
  }
  return quarto;
};

export const buscarTodosQuartos = async () => {
  return await Quarto.find().sort({ nome: 1 });
};
