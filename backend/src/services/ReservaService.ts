import Reserva from '../models/Reserva.js';
import Quarto from '../models/Quarto.js';
import mongoose from 'mongoose';

export const processarNovaReserva = async (dados: any) => {
  // Validar se o quarto existe e pegar o preço dele
  const quarto = await Quarto.findById(dados.quarto_id);
  if (!quarto) {
    throw new Error('Quarto não encontrado para realizar a reserva.');
  }

    //realizar o cálculo dos dias de hospedagem
  const entrada = new Date(`${dados.data_entrada}T00:00:00.000Z`);
  const saida = new Date(`${dados.data_saida}T00:00:00.000Z`);
  const diferencaTempo = Math.abs(saida.getTime() - entrada.getTime());
  const dias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
  
  //calcular o valor total financeiro
  const valor_total = dias * quarto.preco;

  //montar a reserva com todos os dados
  const novaReserva = new Reserva({
    quarto: dados.quarto_id, 
    numero_hospedes: dados.numero_hospedes,
    data_entrada: entrada, 
    data_saida: saida,     
    valor_total
  });

  return await novaReserva.save();
};

export const buscarStatusDosQuartosPorData = async (dataSelecionada: string): Promise<any[]> => {
  
  const todasAsReservas = await Reserva.find();
  const todosOsQuartos = await Quarto.find();

  const dataAlvoComp = new Date(`${dataSelecionada}T00:00:00.000Z`);
  dataAlvoComp.setHours(0, 0, 0, 0);
  const tempoAlvo = dataAlvoComp.getTime();

  const cronograma: any[] = await Promise.all((todosOsQuartos as any[]).map(async (quarto: any) => {
    

    const reservaAtiva = (todasAsReservas as any[]).find((reserva: any) => {
      if (!reserva.quarto || reserva.quarto.toString() !== quarto._id.toString()) return false;

      const entrada = new Date(reserva.data_entrada);
      const saida = new Date(reserva.data_saida);
      
      entrada.setHours(0, 0, 0, 0);
      saida.setHours(0, 0, 0, 0);

      const tempoEntrada = entrada.getTime();
      const tempoCheckout = saida.getTime();
      const tempoDiaSeguinteLimpeza = tempoCheckout + (24 * 60 * 60 * 1000);

      return tempoAlvo >= tempoEntrada && tempoAlvo <= tempoDiaSeguinteLimpeza;
    });

    let statusFinal = quarto.status || 'Disponivel';
    let funcionarioFinal = quarto.funcionario || '';
    let reservaId = null;
    let dataCheckIn = '';
    let dataCheckOut = '';

    const statusBancoNormalizado = String(quarto.status || '').toLowerCase().trim();

    if (reservaAtiva) {
      reservaId = reservaAtiva._id;
      dataCheckIn = reservaAtiva.data_entrada;
      dataCheckOut = reservaAtiva.data_saida;

      const entradaCheck = new Date(reservaAtiva.data_entrada);
      const saidaCheck = new Date(reservaAtiva.data_saida);
      
      entradaCheck.setHours(0, 0, 0, 0);
      saidaCheck.setHours(0, 0, 0, 0);

      const tempoEntrada = entradaCheck.getTime();
      const tempoCheckout = saidaCheck.getTime();
      const tempoDiaSeguinteLimpeza = tempoCheckout + (24 * 60 * 60 * 1000);

      if (tempoAlvo === tempoDiaSeguinteLimpeza) {
        if (statusBancoNormalizado === 'ocupado') {
          await Quarto.findByIdAndUpdate(quarto._id, { status: 'aguardando_limpeza' });
          statusFinal = 'Limpeza';
        } else {
        
          statusFinal = (statusBancoNormalizado.includes('limp') || statusBancoNormalizado.includes('aguardando')) 
            ? 'Limpeza' 
            : 'Disponível';
        }
        funcionarioFinal = quarto.funcionario || ''; 
      } 

      else if (tempoAlvo >= tempoEntrada && tempoAlvo <= tempoCheckout) {
        statusFinal = 'Ocupado';
        funcionarioFinal = '';
      }
    } else {

      if (statusBancoNormalizado.includes('limp') || statusBancoNormalizado.includes('aguardando')) {
        statusFinal = 'Limpeza';
        funcionarioFinal = quarto.funcionario || '';
      } else {
        statusFinal = 'Disponível';
      }
    }

    return {
      id: quarto._id, 
      quartoId: quarto._id,
      numero: quarto.numero,
      preco: quarto.preco,
      nomeQuarto: quarto.nome, 
      status: statusFinal, 
      funcionario: funcionarioFinal,
      reservaId: reservaId,
      dataCheckIn: dataCheckIn,
      dataCheckOut: dataCheckOut
    };
  }));
  
  return cronograma;

};

export const atualizarReservaExistente = async (id: string, dados: any) => {
  const quarto = await Quarto.findById(dados.quarto_id);
  if (!quarto) {
    throw new Error('Quarto não encontrado para atualizar a reserva.');
  }

  const entrada = new Date(`${dados.data_entrada}T00:00:00.000Z`);
  const saida = new Date(`${dados.data_saida}T00:00:00.000Z`);
  
  const diferencaTempo = Math.abs(saida.getTime() - entrada.getTime());
  const dias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
  const valor_total = dias * quarto.preco;

  const reservaAtualizada = await Reserva.findByIdAndUpdate(
    id,
    {
      quarto: dados.quarto_id,
      numero_hospedes: dados.numero_hospedes,
      data_entrada: entrada,
      data_saida: saida,
      valor_total
    },
    { new: true } 
  );

  return reservaAtualizada;
};

  