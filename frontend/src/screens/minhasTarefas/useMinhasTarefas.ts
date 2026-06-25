import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export interface QuartoTarefa {
  id: string;
  nome: string;
}

export function useMinhasTarefas() {
  const router = useRouter();

  const [cargo, setCargo] = useState('Limpeza');
  const [quartosDesignados, setQuartosDesignados] = useState<QuartoTarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do modal customizado
  const [modalVisivel, setModalVisivel] = useState(false);
  const [quartoParaFinalizar, setQuartoParaFinalizar] = useState<QuartoTarefa | null>(null);

  useEffect(() => {
    carregarTarefasDoBanco();
  }, []);

  const carregarTarefasDoBanco = async () => {
    try {
      setCarregando(true);
      
      const idSalvo = await AsyncStorage.getItem('@pousada:idUsuario');
      if (!idSalvo) {
        router.push('/');
        return;
      }

      const respostaUsuarios = await api.get('usuarios');
      const meuUsuario = respostaUsuarios.data.find((u: any) => u._id === idSalvo);

      if (meuUsuario) {
        setCargo(meuUsuario.cargo || 'Limpeza');
        
        const respostaQuartos = await api.get('quartos');
        const nomesTarefas: string[] = meuUsuario.quartos || [];
        
        const tarefasFormatadas = respostaQuartos.data
          .filter((q: any) => nomesTarefas.includes(q.nome))
          .map((q: any) => ({
            id: q._id,
            nome: q.nome
          }));

        setQuartosDesignados(tarefasFormatadas);
      }

    } catch (error) {
      console.error("Erro ao carregar tarefas do funcionário:", error);
    } finally {
      setCarregando(false);
    }
  };

  const abrirConfirmacaoLimpeza = (quarto: QuartoTarefa) => {
    setQuartoParaFinalizar(quarto);
    setModalVisivel(true);
  };

  const fecharModalConfirmacao = () => {
    setModalVisivel(false);
    setQuartoParaFinalizar(null);
  };

  const executarFinalizacaoDoQuarto = async () => {
    if (!quartoParaFinalizar) return;

    try {
      setModalVisivel(false);

      await api.put(`quartos/${quartoParaFinalizar.id}`, {
        status: 'disponivel',
        funcionario: '' 
      });

      setQuartosDesignados((prev) => prev.filter((q) => q.id !== quartoParaFinalizar.id));
      setQuartoParaFinalizar(null);

      await carregarTarefasDoBanco();
    } catch (error) {
      console.error("Erro ao finalizar higienização do quarto:", error);
    }
  };

  return {
    cargo,
    quartosDesignados,
    carregando,
    modalVisivel,
    setModalVisivel,
    quartoParaFinalizar,
    abrirConfirmacaoLimpeza,
    fecharModalConfirmacao,
    executarFinalizacaoDoQuarto,
  };
}