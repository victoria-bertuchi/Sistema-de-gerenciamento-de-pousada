import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="telaCadastro"/>
      <Stack.Screen name="telaInicial"/>
    </Stack>
  );
}