import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import RamoImage from '../../assets/imagem_ramo.png';
import { useLogin } from './useLogin';

export default function Login() {
  const [secureText, setSecureText] = useState(true);

  // Consumindo a lógica isolada do nosso hook
  const {
    email,
    setEmail,
    senha,
    setSenha,
    carregando,
    modal,
    fecharModal,
    realizarLogin,
  } = useLogin();

  return (
    <View style={styles.container}>

      {/* HEADER VISUAL */}
      <View style={styles.headerContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>Espaço Natureza Arco-Íris</Text>
          <Text style={styles.subTitleText}>Gerenciamento</Text>
        </View>

        <Image
          source={RamoImage}
          style={styles.ramoImage}
          resizeMode="contain"
        />
      </View>

      {/* FORMULÁRIO */}
      <View style={styles.form}>
        
        {/* CAMPO EMAIL */}
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email} 
                onChangeText={setEmail} 
                editable={!carregando}
              />
            </View>
          </View>
        </View>

        {/* CAMPO SENHA */}
        <View style={[styles.inputGroup, { marginBottom: 50 }]}>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Senha</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureText}
                autoCapitalize="none"
                value={senha} 
                onChangeText={setSenha} 
                editable={!carregando}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
                <Ionicons
                  name={secureText ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonEsqueciMinhaSenha}>
              <Text style={styles.buttonEsqueciMinhaSenhaText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      {/* BOTÃO SUBMIT */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, carregando && { opacity: 0.6 }]} 
          onPress={realizarLogin}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL CUSTOMIZADO DE ALERTAS */}
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