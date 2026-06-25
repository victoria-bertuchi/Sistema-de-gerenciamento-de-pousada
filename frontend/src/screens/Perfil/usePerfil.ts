import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePerfil() {
  const router = useRouter();

  const [usuarioId, setUsuarioId] = useState<string | null>(null); 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('Funcionário');

  const [placeholderNome, setPlaceholderNome] = useState('Buscando nome no banco...');
  const [placeholderEmail, setPlaceholderEmail] = useState('Buscando e-mail no banco...');

  const [carregando, setCarregando] = useState(true);
  const [editavel, setEditavel] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  useEffect(() => {
    obterIdECarregarPerfil();
  }, []);

  const obterIdECarregarPerfil = async () => {
    try {
      setCarregando(true);
      const idSalvo = await AsyncStorage.getItem('@pousada:idUsuario');
      
      if (!idSalvo) {
        Alert.alert("Erro de Sessão", "Usuário não identificado. Voltando para o Login.");
        router.push('/');
        return;
      }

      setUsuarioId(idSalvo);

      const resposta = await api.get('usuarios');
      console.log("=== LISTA DE USUÁRIOS COMPLETA VINDA DO BANCO ===");
      console.log(resposta.data);

      const meuPerfil = resposta.data.find((u: any) => String(u._id) === String(idSalvo));

      if (meuPerfil) {
        console.log("🎯 USUÁRIO ENCONTRADO NO BANCO:", meuPerfil.nome);
        
        setPlaceholderNome(meuPerfil.nome);
        setPlaceholderEmail(meuPerfil.email);
        
        setNome('');
        setEmail('');
        setCargo(meuPerfil.cargo || meuPerfil.nivelAcesso || 'Funcionário');
      } else {
        console.log("❌ O ID salvo não foi encontrado na resposta da API.");
        setPlaceholderNome("Erro: Usuário não listado");
        setPlaceholderEmail("Erro: E-mail não listado");
      }
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
      setPlaceholderNome("Erro ao carregar");
      setPlaceholderEmail("Erro ao carregar");
    } finally {
      setCarregando(false);
    }
  };

  const toggleEdicao = (campo: 'nome' | 'email' | 'senha') => {
    setEditavel((prev) => {
      const novoEstado = !prev[campo];
      
      if (campo === 'nome') setNome(novoEstado ? placeholderNome : '');
      if (campo === 'email') setEmail(novoEstado ? placeholderEmail : '');
      
      return { ...prev, [campo]: novoEstado };
    });
  };

  const salvarAlteracoes = async () => {
    if (!usuarioId) return;

    const dadosParaAtualizar: any = {};

    if (editavel.nome && nome.trim()) dadosParaAtualizar.nome = nome.trim();
    if (editavel.email && email.trim()) dadosParaAtualizar.email = email.trim().toLowerCase();
    if (editavel.senha && senha.trim()) dadosParaAtualizar.senha = senha.trim();

    if (Object.keys(dadosParaAtualizar).length === 0) {
      setEditavel({ nome: false, email: false, senha: false });
      return;
    }

    try {
      setCarregando(true);
      const resposta = await api.put(`usuarios/perfil/${usuarioId}`, dadosParaAtualizar);

      if (resposta.status === 200) {      
        if (dadosParaAtualizar.nome) setPlaceholderNome(dadosParaAtualizar.nome);
        if (dadosParaAtualizar.email) setPlaceholderEmail(dadosParaAtualizar.email);
        
        setNome('');
        setEmail('');
        setSenha('');
        setEditavel({ nome: false, email: false, senha: false });
        Alert.alert("Sucesso", "Perfil updated com sucesso!");
      }
    } catch (error: any) {
      console.error("Erro ao salvar alterações do perfil:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      setCarregando(false);
    }
  };

  return {
    nome, setNome,
    email, setEmail,
    senha, setSenha,
    cargo,
    placeholderNome,
    placeholderEmail,
    carregando,
    editavel,
    toggleEdicao,
    salvarAlteracoes
  };
}