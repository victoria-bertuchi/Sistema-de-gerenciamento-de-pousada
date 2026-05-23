import { StyleSheet } from 'react-native';

const colors = {
  colorBg: '#E0CFDE',
  textLight: '#F3F1E4',
  buttonBg: '#4C4799',
  inputBg: '#FFFFFF',
  inputText: '#333333',
  inputPlaceholder: '#A0A0A0',
  buttonTextColor: '#FFFFFF'
};

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.colorBg,
        justifyContent: 'space-between'
    },

    /* Cabeçalho */
    headerGroup:{
        width: '100%',
        gap: 20},

    buttonBack:{
        paddingLeft: 25,
        paddingTop: 25
    },

    labelTitle:{        
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 25},

    title:{        
        fontSize: 35,
        width: 190,
        textAlign: 'center',
        fontFamily: 'LeagueSpartan-Regular'},
    
    /* Rodapé */
    footer:{
        width: '100%',
        marginBottom: 40,
        alignItems: 'center'
    },
    button:{        
        backgroundColor: colors.buttonBg,
        width: 250,
        height: 45,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'},

    buttonText:{        
        fontSize: 20,
        color: colors.buttonTextColor,
        fontFamily: 'LeagueSpartan-Regular',}
})