import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import RamoImage from '../../../assets/imagem ramo.png';

export default function Login() {
  const router = useRouter();
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>

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

      <View style={styles.form}>
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
                autoCapitalize="none"/>
            </View>
          </View>
        </View>

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
                autoCapitalize="none"/>
              <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
                <Ionicons
                  name={secureText ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonEsqueciMinhaSenha}>
              <Text style={styles.buttonEsqueciMinhaSenhaText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/telaInicial')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
