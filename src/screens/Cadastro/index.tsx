import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Cadastro(){
    const router = useRouter();

    return(
        <View style={styles.container}>

            <View style={styles.labelTitle}>
                <Text style={styles.title}>Cadastrar Funcionário
            </Text>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.textForm}>Nome do Funcionário</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
        
                <View style={styles.inputGroup}>
                    <Text style={styles.textForm}>Cargo do funcionário</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.textForm}>Email do funcionário</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
     
                <View style={styles.inputGroup}>
                    <Text style={styles.textForm}>Senha do funcionário</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.textForm}>Digite a senha novamente</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
            </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/telaInicial')}>
            <Text style={styles.buttonText}>Salvar cadastro</Text>
          </TouchableOpacity>
        </View>

        </View>
        </View>
    );
}