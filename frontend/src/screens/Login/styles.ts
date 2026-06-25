import { StyleSheet } from 'react-native';

const colors = {
  roxo: '#4C4799', 
  bege: '#F3F1E4', 
  branco: '#FFFFFF',
  preto: '#000000',
  lilas: '#827CB9',
  azul: '#BCD7FF',
  rosa: '#E0CFDE'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.roxo,
    padding: 24,
    justifyContent: 'center'
  },

  /* Cabeçalho */
  headerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 40,
    position: 'relative'
  },

  textWrapper: {
    width: '80%',
    flexDirection: 'column'
  },

  titleText: {
    fontSize: 54,
    color: colors.bege,
    fontFamily: 'LeagueSpartan-Regular',
    textAlign: 'left',
    lineHeight: 52
  },

  subTitleText: {
    fontSize: 24,
    color: colors.bege,
    fontFamily: 'Krub-Regular',
    textAlign: 'left',
    lineHeight: 30,
    marginTop: 5
  },

  ramoImage: {
    position: 'absolute',
    top: -25,
    right: -25,
    width: 180,
    height: 180
  },

  /* Formulário */
  form: {
    marginTop: 20,
    alignItems: 'center'
  },

  inputGroup: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center'
  },

  inputWrapper: {
    width: 300
  },

  text: {
    fontSize: 25,
    color: colors.bege,
    paddingBottom: 5,
    fontFamily: 'LeagueSpartan-Regular'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bege,
    width: 300,
    height: 45,
    borderRadius: 20,
    paddingHorizontal: 16
  },

  inputIcon: {
    marginRight: 10
  },

  eyeIcon: {
    padding: 4
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: colors.preto
  },

  footer: {
    alignItems: 'center',
    marginTop: 10
  },

  /* Botão esqueci minha senha*/
  buttonEsqueciMinhaSenha: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26
  },

  buttonEsqueciMinhaSenhaText: {
    fontSize: 20,
    color: colors.branco,
    fontFamily: 'LeagueSpartan-Regular',
    textDecorationLine: 'underline'
  },

  /* Botão entrar*/
  button: {
    backgroundColor: colors.azul,
    width: 220,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 20,
    color: colors.roxo,
    fontFamily: 'LeagueSpartan-Regular'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  modalIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  modalIconErro: {
    backgroundColor: '#E74C3C', 
  },

  modalIconSucesso: {
    backgroundColor: '#2ECC71', 
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 22,
  },

  modalButton: {
    backgroundColor: '#4C4799', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});