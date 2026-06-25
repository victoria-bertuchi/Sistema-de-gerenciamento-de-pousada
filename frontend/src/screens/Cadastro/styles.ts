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
        backgroundColor: colors.rosa
    },

    /* Cabeçalho */
    labelTitle: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 25
    },

    title: {
        fontSize: 40,
        width: 190,
        textAlign: 'center',
        fontFamily: 'LeagueSpartan-Regular'
    },

    /* Formulário */
    form: {
        marginTop: 0
    },

    inputGroup: {
        alignItems: 'center',
        marginBottom: 30
    },

    inputWrapper: {
        width: 290
    },

    textForm: {
        fontSize: 21,
        color: colors.preto,
        fontFamily: 'LeagueSpartan-Regular',
        marginBottom: 5
    },

    input: {
        width: 290,
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 18,
        backgroundColor: colors.branco,
        fontSize: 18,
        fontFamily: 'LeagueSpartan-Regular'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.branco,
        width: 290,
        height: 40,
        borderRadius: 18,
        paddingHorizontal: 16
    },

    inputWithIcon: {
        flex: 1,
        height: '100%',
        fontSize: 18,
        fontFamily: 'LeagueSpartan-Regular',
        color: colors.preto
    },

    eyeIcon: {
        padding: 4
    },

    footer: {
        marginBottom: 10,
        alignItems: 'center'
    },

    /* Botão salvar */
    button: {
        backgroundColor: colors.roxo,
        width: 200,
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 20,
        color: colors.branco,
        fontFamily: 'LeagueSpartan-Regular',
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40, 
        position: 'relative',
    },

    buttonBack: {
        position: 'absolute',
        left: 20,
        top: 40,
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