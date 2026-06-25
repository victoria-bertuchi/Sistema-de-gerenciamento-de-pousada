import { useState } from 'react';
import { useRouter } from 'expo-router';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [modal, setModal] = useState({
    visivel: false,
    titulo: '',
    mensagem: '',
    tipo: 'erro' as 'erro' | 'sucesso',
  });

  const exibirAlerta = (titulo: string, mensagem: string, tipo: 'erro' | 'sucesso' = 'erro') => {
    setModal({ visivel: true, titulo, mensagem, tipo });
  };

  const fecharModal = () => {
    setModal((anterior) => ({ ...anterior, visivel: false }));
  };

  const realizarLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      exibirAlerta('Campos Vazios', 'Por favor, insira o seu e-mail e sua senha.');
      return;
    }

    try {
      setCarregando(true);
      console.log("Tentando logar com:", email, senha);

      const resposta = await api.post('usuarios/login', { 
        email: email.trim().toLowerCase(), 
        senha: senha.trim() 
      });

      console.log("RESPOSTA COMPLETA DA API NO LOGIN:", JSON.stringify(resposta.data, null, 2));

      const dadosUsuario = resposta.data.usuario || resposta.data.user || resposta.data;

      if (dadosUsuario && dadosUsuario._id) {
        await AsyncStorage.setItem('@pousada:idUsuario', dadosUsuario._id);
        await AsyncStorage.setItem('@pousada:nomeUsuario', dadosUsuario.nome || '');
        
        console.log("Sessão gravada com sucesso para o ID:", dadosUsuario._id);
        
        router.push('/telaInicial');
      } else {
        exibirAlerta('Falha na Sessão', 'A API não retornou os dados do usuário conectado.');
      }

    } catch (error: any) {
      console.error("Erro completo capturado no Login:", error);
      
      const mensagemErro = error.response?.data?.erro || error.response?.data?.mensagem || 'E-mail ou senha incorretos.';
      exibirAlerta('Falha na Autenticação', mensagemErro, 'erro');
    } finally {
      setCarregando(false);
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    carregando,
    modal,
    fecharModal,
    realizarLogin,
  };
}