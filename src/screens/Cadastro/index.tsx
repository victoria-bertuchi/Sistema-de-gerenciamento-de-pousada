import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export default function Cadastro() {
  const router = useRouter();
  const [secureSenha, setSecureSenha] = useState(true);
  const [secureConfirma, setSecureConfirma] = useState(true);

  return (
    <View style={styles.container}>

      <View style={styles.labelTitle}>
        <Text style={styles.title}>Cadastrar Funcionário</Text>
      </View>

      <View style={styles.form}>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Nome do Funcionário</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#A0A0A0"/>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Cargo do Funcionário</Text>
            <TextInput
              style={styles.input}
              placeholder="Cargo"
              placeholderTextColor="#A0A0A0"/>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Email do Funcionário</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"/>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Senha do Funcionário</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Senha"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureSenha}
                autoCapitalize="none"/>
              <TouchableOpacity onPress={() => setSecureSenha(!secureSenha)} style={styles.eyeIcon}>
                <Ionicons
                  name={secureSenha ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.textForm}>Digite a senha novamente</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Repita a senha"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureConfirma}
                autoCapitalize="none"/>
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
        <TouchableOpacity style={styles.button} onPress={() => router.push('/telaInicial')}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
