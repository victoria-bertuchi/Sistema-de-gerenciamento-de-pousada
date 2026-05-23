import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';


export default function Funcionarios() {
  const router = useRouter();
  return(
    <View style={styles.container}>

      <View style={styles.headerGroup}>
      <TouchableOpacity 
        style={styles.buttonBack} 
        onPress={() => router.push('/telaInicial')}>
        <Ionicons name="return-up-back-outline" size={35} color="black" />
      </TouchableOpacity>

      <View style={styles.labelTitle}>
        <Text style={styles.title}>Funcionários</Text>
      </View>
    </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/telaCadastro')}>
          <Text style={styles.buttonText}>Cadastrar funcionário</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}