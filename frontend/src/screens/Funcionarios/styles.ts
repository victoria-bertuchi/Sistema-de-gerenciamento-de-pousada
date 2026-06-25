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
        backgroundColor: colors.rosa,
        justifyContent: 'space-between'
    },

    headerGroup: {
        width: '100%',
    },

    buttonBack: {
        paddingLeft: 25,
        paddingTop: 35, 
    },

    labelTitle: {        
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25
    },

  title: {        
    fontSize: 42, 
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-Regular',
  },

    tabelaContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
    },

    linhaCabecalho: {
        flexDirection: 'row',
        width: 325,
        marginBottom: 10,
        paddingRight: 55, 
    },

    tituloColuna: {
        flex: 1,
        height: 35,
        backgroundColor: colors.roxo,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    textoTituloColuna: {
        color: colors.branco,
        fontSize: 18,
        fontWeight: '500',
    },

    scrollFuncionarios: {
        flex: 1,
    },

    linhaFuncionario: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },

    blocoDado: {
        flex: 1,
        height: 38,
        backgroundColor: colors.bege, 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    textoDado: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '400',
    },

    botaoVisualizar: {
        width: 42,
        height: 38,
        backgroundColor: colors.bege,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    footer: {
        width: '100%',
        marginBottom: 40,
        alignItems: 'center',
        marginTop: 15,
    },

    button: {        
        backgroundColor: colors.roxo,
        width: 280, 
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {        
        fontSize: 20,
        color: colors.bege,
        fontWeight: '500',
    },

    modalCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    quadroModalFuncionario: {
        width: 325,
        height: 550,
        backgroundColor: colors.roxo, 
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
        elevation: 10,
    },

    botaoFecharModalTop: {
        position: 'absolute',
        top: 20,
        right: 25,
        zIndex: 10,
    },

    nomeFuncionarioModal: {
        color: colors.branco,
        fontSize: 28,
        marginTop: 25,
        textAlign: 'center',
        fontFamily: 'LeagueSpartan-Regular'
    },

    badgeCargoModal: {
        flexDirection: 'row',
        backgroundColor: colors.azul, 
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 25,
    },

    textoCargoModal: {
        color: colors.preto, 
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
        fontFamily: 'Krub-Regular'
    },

    cartaoConteudoBege: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.bege, 
        borderRadius: 25,
        padding: 20,
    },

    tituloCartaoBege: {
        fontSize: 25,
        color: colors.preto,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20,
        fontFamily: 'LeagueSpartan-Regular'
    },

    itemQuartoRow: {
        width: '100%',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC5B9', 
    },

    textoQuartoItem: {
        fontSize: 18,
        color: colors.preto,
        fontFamily: 'Krub-Regular'
    },

    botaoExcluirModal: {
        backgroundColor: '#D9534F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        width: '100%',
        marginTop: 20,
    },

    textoExcluirModal: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }, 

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        justifyContent: 'center',
        alignItems: 'center',
    },

     modalCard: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
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
        backgroundColor: '#D9534F', 
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
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

});