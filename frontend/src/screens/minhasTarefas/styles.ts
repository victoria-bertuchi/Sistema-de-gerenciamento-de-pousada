import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C4799', // Fundo roxo estrutural superior
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  botaoVoltar: {
    position: 'absolute',
    left: 20,
    top: 52,
    zIndex: 10,
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'LeagueSpartan-Regular',
  },
  badgeCargo: {
    backgroundColor: '#BCD7FF', // Azul claro do container de cargo
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  textoCargo: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  frameContent: {
    flex: 1,
    backgroundColor: '#F3F1E4', // Fundo bege idêntico ao mockup
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  scrollTarefas: {
    flex: 1,
  },
  cardTarefa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  indicadorIcone: {
    backgroundColor: '#E8E7FF',
    padding: 8,
    borderRadius: 8,
  },
  infoQuarto: {
    flex: 1,
    marginLeft: 12,
  },
  textoNomeQuarto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  textoSubTarefa: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  containerVazio: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  textoVazio: {
    color: '#666666',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },

  overlayModalUnificado: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Escurecimento suave de fundo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerModalUnificado: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    alignItems: 'stretch',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tituloModalUnificado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricaoModalUnificado: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  rowBotoesModalUnificado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  botaoModalUnificado: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCancelarModalUnificado: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  botaoConfirmarModalUnificado: {
    backgroundColor: '#4C4799', // Roxo padrão do sistema
  },
  textoBotaoCancelarModal: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '600',
  },
  textoBotaoConfirmarModal: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});