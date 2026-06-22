import Reserva from '../models/Reserva.js';
import Quarto from '../models/Quarto.js';

export const processarNovaReserva = async (dados: any) => {
  //validar se o quarto existe e pegar o preço dele
  const quarto = await Quarto.findById(dados.quarto_id);
  if (!quarto) {
    throw new Error('Quarto não encontrado para realizar a reserva.');
  }

  //realizar o cálculo dos dias de hospedagem
  const entrada = new Date(dados.data_entrada);
  const saida = new Date(dados.data_saida);
  const diferencaTempo = Math.abs(saida.getTime() - entrada.getTime());
  const dias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
  
  //calcular o valor total financeiro
  const valor_total = dias * quarto.preco;

  //montar a reserva com todos os dados
  const novaReserva = new Reserva({
    quarto: dados.quarto_id,
    numero_hospedes: dados.numero_hospedes,
    data_entrada: dados.data_entrada,
    data_saida: dados.data_saida,
    valor_total
  });

  return await novaReserva.save();
};