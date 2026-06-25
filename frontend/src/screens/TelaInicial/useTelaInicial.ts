import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export function useTelaInicial() {
  const router = useRouter();

  const [nomeExibicao, setNomeExibicao] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState<'admin' | 'funcionario'>('funcionario'); 
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarSessaoEUsuario();
  }, []);

  const carregarSessaoEUsuario = async () => {
    try {
      setCarregando(true);
      
      // 1. Recupera os dados rápidos salvos no cache local
      const idSalvo = await AsyncStorage.getItem('@pousada:idUsuario');
      const nomeSalvo = await AsyncStorage.getItem('@pousada:nomeUsuario');
      
      if (nomeSalvo) {
        setNomeExibicao(nomeSalvo);
      }

      if (!idSalvo) {
        router.push('/');
        return;
      }

      const resposta = await api.get('usuarios');
      const usuarioBanco = resposta.data.find((u: any) => u._id === idSalvo);

      if (usuarioBanco) {
        setNomeExibicao(usuarioBanco.nome);
        
        if (usuarioBanco.nivelAcesso === 'admin' || usuarioBanco.nivelAcesso === 'funcionario') {
          setNivelAcesso(usuarioBanco.usuarioBanco === 'admin' ? 'admin' : usuarioBanco.nivelAcesso);
        }
        
        await AsyncStorage.setItem('@pousada:nomeUsuario', usuarioBanco.nome);
      }

    } catch (error) {
      console.error("Erro ao sincronizar nível de acesso com o banco:", error);
    } finally {
      setCarregando(false);
    }
  };

  const lidarComLogout = async () => {
    try {
      await AsyncStorage.removeItem('@pousada:idUsuario');
      await AsyncStorage.removeItem('@pousada:nomeUsuario');
      router.push('/');
    } catch (error) {
      console.error("Erro ao efetuar logout:", error);
    }
  };

  return {
    nomeExibicao,
    nivelAcesso,
    carregando,
    lidarComLogout,
  };
}