import { useState, useEffect } from 'react';
import api from '../../services/api';

export interface Funcionario {
  _id: string;
  nome: string;
  cargo: string;
  quartos?: string[];
}

export function useFuncionarios() {
  const [listaFuncionarios, setListaFuncionarios] = useState<Funcionario[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [confirmarVisivel, setConfirmarVisivel] = useState(false);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const resposta = await api.get('usuarios');
      
      const apenasFuncionariosOperacionais = resposta.data.filter(
        (usuario: any) => usuario.nivelAcesso === 'funcionario'
      );

      setListaFuncionarios(apenasFuncionariosOperacionais);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const removerFuncionario = async () => {
    if (!funcionarioSelecionado) return;

    try {
      setCarregando(true);
      
      const resposta = await api.delete(`usuarios/${funcionarioSelecionado._id}`);
      
      if (resposta.status === 200) {
        setConfirmarVisivel(false);
        setModalVisivel(false);
        
        setListaFuncionarios((listaAnterior) => 
          listaAnterior.filter(f => f._id !== funcionarioSelecionado._id)
        );
      }
    } catch (error: any) {
      console.error('Erro ao deletar funcionário:', error);
    } finally {
      setCarregando(false);
    }
  };

  const abrirModalVisualizar = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalVisivel(true);
  };

  return {
    listaFuncionarios,
    modalVisivel,
    setModalVisivel,
    funcionarioSelecionado,
    carregando,
    confirmarVisivel,
    setConfirmarVisivel,
    removerFuncionario,
    abrirModalVisualizar,
  };
}