import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styles';

type StatusQuarto = 'Disponível' | 'Limpeza' | 'Ocupado' | 'Reservado';

interface CardQuartoProps {
  nome: string;
  status: string; 
  onPress: () => void; 
  disabled?: boolean;
  dataCheckIn?: string;
  dataCheckOut?: string;
}

const statusConfig: Record<StatusQuarto, { bgStatus: string; textoCor: string; icone: keyof typeof Ionicons.glyphMap }> = {
  'Disponível': { bgStatus: '#E2FAD4', textoCor: '#1E4620', icone: 'checkmark-circle' },
  'Limpeza': { bgStatus: '#FAFAD2', textoCor: '#525210', icone: 'sparkles' },
  'Ocupado': { bgStatus: '#FFD3D3', textoCor: '#611A1A', icone: 'people' },
  'Reservado': { bgStatus: '#E8E7FF', textoCor: '#2C2673', icone: 'calendar' }
};

const formatarDataCard = (dataString?: string) => {
  if (!dataString) return '';
  const partes = dataString.split('-');
  if (partes.length !== 3) return dataString;
  return `${partes[2]}/${partes[1]}`; 
};

export default function CardQuarto({ nome, status, onPress, disabled }: CardQuartoProps) {
  const statusValido = (statusConfig[status as StatusQuarto] ? status : 'Disponível') as StatusQuarto;
  const config = statusConfig[statusValido];

  return (
    <TouchableOpacity style={styles.cardQuarto} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        <View style={{ flex: 1 }}>
          <Text style={styles.textoNomeQuarto}>{nome}</Text>
        </View>
        
        <View style={[styles.badgeStatus, { backgroundColor: config.bgStatus }]}>
          <Ionicons name={config.icone} size={18} color={config.textoCor} style={{ marginRight: 6 }} />
          <Text style={[styles.textoStatus, { color: config.textoCor }]}>{statusValido}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}