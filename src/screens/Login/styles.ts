import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz a tela ocupar 100% do espaço disponível
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'center', // Centraliza na vertical
  },

  form:{
    marginTop:60
  },

  inputGroup: {
    width: '100%',
    marginBottom: 50,
    marginLeft: 10,
  },

  text: {
    fontSize: 18,
    color: '#333',
    paddingBottom: 5
  },

  input:{
    width: 300,
    height: 35,
    borderWidth: 1,
    paddingHorizontal: 16
  },

  footer:{
    marginBottom: 20,
    alignItems: 'center'
  },

  button:{
    backgroundColor: '#4C4799',
    width: 150,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText:{
    fontSize: 20,
    color: '#FFFF'
  }
});