import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { styles } from './styles';
import RamoImage from '../../../assets/imagem ramo.png'; 

export default function TelaInicial() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.headerContainerMenu}>
        <View style={styles.textWrapperMenu}>
          <Text style={styles.titleTextMenu}>Bem vindo(a)</Text>
          <Text style={styles.subTitleTextMenu}>Ciclano de Souza!</Text>
        </View>
        <Image source={RamoImage} style={styles.ramoImageMenu} resizeMode="contain" />
      </View>

      <View style={styles.menuGrid}>
        
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity 
            style={styles.buttonMenu} 
            onPress={() => router.push('/telaCronograma')}>
            <FontAwesome5 name="calendar-alt" size={65} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.menuItemText}>Cronograma</Text>
        </View>

        <View style={styles.menuItemWrapper}>
          <TouchableOpacity 
            style={styles.buttonMenu} 
            onPress={() => router.push('/telaFuncionarios')}>
            <FontAwesome5 name="users" size={60} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.menuItemText}>Funcionários</Text>
        </View>

        <View style={styles.menuItemWrapperFull}>
          <View style={styles.menuItemWrapper}>
            <TouchableOpacity 
              style={[styles.buttonMenu, styles.buttonPerfil]} 
              onPress={() => router.push('telaPerfil')} >
              <MaterialIcons name="account-circle" size={70} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.menuItemText}>Perfil</Text>
          </View>
        </View>

      </View>

      <View style={styles.footerSairContainer}>
        <TouchableOpacity style={styles.buttonSair} onPress={() => router.push('/')}>
          <Text style={styles.buttonSairText}>
            <AntDesign name="close" size={18} color="#F3F1E4"/>Sair</Text>
        </TouchableOpacity>
      </View>

    </View> 
  );
}