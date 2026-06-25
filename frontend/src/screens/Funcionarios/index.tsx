import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';
import { useFuncionarios } from './useFuncionarios';

export default function Funcionarios() {
  const router = useRouter();

  const {
    listaFuncionarios,
    modalVisivel,
    setModalVisivel,
    funcionarioSelecionado,
    carregando,
    confirmarVisivel,
    setConfirmarVisivel,
    removerFuncionario,
    abrirModalVisualizar,
  } = useFuncionarios();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerGroup}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={35} color="black" />
        </TouchableOpacity>

        <View style={styles.labelTitle}>
          <Text style={styles.title}>Funcionários</Text>
        </View>
      </View>

      {/* TABELA / LISTAGEM */}
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
            <View key={item._id} style={styles.linhaFuncionario}>
              <View style={styles.blocoDado}>
                <Text style={styles.textoDado}>{item.nome.split(' ')[0]}</Text> 
              </View>

              <View style={styles.blocoDado}>
                <Text style={styles.textoDado}>{item.cargo}</Text>
              </View>

              <TouchableOpacity 
                style={styles.botaoVisualizar} 
                onPress={() => abrirModalVisualizar(item)}
              >
                <Ionicons name="eye" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/telaCadastro')}>
          <Text style={styles.buttonText}>Cadastrar funcionário</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DETALHES DO FUNCIONÁRIO */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalCentrado}>
          <View style={styles.quadroModalFuncionario}>
            
            <TouchableOpacity 
              style={styles.botaoFecharModalTop} 
              onPress={() => setModalVisivel(false)}
            >
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
                {funcionarioSelecionado && (listaFuncionarios.find(f => f._id === funcionarioSelecionado._id)?.quartos || []).length > 0 ? (
                  (listaFuncionarios.find(f => f._id === funcionarioSelecionado._id)?.quartos || []).map((quarto, index) => (
                    <View key={index} style={styles.itemQuartoRow}>
                      <Text style={styles.textoQuartoItem}>
                        {index + 1}. {quarto}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.textoQuartoItem, { fontStyle: 'italic', opacity: 0.6, fontSize: 16, alignItems: 'center'}]}>
                    Nenhum quarto atribuído ainda.
                  </Text>
                )}
              </ScrollView>
            </View>

            {funcionarioSelecionado && (
              <TouchableOpacity 
                style={styles.botaoExcluirModal} 
                onPress={() => setConfirmarVisivel(true)}
              >
                <Ionicons name="trash-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.textoExcluirModal}>Excluir Funcionário</Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </Modal>

      {/* MODAL CONFIRMAÇÃO DE DELEÇÃO */}
      <Modal
        visible={confirmarVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmarVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            <View style={[styles.modalIconCircle, styles.modalIconErro]}>
              <Ionicons name="trash-outline" size={40} color="#FFFFFF" />
            </View>

            <Text style={styles.modalTitle}>Excluir Funcionário?</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja remover {funcionarioSelecionado?.nome} permanentemente do sistema?
            </Text>

            {carregando ? (
              <ActivityIndicator size="large" color="#D9534F" />
            ) : (
              <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                <TouchableOpacity 
                  style={[styles.modalButton, { backgroundColor: '#A0A0A0', flex: 1 }]} 
                  onPress={() => setConfirmarVisivel(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.modalButton, { backgroundColor: '#D9534F', flex: 1 }]} 
                  onPress={removerFuncionario}
                >
                  <Text style={styles.modalButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}