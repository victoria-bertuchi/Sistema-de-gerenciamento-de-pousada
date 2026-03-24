import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
            <Text style={styles.text}>Usuário</Text>
            <TextInput style={styles.input}/>
        </View>
      </View>

        <View style = {styles.inputGroup}>
            <Text style={styles.text}>Senha</Text>
            <TextInput style={styles.input}/>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/telaInicial')}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

    </View> 
    
  );
}