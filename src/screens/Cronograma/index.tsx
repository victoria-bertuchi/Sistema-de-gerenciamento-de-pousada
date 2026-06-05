import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles, themeCalendario } from './styles';
import CardQuarto from './CardQuarto';

type StatusQuarto = 'Disponível' | 'Limpeza' | 'Ocupado';

interface OpcDropdown {
  status: StatusQuarto;
  bg: string;
  corTexto: string;
}

const STATUS_OPCOES: OpcDropdown[] = [
  { status: 'Disponível', bg: '#E2FAD4', corTexto: '#1E4620' },
  { status: 'Limpeza', bg: '#FAFAD2', corTexto: '#525210' },
  { status: 'Ocupado', bg: '#FFD3D3', corTexto: '#611A1A' },
];

const FUNCIONARIOS = ['Fulano', 'Ciclano', 'Beltrano'];

const formatarDataTopo = (dataString: string) => {
  if (!dataString) return '';
  const [ano, mes, dia] = dataString.split('-');
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return `${dia} ${meses[parseInt(mes, 10) - 1]}`; 
};

export default function Cronograma() {
  const router = useRouter();
  const hoje = new Date().toISOString().split('T')[0];
  
  const [diaSelecionado, setDiaSelecionado] = useState(hoje);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  
  const [funcionarioDropdownAberto, setFuncionarioDropdownAberto] = useState(false);
  const [quartoSelecionado, setQuartoSelecionado] = useState<{ id: string; nome: string } | null>(null);

  const [listaDeQuartos, setListaDeQuartos] = useState([
    { id: '1', nome: 'Quarto 02', status: 'Disponível' as StatusQuarto, funcionario: '' },
    { id: '2', nome: 'Quarto 03', status: 'Disponível' as StatusQuarto, funcionario: '' },
    { id: '3', nome: 'Quarto 04', status: 'Limpeza' as StatusQuarto, funcionario: 'Fulano' },
    { id: '4', nome: 'Quarto 01', status: 'Ocupado' as StatusQuarto, funcionario: '' },
    { id: '5', nome: 'Quarto 08', status: 'Ocupado' as StatusQuarto, funcionario: '' },
  ]);

  const alterarStatusDoQuarto = (novoStatus: StatusQuarto) => {
    if (!quartoSelecionado) return;
    setListaDeQuartos(listaAnterior => 
      listaAnterior.map(q => {
        if (q.id === quartoSelecionado.id) {
          return { ...q, status: novoStatus, funcionario: novoStatus === 'Limpeza' ? q.funcionario : '' };
        }
        return q;
      })
    );
  };

  const alterarFuncionarioDoQuarto = (nomeFuncionario: string) => {
    if (!quartoSelecionado) return;
    setListaDeQuartos(listaAnterior =>
      listaAnterior.map(q => q.id === quartoSelecionado.id ? { ...q, funcionario: nomeFuncionario } : q)
    );
  };

  const quartoAtual = listaDeQuartos.find(q => q.id === quartoSelecionado?.id);

  const resetModals = () => {
    setModalVisivel(false);
    setDropdownAberto(false);
    setFuncionarioDropdownAberto(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.botaoSetaVoltar} onPress={() => router.push('/telaInicial')}>
          <Ionicons name="return-up-back-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.textoDataTopo}>{formatarDataTopo(diaSelecionado)}</Text>
      </View>
      
      <View style={styles.frameContent}>
        <Calendar 
          style={styles.calendario}
          theme={themeCalendario}
          markedDates={{[diaSelecionado]: { selected: true, disableTouchEvent: true }}}
          onDayPress={(day) => setDiaSelecionado(day.dateString)}
        />

        <ScrollView style={styles.scrollQuartos} showsVerticalScrollIndicator={true}>
          {listaDeQuartos.map((quarto) => (
            <CardQuarto 
              key={quarto.id} 
              nome={quarto.nome} 
              status={quarto.status} 
              onPress={() => {
                setQuartoSelecionado({ id: quarto.id, nome: quarto.nome });
                setModalVisivel(true);
              }}
            />
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={resetModals}
      >
        <View style={styles.modalContainerCentrado}>
          <View style={styles.quadroModal}>
            
            <Text style={styles.tituloModal}>{quartoSelecionado?.nome}</Text>

            <View style={[styles.containerDropdown, { zIndex: 2000 }]}>
              <Text style={styles.labelDropdownModal}>Status do quarto</Text>
              <TouchableOpacity 
                style={styles.caixaPrincipalDropdown}
                onPress={() => {
                  setDropdownAberto(!dropdownAberto);
                  setFuncionarioDropdownAberto(false); 
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.textoDropdownAtual}>
                  {quartoAtual?.status || 'Selecione...'}
                </Text>
                <Ionicons name={dropdownAberto ? "chevron-up" : "chevron-down"} size={20} color="#4C4799" />
              </TouchableOpacity>

              {dropdownAberto && (
                <View style={styles.listaOpcoesDropdown}>
                  {STATUS_OPCOES.map((item, index) => (
                    <TouchableOpacity 
                      key={item.status}
                      style={[
                        index === STATUS_OPCOES.length - 1 ? styles.opcaoBotaoUltimo : styles.opcaoBotao, 
                        { backgroundColor: item.bg }
                      ]}
                      onPress={() => {
                        alterarStatusDoQuarto(item.status);
                        setDropdownAberto(false);
                      }}
                    >
                      <Text style={[styles.textoOpcao, { color: item.corTexto }]}>{item.status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {quartoAtual?.status === 'Limpeza' && (
              <View style={[styles.containerDropdown, { zIndex: 1000 }]}>
                <Text style={styles.labelDropdownModal}>Funcionário escalado</Text>
                <TouchableOpacity 
                  style={styles.caixaPrincipalDropdown}
                  onPress={() => {
                    setFuncionarioDropdownAberto(!funcionarioDropdownAberto);
                    setDropdownAberto(false); 
                  }}
                  activeOpacity={0.9}
                >
                  <Text style={styles.textoDropdownAtual}>
                    {quartoAtual?.funcionario || 'Selecionar funcionário...'}
                  </Text>
                  <Ionicons name={funcionarioDropdownAberto ? "chevron-up" : "chevron-down"} size={20} color="#4C4799" />
                </TouchableOpacity>

                {funcionarioDropdownAberto && (
                  <View style={styles.listaOpcoesDropdown}>
                    {FUNCIONARIOS.map((func, index) => (
                      <TouchableOpacity 
                        key={func}
                        style={[
                          index === FUNCIONARIOS.length - 1 ? styles.opcaoBotaoUltimo : styles.opcaoBotao, 
                          { backgroundColor: '#F3F1E4' } 
                        ]}
                        onPress={() => {
                          alterarFuncionarioDoQuarto(func);
                          setFuncionarioDropdownAberto(false);
                        }}
                      >
                        <Text style={[styles.textoOpcao, { color: '#000000' }]}>{func}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity style={styles.botaoFecharModal} onPress={resetModals}>
              <Text style={styles.textoFecharModal}>Concluir</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}