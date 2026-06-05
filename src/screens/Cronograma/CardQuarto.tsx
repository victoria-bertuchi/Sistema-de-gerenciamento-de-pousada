import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';

type StatusQuarto = 'Disponível' | 'Limpeza' | 'Ocupado';

interface CardQuartoProps {
  nome: string;
  status: string; 
  onPress: () => void; 
}

const statusConfig: Record<StatusQuarto, { bgStatus: string; textoCor: string; icone: keyof typeof Ionicons.glyphMap }> = {
  'Disponível': { bgStatus: '#E2FAD4', textoCor: '#1E4620', icone: 'checkmark-circle' },
  'Limpeza': { bgStatus: '#FAFAD2', textoCor: '#525210', icone: 'sparkles' },
  'Ocupado': { bgStatus: '#FFD3D3', textoCor: '#611A1A', icone: 'people' }
};

export default function CardQuarto({ nome, status, onPress }: CardQuartoProps) {
  const statusValido = (statusConfig[status as StatusQuarto] ? status : 'Disponível') as StatusQuarto;
  const config = statusConfig[statusValido];

  return (
    <TouchableOpacity style={styles.cardQuarto} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.textoNomeQuarto}>{nome}</Text>
      
      <View style={[styles.badgeStatus, { backgroundColor: config.bgStatus }]}>
        <Ionicons name={config.icone} size={18} color={config.textoCor} style={{ marginRight: 6 }} />
        <Text style={[styles.textoStatus, { color: config.textoCor }]}>{statusValido}</Text>
      </View>
    </TouchableOpacity>
  );
}