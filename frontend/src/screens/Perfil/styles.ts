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
        paddingHorizontal: 25,
        paddingTop: 50,
    },
  
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },

    botaoHeader: {
        paddingBottom: 35
    },

    tituloContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },

    textoSeuPerfil: {
        color: colors.branco,
        fontSize: 40,
        fontFamily: 'LeagueSpartan-Regular'
    },

    textoCargo: {
        color: colors.branco, 
        fontSize: 20,
        marginTop: 8,
        fontFamily: 'Krub-Regular'
    },

    formContainer: {
        width: '100%',
    },

    campoContainer: {
        marginBottom: 25,
    },

    labelCampo: {
        color: colors.branco,
        fontSize: 25,
        marginBottom: 8,
        paddingLeft: 5,
        fontFamily: 'LeagueSpartan-Regular'
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: '100%',
    },
  
    caixaInputReal: {
        flex: 1, 
        height: 48,
        backgroundColor: colors.branco,
        borderRadius: 15,
        paddingHorizontal: 15,
        color: colors.preto,
        fontSize: 16,
        marginRight: 12,
        fontFamily: 'Krub-Regular'
    },

    inputBloqueado: {
        color: '#333333',         
        backgroundColor: '#8a8a8a',
    },

    botaoEditarFixado: {
        backgroundColor: '#FFFFFF',
        width: 48,
        height: 48,
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, 
        shadowColor: colors.preto,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    iconeLapisPadrao: {
        color: colors.preto, 
    },

    iconeLapisAtivo: {
        color: colors.roxo, 
  }

});