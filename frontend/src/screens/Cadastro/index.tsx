import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useCadastro } from './useCadastro'; // Importando a lógica

export default function Cadastro() {
  const router = useRouter();
  
  const [secureSenha, setSecureSenha] = useState(true);
  const [secureConfirma, setSecureConfirma] = useState(true);

  const { 
    form, 
    carregando, 
    modal, 
    atualizarCampo, 
    salvarFuncionarioNoBanco, 
    fecharModal 
  } = useCadastro();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.push('/telaFuncionarios')}>
          <Ionicons name="return-up-back-outline" size={35} color="black" />
        </TouchableOpacity>
        
        <View style={styles.labelTitle}>
          <Text style={styles.title}>Cadastrar Funcionário</Text>
        </View>
      </View>

      <View style={styles.form}>
        {/* INPUT NOME */}
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Nome do Funcionário</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#A0A0A0"
              value={form.nome} 
              onChangeText={(valor) => atualizarCampo('nome', valor)} 
              editable={!carregando}
            />
          </View>
        </View>

        {/* INPUT CARGO */}
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Cargo do Funcionário</Text>
            <TextInput
              style={styles.input}
              placeholder="Cargo"
              placeholderTextColor="#A0A0A0"
              value={form.cargo} 
              onChangeText={(valor) => atualizarCampo('cargo', valor)} 
              editable={!carregando}
            />
          </View>
        </View>

        {/* INPUT EMAIL */}
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Email do Funcionário</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email} 
              onChangeText={(valor) => atualizarCampo('email', valor)} 
              editable={!carregando}
            />
          </View>
        </View>

        {/* INPUT SENHA */}
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Senha do Funcionário</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Senha"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureSenha}
                autoCapitalize="none"
                value={form.senha} 
                onChangeText={(valor) => atualizarCampo('senha', valor)} 
                editable={!carregando}
              />
              <TouchableOpacity onPress={() => setSecureSenha(!secureSenha)} style={styles.eyeIcon}>
                <Ionicons
                  name={secureSenha ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* INPUT CONFIRMA SENHA */}
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Digite a senha novamente</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Repita a senha"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureConfirma}
                autoCapitalize="none"
                value={form.confirmaSenha} 
                onChangeText={(valor) => atualizarCampo('confirmaSenha', valor)}
                editable={!carregando}
              />
              <TouchableOpacity onPress={() => setSecureConfirma(!secureConfirma)} style={styles.eyeIcon}>
                <Ionicons
                  name={secureConfirma ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, carregando && { opacity: 0.6 }]} 
          onPress={salvarFuncionarioNoBanco}
          disabled={carregando}>
          <Text style={styles.buttonText}>
            {carregando ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        visible={modal.visivel}
        transparent={true}
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            <View style={[
              styles.modalIconCircle, 
              modal.tipo === 'sucesso' ? styles.modalIconSucesso : styles.modalIconErro
            ]}>
              <Ionicons 
                name={modal.tipo === 'sucesso' ? "checkmark-circle-outline" : "alert-circle-outline"} 
                size={40} 
                color="#FFFFFF" 
              />
            </View>

            <Text style={styles.modalTitle}>{modal.titulo}</Text>
            <Text style={styles.modalMessage}>{modal.mensagem}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={fecharModal}>
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}