import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function TelaInicial(){
    const router = useRouter();

    return(
        <View style={styles.container}>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/telaCadastro')}>
                    <Text style={styles.buttonText}>Cadastrar funcionário</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>

        </View>


    );

}