import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';
import { usePerfil } from './usePerfil';

export default function Perfil() {
  const router = useRouter();

  const {
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
  } = usePerfil();

  if (carregando && placeholderNome.includes('Buscando')) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4C4799" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* BOTÕES DO HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoHeader} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoHeader} onPress={salvarAlteracoes}>
          <Ionicons name="checkmark" size={32} color="#90EE90" />
        </TouchableOpacity>
      </View>

      {/* TÍTULO E SUBTÍTULO */}
      <View style={styles.tituloContainer}>
        <Text style={styles.textoSeuPerfil}>Seu perfil</Text>
        <Text style={styles.textoCargo}>{cargo}</Text>
      </View>

      {/* FORMULÁRIO DE DADOS */}
      <View style={styles.formContainer}>
        
        {/* INPUT DE NOME */}
        <View style={styles.campoContainer}>
          <Text style={styles.labelCampo}>Nome</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.caixaInputReal, !editavel.nome && styles.inputBloqueado]}
              value={nome}
              onChangeText={setNome}
              editable={editavel.nome && !carregando}
              placeholder={placeholderNome}
              placeholderTextColor="#353535"
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

        {/* INPUT DE EMAIL */}
        <View style={styles.campoContainer}>
          <Text style={styles.labelCampo}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.caixaInputReal, !editavel.email && styles.inputBloqueado]}
              value={email}
              onChangeText={setEmail}
              editable={editavel.email && !carregando}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={placeholderEmail}
              placeholderTextColor="#353535"
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

        {/* INPUT DE SENHA */}
        <View style={styles.campoContainer}>
          <Text style={styles.labelCampo}>Senha</Text>
          <View style={styles.inputRow}>
            <TextInput 
              key={carregando ? 'carregando-senha' : 'senha-carregada'}
              style={[styles.caixaInputReal, !editavel.senha && styles.inputBloqueado]}
              value={senha}
              onChangeText={setSenha}
              editable={editavel.senha && !carregando}
              secureTextEntry={true} 
              placeholder="Digite uma nova senha"
              placeholderTextColor="#353535"
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