import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';

interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  quartos: string[];
}

export default function Funcionarios() {
  const router = useRouter();

  const [listaFuncionarios] = useState<Funcionario[]>([
    { id: '1', nome: 'Fulano da Silva', cargo: 'Limpeza', quartos: ['Quarto 4', 'Quarto 2'] },
    { id: '2', nome: 'Ciclano Souza', cargo: 'Limpeza', quartos: ['Quarto 8'] },
    { id: '3', nome: 'Beltrano Oliveira', cargo: 'Naoseioque', quartos: ['Quarto 1', 'Quarto 5', 'Quarto 8'] },
  ]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);

  return (
    <View style={styles.container}>

      <View style={styles.headerGroup}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={35} color="black" />
        </TouchableOpacity>

        <View style={styles.labelTitle}>
          <Text style={styles.title}>Funcionários</Text>
        </View>
      </View>

      <View style={styles.tabelaContainer}>
        <View style={styles.linhaCabecalho}>
          <View style={styles.tituloColuna}>
            <Text style={styles.textoTituloColuna}>Nome</Text>
          </View>
          <View style={styles.tituloColuna}>
            <Text style={styles.textoTituloColuna}>Cargo</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollFuncionarios} showsVerticalScrollIndicator={false}>
          {listaFuncionarios.map((item) => (
            <View key={item.id} style={styles.linhaFuncionario}>
              <View style={styles.blocoDado}>
                <Text style={styles.textoDado}>{item.nome.split(' ')[0]}</Text> 
              </View>

              <View style={styles.blocoDado}>
                <Text style={styles.textoDado}>{item.cargo}</Text>
              </View>

              <TouchableOpacity 
                  style={styles.botaoVisualizar} 
                  onPress={() => {
                  setFuncionarioSelecionado(item);
                  setModalVisivel(true);}}>
                <Ionicons name="eye" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/telaCadastro')}>
          <Text style={styles.buttonText}>Cadastrar funcionário</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}>
        <View style={styles.modalCentrado}>
          <View style={styles.quadroModalFuncionario}>
            
            <TouchableOpacity 
              style={styles.botaoFecharModalTop} 
              onPress={() => setModalVisivel(false)}>
              <Ionicons name="close" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.nomeFuncionarioModal}>
              {funcionarioSelecionado?.nome}
            </Text>

            <View style={styles.badgeCargoModal}>
              <Ionicons name="briefcase" size={16} color="#000000" />
              <Text style={styles.textoCargoModal}>
                Cargo: {funcionarioSelecionado?.cargo}
              </Text>
            </View>

            <View style={styles.cartaoConteudoBege}>
              <Text style={styles.tituloCartaoBege}>Quartos atribuídos</Text>
              
              <ScrollView showsVerticalScrollIndicator={true}>
                {funcionarioSelecionado?.quartos.map((quarto, index) => (
                  <View key={index} style={styles.itemQuartoRow}>
                    <Text style={styles.textoQuartoItem}>
                      {index + 1}. {quarto}
                    </Text>
                  </View>))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}