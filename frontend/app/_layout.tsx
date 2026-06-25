import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; 
import { useFonts, LeagueSpartan_400Regular, LeagueSpartan_700Bold } from '@expo-google-fonts/league-spartan';
import { Krub_400Regular, Krub_700Bold } from '@expo-google-fonts/krub';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    'LeagueSpartan-Regular': LeagueSpartan_400Regular,
    'LeagueSpartan-Bold': LeagueSpartan_700Bold,
    'Krub-Regular': Krub_400Regular,
    'Krub-Bold': Krub_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="telaCadastro"/>
      <Stack.Screen name="telaInicial"/>
      <Stack.Screen name="telaFuncionarios"/>
      <Stack.Screen name="telaCronograma"/>
      <Stack.Screen name="telaPerfil"/>
      <Stack.Screen name="telaMinhasTarefas"/>
    </Stack>
  );
}