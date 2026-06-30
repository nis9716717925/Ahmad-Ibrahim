import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ahmad Ibrahim</Text>
      <Text style={styles.subtitle}>Field audits · GPS check-in · Mobile operations</Text>

      <View style={styles.grid}>
        <Link href="/audits" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Today's Visits</Text>
            <Text style={styles.cardDesc}>Scheduled audits, GPS check-in, offline checklist</Text>
          </Pressable>
        </Link>
        <Link href="/audits" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Field Audits</Text>
            <Text style={styles.cardDesc}>Photos, notes, submit audit, AI assistant</Text>
          </Pressable>
        </Link>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>Academy</Text>
          <Text style={styles.cardDesc}>Courses and certificates</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 48 },
  title: { fontSize: 28, fontWeight: '700', color: '#0f172a' },
  subtitle: { marginTop: 8, fontSize: 16, color: '#64748b' },
  grid: { marginTop: 32, gap: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  cardDesc: { marginTop: 4, fontSize: 14, color: '#64748b' },
});
