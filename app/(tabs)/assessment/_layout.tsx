import { Stack } from 'expo-router';

export default function AssessmentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="preparation" />
      <Stack.Screen name="detection" />
      <Stack.Screen name="containment" />
      <Stack.Screen name="recovery" />
      <Stack.Screen name="communication" />
    </Stack>
  );
}