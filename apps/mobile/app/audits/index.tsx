import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { Link } from 'expo-router';
import { mobileApi, setToken } from '../../lib/api';

export default function AuditsListScreen() {
  const [audits, setAudits] = useState<Awaited<ReturnType<typeof mobileApi.getAudits>>>([]);
  const [todayVisits, setTodayVisits] = useState<Awaited<ReturnType<typeof mobileApi.getAudits>>>([]);
  const [tab, setTab] = useState<'today' | 'all'>('today');
  const [email, setEmail] = useState('admin@connect.local');
  const [password, setPassword] = useState('Admin123!');
  const [loggedIn, setLoggedIn] = useState(false);

  async function login() {
    try {
      const res = await mobileApi.login(email, password);
      setToken(res.accessToken);
      setLoggedIn(true);
      loadAudits();
    } catch {
      Alert.alert('Login failed', 'Check credentials and API URL');
    }
  }

  function loadAudits() {
    mobileApi.getAudits().then(setAudits).catch(() => setAudits([]));
    mobileApi.getAudits(true).then(setTodayVisits).catch(() => setTodayVisits([]));
  }

  useEffect(() => {
    if (loggedIn) loadAudits();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <View style={styles.loginWrap}>
        <Text style={styles.title}>Auditor App</Text>
        <Text style={styles.loginSub}>Sign in for field audits & GPS check-in</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
        <Pressable style={styles.btn} onPress={login}>
          <Text style={styles.btnText}>Sign in</Text>
        </Pressable>
      </View>
    );
  }

  const list = tab === 'today' ? todayVisits : audits;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>{tab === 'today' ? "Today's Visits" : 'All Audits'}</Text>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, tab === 'today' && styles.tabActive]} onPress={() => setTab('today')}>
          <Text style={[styles.tabText, tab === 'today' && styles.tabTextActive]}>Today ({todayVisits.length})</Text>
        </Pressable>
        <Pressable style={[styles.tab, tab === 'all' && styles.tabActive]} onPress={() => setTab('all')}>
          <Text style={[styles.tabText, tab === 'all' && styles.tabTextActive]}>All ({audits.length})</Text>
        </Pressable>
      </View>

      {list.map((a) => (
        <Link key={a.id} href={`/audits/${a.id}`} asChild>
          <Pressable style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.ref}>{a.referenceNumber}</Text>
              {a.priority === 'HIGH' && <Text style={styles.priority}>HIGH</Text>}
            </View>
            <Text style={styles.cardTitle}>{a.serviceType?.name}</Text>
            <Text style={styles.cardSub}>{a.organization?.name}</Text>
            {a.scheduledTime && <Text style={styles.time}>🕒 {a.scheduledTime}</Text>}
            {a.siteLocation && <Text style={styles.location}>📍 {a.siteLocation}</Text>}
            <Text style={styles.status}>{a.status}</Text>
          </Pressable>
        </Link>
      ))}
      {list.length === 0 && (
        <Text style={styles.empty}>{tab === 'today' ? 'No visits scheduled for today' : 'No audits assigned'}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  loginWrap: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  loginSub: { color: '#64748b', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#1349e1', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  tabs: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tab: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  tabActive: { backgroundColor: '#1349e1', borderColor: '#1349e1' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  tabTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ref: { fontSize: 12, color: '#1349e1', fontWeight: '600' },
  priority: { fontSize: 10, fontWeight: '700', color: '#dc2626', backgroundColor: '#fee2e2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  cardSub: { fontSize: 13, color: '#64748b', marginTop: 4 },
  time: { fontSize: 12, color: '#64748b', marginTop: 4 },
  location: { fontSize: 12, color: '#64748b', marginTop: 2 },
  status: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#dbeafe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 12, overflow: 'hidden' },
  empty: { color: '#94a3b8', textAlign: 'center', marginTop: 32 },
});
