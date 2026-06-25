import { StyleSheet } from 'react-native';

const colors = {
  roxo: '#4C4799', 
  bege: '#F3F1E4', 
  branco: '#FFFFFF',
  preto: '#000000',
  lilas: '#827CB9',
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.roxo,
    },
  
    headerContainer: {
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    textoDataTopo: {
        color: colors.bege,         
        fontSize: 30,
        textAlign: 'center',
        marginTop: 60,                     
        fontFamily: 'LeagueSpartan-Regular'
    },

    botaoSetaVoltar: {
        position: 'absolute',
        left: 20,         
        top: 25,         
        padding: 10,
        zIndex: 10,       
        elevation: 10,
        color: colors.bege,      
    },

    frameContent: {
        flex: 1,
        backgroundColor: colors.bege,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    calendario: {
        width: '100%',
        height: 318,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 2, 
        shadowColor: colors.preto, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    scrollQuartos: {
        flex: 1,
    },

    cardQuarto: {
        flexDirection: 'row',
        backgroundColor: colors.lilas, 
        borderRadius: 15,
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingLeft: 20,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: colors.lilas  
    },

    textoNomeQuarto: {
        color: colors.branco,
        fontSize: 18,
        fontWeight: '600',
    },

    badgeStatus: {
        height: 500,
        width: '50%', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 15,
        paddingHorizontal: 10,
    },

    textoStatus: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    modalContainerCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    },

    quadroModal: {
        width: 325,
        minHeight: 550,
        backgroundColor: colors.roxo, 
        borderRadius: 30,
        padding: 25,
        paddingTop: 70,
        alignItems: 'center',
        position: 'relative',
        elevation: 10,
    },

    tituloModal: {
        color: colors.branco,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        top: 30,
        fontFamily: 'LeagueSpartan-Regular'
    },

    containerDropdown: {
        width: '100%', 
        position: 'relative',
        marginBottom: 15, 
    },

    labelDropdownModal: {
        color: colors.branco,
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 6,
        alignSelf: 'flex-start',
        paddingLeft: 2,
    },

    caixaPrincipalDropdown: {
        width: '100%',
        height: 50,
        backgroundColor: colors.bege, 
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    textoDropdownAtual: {
        fontSize: 16, 
        color: colors.preto,
        fontFamily: 'Krub-Regular' 
    },

    listaOpcoesDropdown: {
        width: '100%',
        backgroundColor: colors.lilas,
        borderRadius: 12,
        marginTop: 5,
        padding: 5,
        position: 'absolute',
        top: 75, 
        zIndex: 10000,        
        elevation: 10000,     
    },

    opcaoBotao: {
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 4,
    },

    opcaoBotaoUltimo: {
        padding: 12, 
        borderRadius: 8,
    },

    textoOpcao: {
        textAlign: 'center',
        fontFamily: 'Krub-Regular'
    },

    botaoFecharModal: {
        position: 'absolute', 
        bottom: 25,           
        padding: 10,
        width: '100%',        
        alignItems: 'center'
    },

    textoFecharModal: {
        color: colors.bege,
        fontSize: 20,
        textDecorationLine: 'underline',
    },

    botaoFlutuanteAdd: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#4C4799',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    containerInputModal: {
        width: '100%',
    },

    labelInputModal: {
        fontSize: 14,
        color: '#FFFFFF', 
        fontWeight: 'bold',
        marginBottom: 6,
        alignSelf: 'flex-start', 
    },

    inputModalStyle: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#333333',
        backgroundColor: '#FAFAFA',
    },

    overlayModalUnificado: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    containerModalUnificado: {
        width: '90%',
        maxWidth: 340,
        backgroundColor: colors.branco,
        borderRadius: 16,
        padding: 22,
        alignItems: 'stretch',
        elevation: 5,
        shadowColor: colors.preto,
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
        fontFamily: 'Krub-Regular',
    },
    descricaoModalUnificado: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 22,
        fontFamily: 'Krub-Regular',
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
        backgroundColor: colors.roxo, 
    },
    textoBotaoCancelarModal: {
        color: '#666666',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Krub-Regular',
    },
    textoBotaoConfirmarModal: {
        color: colors.branco,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Krub-Regular',
    },

});

export const themeCalendario = {
  backgroundColor: colors.branco,
  calendarBackground: colors.branco, 
  textSectionTitleColor: '#b6b7bf',
  selectedDayBackgroundColor: colors.lilas, 
  selectedDayTextColor: colors.branco,
  todayTextColor: colors.roxo,
  dayTextColor: '#2d4150',
  arrowColor: colors.roxo,
};