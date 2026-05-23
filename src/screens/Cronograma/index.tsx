import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';

export default function Cronograma() {
  const router = useRouter();
  return(
    <View>
        <Text>Tela Cronograma</Text>

    <TouchableOpacity onPress={() => router.push('/telaInicial')}>
        <Text style={styles.buttonVoltar}>Voltar</Text>
    </TouchableOpacity>
    </View>
  )
}