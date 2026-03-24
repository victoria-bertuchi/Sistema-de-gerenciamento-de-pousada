import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },

    labelTitle:{
        width: '100%', // Garante que o container do título ocupe a largura toda
        alignItems: 'center', // Centraliza o que estiver dentro dele (o Text)
        marginTop: 20,
        marginBottom: 20,
    },

    title: {
        fontSize:35,
        width:185,
        textAlign: 'center',
    },
    
    form: {
        marginTop: 30
    },

    inputGroup: {
        width: '100%',
        marginBottom: 40,
        marginLeft:10
    },

    textForm: {
        fontSize: 18,
        color: '#333',
    },

    input: {
        width: 300,
        height: 35,
        borderWidth: 1,
        paddingHorizontal: 16
    },

    footer:{
        marginBottom: 10,
        alignItems: 'center'
    },

    button:{
        backgroundColor: '#4C4799',
        width: 160,
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