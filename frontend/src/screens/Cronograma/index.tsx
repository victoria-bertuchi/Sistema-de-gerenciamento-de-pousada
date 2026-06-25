import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles, themeCalendario } from './styles';
import CardQuarto from './CardQuarto';

// Importando o Hook e tipos necessários
import { useCronograma, formatarDataTopo, aplicarMascaraData, formatarParaExibicao, StatusQuarto } from './useCronograma';

interface OpcDropdown {
  status: StatusQuarto;
  bg: string;
  corTexto: string;
}

const STATUS_OPCOES: OpcDropdown[] = [
  { status: 'Disponível', bg: '#E2FAD4', corTexto: '#1E4620' },
  { status: 'Limpeza', bg: '#FAFAD2', corTexto: '#525210' },
  { status: 'Reservar', bg: '#E8E7FF', corTexto: '#2C2673' }
];

export default function Cronograma() {
  const router = useRouter();

  // Consumindo todos os estados e métodos do nosso hook centralizado
  const {
    diaSelecionado, setDiaSelecionado,
    listaDeQuartos, carregando, salvandoDados, nivelAcesso, listaFuncionarios,
    modalVisivel, dropdownAberto, setDropdownAberto,
    funcionarioDropdownAberto, setFuncionarioDropdownAberto,
    modalCancelamentoVisivel, setModalCancelamentoVisivel,
    quartoSelecionado, statusModal, funcionarioModal, setFuncionarioModal,
    dataEntrada, setDataEntrada, dataSaida, setDataSaida,
    alterarStatusDoQuarto, resetModals, verificarAntesDeSalvar,
    executarSalvarAlteracoesUnificadas, abrirModalEdicao
  } = useCronograma();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.botaoSetaVoltar} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.textoDataTopo}>{formatarDataTopo(diaSelecionado || '')}</Text>
      </View>
      
      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.frameContent}>
        <Calendar 
          style={styles.calendario}
          theme={themeCalendario}
          markedDates={{[diaSelecionado || '']: { selected: true, disableTouchEvent: true }}}
          onDayPress={(day) => setDiaSelecionado(day.dateString)}
        />

        {carregando ? (
          <ActivityIndicator size="large" color="#4C4799" style={{ marginTop: 40 }} />
        ) : (
          <ScrollView style={styles.scrollQuartos} showsVerticalScrollIndicator={true}>
            {listaDeQuartos.map((quarto) => (
              <CardQuarto 
                key={quarto._id} 
                nome={quarto.nome} 
                status={quarto.status}
                disabled={nivelAcesso === 'funcionario'}
                onPress={() => abrirModalEdicao(quarto)}
              />
            ))}
          </ScrollView>
        )}
      </View>

      {/* MODAL DE EDIÇÃO PRINCIPAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={resetModals}
      >
        <View style={styles.modalContainerCentrado}>
          <View style={[styles.quadroModal, { paddingHorizontal: 20, paddingTop: 20 }]}>
          
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%', 
              marginBottom: 20 
            }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.tituloModal, { color: '#f5f5f5', fontSize: 20, fontWeight: 'bold' }]}>
                  {quartoSelecionado?.nome || 'Detalhes'}
                </Text>
              </View>

              <TouchableOpacity onPress={resetModals} style={{ padding: 10, marginRight: -10 }} activeOpacity={0.7}>
                <Ionicons name="close" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* DROPDOWN STATUS */}
            <View style={[styles.containerDropdown, { zIndex: 3000, marginBottom: 15, width: '100%' }]}>
              <Text style={[styles.labelInputModal, { color: '#F3F1E4', marginTop: 15, marginBottom: 10 }]}>Status do quarto</Text>
              <TouchableOpacity 
                style={styles.caixaPrincipalDropdown}
                onPress={() => {
                  setDropdownAberto(!dropdownAberto);
                  setFuncionarioDropdownAberto(false); 
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.textoDropdownAtual}>{statusModal}</Text>
                <Ionicons name={dropdownAberto ? "chevron-up" : "chevron-down"} size={20} color="#4C4799" />
              </TouchableOpacity>

              {dropdownAberto && (
                <View style={styles.listaOpcoesDropdown}>
                  {STATUS_OPCOES.map((item, index) => (
                    <TouchableOpacity 
                      key={item.status}
                      style={[index === STATUS_OPCOES.length - 1 ? styles.opcaoBotaoUltimo : styles.opcaoBotao, { backgroundColor: item.bg }]}
                      onPress={() => alterarStatusDoQuarto(item.status)}
                    >
                      <Text style={[styles.textoOpcao, { color: item.corTexto }]}>{item.status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* DROPDOWN FUNCIONÁRIO (SE STATUS FOR LIMPEZA) */}
            {statusModal === 'Limpeza' && (
              <View style={[styles.containerDropdown, { zIndex: 2000, marginBottom: 15, width: '100%' }]}>
                <Text style={[styles.labelInputModal, { color: '#333', marginBottom: 5 }]}>Funcionário escalado</Text>
                <TouchableOpacity 
                  style={styles.caixaPrincipalDropdown}
                  onPress={() => setFuncionarioDropdownAberto(!funcionarioDropdownAberto)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.textoDropdownAtual}>{funcionarioModal || 'Selecionar funcionário...'}</Text>
                  <Ionicons name={funcionarioDropdownAberto ? "chevron-up" : "chevron-down"} size={20} color="#4C4799" />
                </TouchableOpacity>

                {funcionarioDropdownAberto && (
                  <View style={styles.listaOpcoesDropdown}>
                    {listaFuncionarios.map((func, index) => (
                      <TouchableOpacity 
                        key={func._id}
                        style={[index === listaFuncionarios.length - 1 ? styles.opcaoBotaoUltimo : styles.opcaoBotao, { backgroundColor: '#F3F1E4' }]}
                        onPress={() => {
                          setFuncionarioModal(func.nome);
                          setFuncionarioDropdownAberto(false);
                        }}
                      >
                        <Text style={[styles.textoOpcao, { color: '#000000' }]}>{func.nome}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* INPUTS DE DATA (SE RESERVAR OU OCUPADO) */}
            {(statusModal === 'Reservar' || statusModal === 'Ocupado') && (
              <View style={{ width: '100%' }}>
                <View style={[styles.containerInputModal, { marginBottom: 15 }]} />

                <View style={{ flexDirection: 'row', gap: 10, width: '100%', marginBottom: 20 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.labelInputModal, { color: '#333', marginBottom: 5 }]}>Check-in</Text>
                    <TextInput 
                      style={[styles.inputModalStyle, { color: '#000', borderColor: '#DDD', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, height: 45 }]}
                      placeholder="DD/MM/AAAA"
                      placeholderTextColor="#A0A0A0"
                      maxLength={10}
                      keyboardType="numeric"
                      value={formatarParaExibicao(dataEntrada)}
                      onChangeText={(txt) => setDataEntrada(aplicarMascaraData(txt))}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={[styles.labelInputModal, { color: '#333', marginBottom: 5 }]}>Check-out</Text>
                    <TextInput 
                      style={[styles.inputModalStyle, { color: '#000', borderColor: '#DDD', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, height: 45 }]}
                      placeholder="DD/MM/AAAA"
                      placeholderTextColor="#A0A0A0"
                      maxLength={10}
                      keyboardType="numeric"
                      value={formatarParaExibicao(dataSaida)}
                      onChangeText={(txt) => setDataSaida(aplicarMascaraData(txt))}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* BOTÃO CONCLUIR */}
            <TouchableOpacity 
              style={[styles.botaoFecharModal, { marginTop: 10, width: '100%' }, salvandoDados && { opacity: 0.6 }]} 
              onPress={verificarAntesDeSalvar} 
              disabled={salvandoDados}
            >
              {salvandoDados ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.textoFecharModal}>Concluir</Text>
              )}
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* POPUP DE CONFIRMAÇÃO DE CANCELAMENTO */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCancelamentoVisivel}
        onRequestClose={() => setModalCancelamentoVisivel(false)}
      >
        <View style={styles.overlayModalUnificado}>
          <View style={styles.containerModalUnificado}>
            
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Ionicons name="alert-circle-outline" size={48} color="#4C4799" />
            </View>

            <Text style={styles.tituloModalUnificado}>Cancelar Reserva</Text>
            
            <Text style={styles.descricaoModalUnificado}>
              Deseja realmente cancelar a reserva do <Text style={{ fontWeight: 'bold' }}>{quartoSelecionado?.nome}</Text>?
            </Text>

            <View style={styles.rowBotoesModalUnificado}>
              <TouchableOpacity 
                style={[styles.botaoModalUnificado, styles.botaoCancelarModalUnificado]} 
                onPress={() => setModalCancelamentoVisivel(false)}
              >
                <Text style={styles.textoBotaoCancelarModal}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.botaoModalUnificado, styles.botaoConfirmarModalUnificado]} 
                onPress={executarSalvarAlteracoesUnificadas}
              >
                <Text style={styles.textoBotaoConfirmarModal}>Sim, Cancelar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}