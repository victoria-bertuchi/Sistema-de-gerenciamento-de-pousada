import { useState } from 'react';
import { useRouter } from 'expo-router';
import api from '../../services/api';

export function useCadastro() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    email: '',
    senha: '',
    confirmaSenha: '',
  });

  const [carregando, setCarregando] = useState(false);

  const [modal, setModal] = useState({
    visivel: false,
    titulo: '',
    mensagem: '',
    tipo: 'erro' as 'erro' | 'sucesso',
  });

  const atualizarCampo = (campo: keyof typeof form, valor: string) => {
    setForm((dadosAnteriores) => ({ ...dadosAnteriores, [campo]: valor }));
  };

  const exibirAlerta = (titulo: string, mensagem: string, tipo: 'erro' | 'sucesso' = 'erro') => {
    setModal({ visivel: true, titulo, mensagem, tipo });
  };

  const fecharModal = () => {
    setModal((anterior) => ({ ...anterior, visivel: false }));
    if (modal.tipo === 'sucesso') {
      router.push('/telaFuncionarios');
    }
  };

  const salvarFuncionarioNoBanco = async () => {
    if (!form.nome.trim() || !form.cargo.trim() || !form.email.trim() || !form.senha.trim()) {
      exibirAlerta('Campos Incompletos', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (form.senha !== form.confirmaSenha) {
      exibirAlerta('Senha Incorreta', 'As senhas digitadas não são iguais!');
      return;
    }

    setCarregando(true);

    try {
      const resposta = await api.post('usuarios', {
        nome: form.nome.trim(),
        cargo: form.cargo.trim(),
        email: form.email.trim().toLowerCase(),
        senha: form.senha
      });

      if (resposta.status === 201) {
        exibirAlerta('', 'Funcionário cadastrado!', 'sucesso');
      }
    } catch (error: any) {
      console.error(error);
      const mensagemErro = error.response?.data?.detalhes || 'Erro de comunicação com o servidor.';
      exibirAlerta('Falha no Cadastro', mensagemErro, 'erro');
    } finally {
      setCarregando(false);
    }
  };

  return {
    form,
    carregando,
    modal,
    atualizarCampo,
    salvarFuncionarioNoBanco,
    fecharModal,
  };
}