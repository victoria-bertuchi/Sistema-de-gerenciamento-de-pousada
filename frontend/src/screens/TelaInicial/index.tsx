import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { styles } from './styles';
import RamoImage from '../../assets/imagem_ramo.png'; 
import { useTelaInicial } from './useTelaInicial';

export default function TelaInicial() {
  const router = useRouter();

  const {
    nomeExibicao,
    nivelAcesso,
    carregando,
    lidarComLogout,
  } = useTelaInicial();

  if (carregando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F1E4' }]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* SEÇÃO DE BOAS-VINDAS */}
      <View style={styles.headerContainerMenu}>
        <View style={styles.textWrapperMenu}>
          <Text style={styles.titleTextMenu}>Bem vindo(a)</Text>
          <Text style={styles.subTitleTextMenu}>{nomeExibicao}!</Text>
        </View>
        <Image source={RamoImage} style={styles.ramoImageMenu} resizeMode="contain" />
      </View>

      {/* GRID DE BOTÕES DO MENU */}
      <View style={styles.menuGrid}>
        
        {/* CARD 1: Cronograma */}
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity 
            style={styles.buttonMenu} 
            onPress={() => router.push('/telaCronograma')}
          >
            <FontAwesome5 name="calendar-alt" size={65} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.menuItemText}>Cronograma</Text>
        </View>

        {/* CARD 2: Condicional baseado no nível de acesso do usuário */}
        {nivelAcesso === 'admin' ? (
          <View style={styles.menuItemWrapper}>
            <TouchableOpacity 
              style={styles.buttonMenu} 
              onPress={() => router.push('/telaFuncionarios')}
            >
              <FontAwesome5 name="users" size={60} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.menuItemText}>Funcionários</Text>
          </View>
        ) : (
          <View style={styles.menuItemWrapper}>
            <TouchableOpacity 
              style={styles.buttonMenu} 
              onPress={() => router.push('/telaMinhasTarefas')}
            >
              <FontAwesome5 name="tasks" size={60} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.menuItemText}>Minhas tarefas</Text>
          </View>
        )}

        {/* CARD 3: Perfil */}
        <View style={styles.menuItemWrapperFull}>
          <View style={styles.menuItemWrapper}>
            <TouchableOpacity 
              style={[styles.buttonMenu, styles.buttonPerfil]} 
              onPress={() => router.push('telaPerfil')} 
            >
              <MaterialIcons name="account-circle" size={70} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.menuItemText}>Perfil</Text>
          </View>
        </View>

      </View>

      {/* BOTÃO LOGOUT NO FOOTER */}
      <View style={styles.footerSairContainer}>
        <TouchableOpacity style={styles.buttonSair} onPress={lidarComLogout}>
          <Text style={styles.buttonSairText}>
            <AntDesign name="close" size={18} color="#F3F1E4"/>Sair
          </Text>
        </TouchableOpacity>
      </View>

    </View> 
  );
}