import { StyleSheet } from 'react-native';

const colors = {
  colorBg: '#E0CFDE',
  textColor: '#000000',
  inputBg: '#FFFFFF',
  buttonBg: '#4C4799',
  buttonTextColor: '#E0CFDE',
  colorIcon: '#333333'
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBg
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
        marginTop: 15
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
        color: colors.textColor,
        fontFamily: 'LeagueSpartan-Regular',
        marginBottom: 5
    },

    input: {
        width: 290,
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 18,
        backgroundColor: colors.inputBg,
        fontSize: 18,
        fontFamily: 'LeagueSpartan-Regular'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBg,
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
        color: colors.colorIcon
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
        backgroundColor: colors.buttonBg,
        width: 200,
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 20,
        color: colors.buttonTextColor,
        fontFamily: 'LeagueSpartan-Regular',
    },
});