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
  }
});