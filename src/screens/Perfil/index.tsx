import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';

export default function Perfil() {
  const router = useRouter();

  const [nome, setNome] = useState('Ciclano de Souza');
  const [email, setEmail] = useState('ciclanosouza@gmail.com');
  const [senha, setSenha] = useState('pousada123');

  const [editavel, setEditavel] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  const toggleEdicao = (campo: 'nome' | 'email' | 'senha') => {
    setEditavel((prev) => ({ ...prev, [campo]: !prev[campo] }));
  };

  const salvarAlteracoes = () => {
    setEditavel({ nome: false, email: false, senha: false });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoHeader} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoHeader} onPress={salvarAlteracoes}>
          <Ionicons name="checkmark" size={32} color="#90EE90" />
        </TouchableOpacity>
      </View>

      <View style={styles.tituloContainer}>
        <Text style={styles.textoSeuPerfil}>Seu perfil</Text>
        <Text style={styles.textoCargo}>Administrador</Text>
      </View>

      <View style={styles.formContainer}>
        
        <View style={styles.campoContainer}>
          <Text style={styles.labelCampo}>Nome</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.caixaInputReal, !editavel.nome && styles.inputBloqueado]}
              value={nome}
              onChangeText={setNome}
              editable={editavel.nome}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.botaoEditarFixado} onPress={() => toggleEdicao('nome')}>
              <Ionicons 
                name="create-outline" 
                size={22} 
                style={editavel.nome ? styles.iconeLapisAtivo : styles.iconeLapisPadrao} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.labelCampo}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.caixaInputReal, !editavel.email && styles.inputBloqueado]}
              value={email}
              onChangeText={setEmail}
              editable={editavel.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.botaoEditarFixado} onPress={() => toggleEdicao('email')}>
              <Ionicons 
                name="create-outline" 
                size={22} 
                style={editavel.email ? styles.iconeLapisAtivo : styles.iconeLapisPadrao} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.labelCampo}>Senha</Text>
          <View style={styles.inputRow}>
            <TextInput 
              key={editavel.senha ? 'senha-liberada' : 'senha-travada'}
              style={[styles.caixaInputReal, !editavel.senha && styles.inputBloqueado]}
              value={senha}
              onChangeText={setSenha}
              editable={editavel.senha}
              secureTextEntry={true}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.botaoEditarFixado} onPress={() => toggleEdicao('senha')}>
              <Ionicons 
                name="create-outline" 
                size={22} 
                style={editavel.senha ? styles.iconeLapisAtivo : styles.iconeLapisPadrao} 
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      </View>
  );
}