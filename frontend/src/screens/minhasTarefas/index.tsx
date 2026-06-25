import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';
import { useMinhasTarefas } from './useMinhasTarefas';

export default function MinhasTarefas() {
  const router = useRouter();

  const {
    cargo,
    quartosDesignados,
    carregando,
    modalVisivel,
    setModalVisivel,
    quartoParaFinalizar,
    abrirConfirmacaoLimpeza,
    fecharModalConfirmacao,
    executarFinalizacaoDoQuarto,
  } = useMinhasTarefas();

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Minhas tarefas</Text>
        
        <View style={styles.badgeCargo}>
          <Text style={styles.textoCargo}>Cargo: {cargo}</Text>
        </View>
      </View>

      {/* ÁREA DE CONTEÚDO */}
      <View style={styles.frameContent}>
        {carregando ? (
          <ActivityIndicator size="large" color="#4C4799" style={{ marginTop: 40 }} />
        ) : (
          <ScrollView style={styles.scrollTarefas} showsVerticalScrollIndicator={true}>
            {quartosDesignados.length === 0 ? (
              <View style={styles.containerVazio}>
                <Ionicons name="checkmark-done-circle-outline" size={54} color="#A0A0A0" />
                <Text style={styles.textoVazio}>Nenhum quarto designado para hoje!</Text>
              </View>
            ) : (
              <View style={{ gap: 10 }}>
                {quartosDesignados.map((quarto) => (
                  <View key={quarto.id} style={styles.cardTarefa}>
                    <View style={styles.indicadorIcone}>
                      <Ionicons name="bed-outline" size={24} color="#4C4799" />
                    </View>
                    
                    <View style={styles.infoQuarto}>
                      <Text style={styles.textoNomeQuarto}>{quarto.nome}</Text>
                      <Text style={styles.textoSubTarefa}>Necessita de higienização</Text>
                    </View>

                    <TouchableOpacity 
                      style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} 
                      onPress={() => abrirConfirmacaoLimpeza(quarto)}
                      activeOpacity={0.5}
                    >
                      <Ionicons name="checkbox" size={28} color="#4C4799" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        )}
      </View>

      {/* POPUP CUSTOMIZADO DE CONFIRMAÇÃO */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={fecharModalConfirmacao}
      >
        <View style={styles.overlayModalUnificado}>
          <View style={styles.containerModalUnificado}>
            
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Ionicons name="alert-circle-outline" size={48} color="#4C4799" />
            </View>

            <Text style={styles.tituloModalUnificado}>Finalizar Higienização</Text>
            
            <Text style={styles.descricaoModalUnificado}>
              Deseja marcar a higienização do <Text style={{ fontWeight: 'bold' }}>{quartoParaFinalizar?.nome}</Text> como concluída?
            </Text>

            <View style={styles.rowBotoesModalUnificado}>
              <TouchableOpacity 
                style={[styles.botaoModalUnificado, styles.botaoCancelarModalUnificado]} 
                onPress={fecharModalConfirmacao}
              >
                <Text style={styles.textoBotaoCancelarModal}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.botaoModalUnificado, styles.botaoConfirmarModalUnificado]} 
                onPress={executarFinalizacaoDoQuarto}
              >
                <Text style={styles.textoBotaoConfirmarModal}>Sim</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}