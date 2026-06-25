import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StatusQuarto = 'Disponível' | 'Limpeza' | 'Ocupado' | 'Reservar';

export const formatarDataTopo = (dataString: string) => {
  if (!dataString) return '';
  const partes = dataString.split('-');
  const mes = partes[1] || '';
  const dia = partes[2] || '';
  if (!mes || !dia) return ''; 

  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return `${dia} ${meses[parseInt(mes, 10) - 1]}`; 
};

export const aplicarMascaraData = (texto: string) => {
  const apenasNumeros = texto.replace(/\D/g, '');
  if (apenasNumeros.length <= 2) return apenasNumeros;
  if (apenasNumeros.length <= 4) return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
  return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4, 8)}`;
};

export const formatarParaExibicao = (dataString: string | undefined): string => {
  if (!dataString || typeof dataString !== 'string') return '';
  
  const textoPuro = dataString as string;
  const dataLimpa = (textoPuro.includes('T') ? textoPuro.split('T')[0] : textoPuro) as string;
  
  if (dataLimpa.includes('/')) return dataLimpa;
  
  const partes = dataLimpa.split('-');
  if (partes.length !== 3) return dataLimpa;
  
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

export const formatarParaBanco = (dataString: string | undefined): string => {
  if (!dataString || typeof dataString !== 'string') return '';
  
  const textoPuro = dataString as string;
  const dataLimpa = (textoPuro.includes('T') ? textoPuro.split('T')[0] : textoPuro) as string;
  
  if (dataLimpa.includes('-')) return dataLimpa;
  
  const partes = dataLimpa.split('/');
  if (partes.length !== 3) return dataLimpa;
  
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
};

export function useCronograma() {
  const router = useRouter();
  const hoje = new Date().toISOString().split('T')[0];
  
  // Estados de Controle de Dados
  const [diaSelecionado, setDiaSelecionado] = useState(hoje);
  const [listaDeQuartos, setListaDeQuartos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [salvandoDados, setSalvandoDados] = useState(false);
  const [nivelAcesso, setNivelAcesso] = useState<'admin' | 'funcionario'>('funcionario');
  const [listaFuncionarios, setListaFuncionarios] = useState<{ _id: string; nome: string }[]>([]);

  // Estados Visuais (Modais e Dropdowns)
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [funcionarioDropdownAberto, setFuncionarioDropdownAberto] = useState(false);
  const [modalCancelamentoVisivel, setModalCancelamentoVisivel] = useState(false);
  
  // Estados do Formulário do Modal
  const [quartoSelecionado, setQuartoSelecionado] = useState<{ id: string; nome: string; status?: string; reservaId?: string | null } | null>(null);
  const [statusModal, setStatusModal] = useState<StatusQuarto>('Disponível');
  const [funcionarioModal, setFuncionarioModal] = useState('');
  const [numeroHospedes, setNumeroHospedes] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');

  useEffect(() => {
    validarPermissoesESessao();
    carregarFuncionariosDoBanco();
  }, []);

  useEffect(() => {
    carregarCronogramaDoBanco();
  }, [diaSelecionado]);

  const validarPermissoesESessao = async () => {
    try {
      const idSalvo = await AsyncStorage.getItem('@pousada:idUsuario');
      if (!idSalvo) {
        router.push('/');
        return;
      }
      const resposta = await api.get('usuarios');
      const usuarioEncontrado = resposta.data.find((u: any) => u._id === idSalvo);
      if (usuarioEncontrado) {
        setNivelAcesso(usuarioEncontrado.nivelAcesso === 'admin' ? 'admin' : 'funcionario');
      }
    } catch (error) {
      console.error("Erro ao validar permissões no cronograma:", error);
    }
  };

  const carregarCronogramaDoBanco = async () => {
    try {
      setCarregando(true);
      setListaDeQuartos([]); 

      const resposta = await api.get(`cronograma?data=${diaSelecionado}`);
      
      const quartosFormatados = resposta.data.map((item: any) => {
        const checkInBruto = item.dataCheckIn || item.data_check_in || item.data_entrada || '';
        const checkOutBruto = item.dataCheckOut || item.data_check_out || item.data_saida || '';
        const statusBanco = String(item.status || '').toLowerCase().trim();
        
        let statusTratado: StatusQuarto = 'Disponível';
        if (statusBanco.includes('ocupado')) {
          statusTratado = 'Ocupado';
        } else if (statusBanco.includes('reserva')) {
          statusTratado = 'Reservar';
        } else if (statusBanco.includes('limp') || statusBanco.includes('aguardando')) { 
          statusTratado = 'Limpeza'; 
        } else {
          statusTratado = 'Disponível';
        }

        return {
          _id: item.quartoId || item._id,
          nome: item.nomeQuarto || `Quarto ${item.numero}`, 
          status: statusTratado,
          funcionario: item.funcionario || '',
          dataCheckIn: checkInBruto !== item.quartoId ? checkInBruto : '',
          dataCheckOut: checkOutBruto !== item.quartoId ? checkOutBruto : '',
          reservaId: item.reservaId || null
        };
      });

      setListaDeQuartos(quartosFormatados);
    } catch (error) {
      console.error("Erro ao carregar o cronograma por data:", error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarFuncionariosDoBanco = async () => {
    try {
      const resposta = await api.get('usuarios'); 
      const apenasFuncionarios = resposta.data.filter((u: any) => u.nivelAcesso === 'funcionario');
      setListaFuncionarios(apenasFuncionarios);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const alterarStatusDoQuarto = (novoStatus: StatusQuarto) => {
    if (!quartoSelecionado) return;
    setStatusModal(novoStatus);
    setDropdownAberto(false);
    
    if (novoStatus !== 'Limpeza') setFuncionarioModal('');
    
    if (novoStatus === 'Reservar' || novoStatus === 'Ocupado') {
      setDataEntrada(formatarParaExibicao(diaSelecionado));
      setDataSaida('');
      setNumeroHospedes('');
    }
  };

  const resetModals = () => {
    setModalVisivel(false);
    setDropdownAberto(false);
    setFuncionarioDropdownAberto(false);
    setQuartoSelecionado(null);
  };

  const verificarAntesDeSalvar = () => {
    const statusNormalizado = statusModal.toLowerCase().trim();
    if (statusNormalizado === 'disponível' || statusNormalizado === 'disponivel') {
      setModalCancelamentoVisivel(true);
    } else {
      executarSalvarAlteracoesUnificadas();
    }
  };

  const executarSalvarAlteracoesUnificadas = async () => {
    if (!quartoSelecionado) return;

    try {
      setSalvandoDados(true);
      const statusNormalizado = statusModal.toLowerCase().trim();

      if (statusNormalizado === 'reservado' || statusNormalizado === 'ocupado' || statusNormalizado === 'reservar') {
        if (!dataEntrada || !dataSaida) {
          alert("Por favor, preencha as datas de entrada e saída.");
          setSalvandoDados(false);
          return;
        }

        const dataEntradaFormatada = formatarParaBanco(dataEntrada);
        const dataSaidaFormatada = formatarParaBanco(dataSaida);
        const qtdHospedes = numeroHospedes.trim() ? Number(numeroHospedes) : 1;
        const temReservaId = quartoSelecionado.reservaId && String(quartoSelecionado.reservaId).trim() !== '' && quartoSelecionado.reservaId !== 'null';

        if (temReservaId) {
          await api.put(`/reservas/${quartoSelecionado.reservaId}`, {
            quarto_id: quartoSelecionado.id,
            numero_hospedes: qtdHospedes,
            data_entrada: dataEntradaFormatada,
            data_saida: dataSaidaFormatada
          });
        } else {
          await api.post('/reservas', {
            quarto_id: quartoSelecionado.id,
            numero_hospedes: qtdHospedes,
            data_entrada: dataEntradaFormatada, 
            data_saida: dataSaidaFormatada    
          });
        }

        await api.put(`/quartos/${quartoSelecionado.id}`, { status: 'ocupado', funcionario: '' });
        if (dataEntradaFormatada !== diaSelecionado) setDiaSelecionado(dataEntradaFormatada);
      } 
      else if (statusNormalizado === 'disponível' || statusNormalizado === 'disponivel') {
        if (quartoSelecionado.reservaId) {
          try {
            await api.delete(`/reservas/${quartoSelecionado.reservaId}`);
          } catch (errDelete) {
            console.error("Erro ao deletar reserva:", errDelete);
          }
        }
        await api.put(`/quartos/${quartoSelecionado.id}`, { status: 'disponivel', funcionario: '' });
      } 
      else if (statusNormalizado === 'limpeza') {
        await api.put(`/quartos/${quartoSelecionado.id}`, { status: 'limpeza', funcionario: funcionarioModal });
      }

      await carregarCronogramaDoBanco();
      setModalCancelamentoVisivel(false);
      resetModals();

    } catch (error: any) {
      console.error("❌ ERRO AO SALVAR ALTERAÇÕES:", error);
      const mensagemServidor = error.response?.data?.erro || error.response?.data?.detalhes || error.message;
      alert(`Não foi possível salvar as alterações: ${mensagemServidor}`);
    } finally {
      setSalvandoDados(false);
    }
  };

  const abrirModalEdicao = (quarto: any) => {
    setQuartoSelecionado({ 
      id: quarto._id, 
      nome: quarto.nome, 
      status: quarto.status, 
      reservaId: quarto.reservaId ? quarto.reservaId : null 
    });
    setStatusModal(quarto.status); 
    setFuncionarioModal(quarto.funcionario || '');             
    setDataEntrada(quarto.dataCheckIn ? formatarParaExibicao(quarto.dataCheckIn) : '');
    setDataSaida(quarto.dataCheckOut ? formatarParaExibicao(quarto.dataCheckOut) : '');
    setNumeroHospedes(''); 
    setModalVisivel(true);
  };

  return {
    diaSelecionado, setDiaSelecionado,
    listaDeQuartos, carregando, salvandoDados, nivelAcesso, listaFuncionarios,
    modalVisivel, dropdownAberto, setDropdownAberto,
    funcionarioDropdownAberto, setFuncionarioDropdownAberto,
    modalCancelamentoVisivel, setModalCancelamentoVisivel,
    quartoSelecionado, statusModal, funcionarioModal, setFuncionarioModal,
    dataEntrada, setDataEntrada, dataSaida, setDataSaida,
    alterarStatusDoQuarto, resetModals, verificarAntesDeSalvar,
    executarSalvarAlteracoesUnificadas, abrirModalEdicao
  };
}