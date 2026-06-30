import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Ahmad Ibrahim' }} />
        <Stack.Screen name="audits/index" options={{ title: 'Field Audits' }} />
        <Stack.Screen name="audits/[id]" options={{ title: 'Audit Checklist' }} />
      </Stack>
    </>
  );
}
