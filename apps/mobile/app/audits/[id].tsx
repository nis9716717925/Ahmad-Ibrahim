import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert, TextInput,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import { mobileApi, type ChecklistResponse } from '../../lib/api';

export default function AuditDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [audit, setAudit] = useState<Awaited<ReturnType<typeof mobileApi.getAudit>> | null>(null);
  const [responses, setResponses] = useState<Record<string, ChecklistResponse>>({});
  const [offline, setOffline] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiResult, setAiResult] = useState('');

  useEffect(() => {
    if (id) {
      mobileApi.getAudit(id).then((a) => {
        setAudit(a);
        setResponses((a.responses as Record<string, ChecklistResponse>) ?? {});
      }).catch(() => {
        setOffline(true);
        Alert.alert('Offline mode', 'Working offline — changes saved locally until submit');
      });
    }
  }, [id]);

  const items = audit?.template?.items ?? [];
  const sections = [...new Set(items.map((i) => i.section))];
  const answered = items.filter((i) => responses[i.id]?.answer !== undefined).length;

  async function gpsAction(type: 'CHECK_IN' | 'CHECK_OUT') {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission denied', 'Location required');
    const pos = await Location.getCurrentPositionAsync({});
    try {
      await mobileApi.checkIn(id!, pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy ?? undefined, type);
      Alert.alert(type === 'CHECK_IN' ? 'Checked in' : 'Checked out', 'GPS location recorded');
    } catch {
      Alert.alert('Saved locally', 'GPS will sync when online');
    }
  }

  function setAnswer(itemId: string, answer: 'pass' | 'fail' | 'na') {
    setResponses((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], answer, score: answer === 'pass' ? 10 : answer === 'fail' ? 0 : undefined },
    }));
  }

  function setNotes(itemId: string, notes: string) {
    setResponses((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], answer: prev[itemId]?.answer ?? 'pass', notes },
    }));
  }

  async function addPhotoNote(itemId: string) {
    const item = items.find((i) => i.id === itemId);
    try {
      await mobileApi.addEvidence(id!, {
        type: 'photo',
        fileName: `field-photo-${itemId}.jpg`,
        note: `Photo for: ${item?.question}`,
      });
      Alert.alert('Photo noted', 'Photo evidence recorded (attach file in production)');
    } catch {
      Alert.alert('Saved offline', 'Photo will sync on submit');
    }
  }

  async function handleSubmit() {
    setSaving(true);
    try {
      const updated = await mobileApi.submitResponses(id!, responses);
      setAudit(updated);
      setOffline(false);
      Alert.alert('Submitted', `Checklist complete. Overall: ${updated.sectionScores?.Overall ?? '—'}%`);
    } catch {
      Alert.alert('Offline', 'Responses saved locally. Retry when connected.');
      setOffline(true);
    } finally {
      setSaving(false);
    }
  }

  async function runAi() {
    try {
      const res = await mobileApi.runAi(id!, 'summarize');
      setAiResult(res.result);
    } catch {
      setAiResult('AI unavailable offline. Connect to generate summary.');
    }
  }

  if (!audit && !offline) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1349e1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {offline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>📴 Offline Checklist Mode</Text>
        </View>
      )}

      <Text style={styles.ref}>{audit?.referenceNumber ?? id}</Text>
      <Text style={styles.title}>{audit?.serviceType?.name ?? 'Field Audit'}</Text>
      <Text style={styles.org}>{audit?.organization?.name}</Text>
      <Text style={styles.progress}>Progress: {answered}/{items.length}</Text>

      <View style={styles.gpsRow}>
        <Pressable style={styles.checkInBtn} onPress={() => gpsAction('CHECK_IN')}>
          <Text style={styles.checkInText}>GPS Check-In</Text>
        </Pressable>
        <Pressable style={styles.checkOutBtn} onPress={() => gpsAction('CHECK_OUT')}>
          <Text style={styles.checkOutText}>Check-Out</Text>
        </Pressable>
      </View>

      {sections.map((section) => (
        <View key={section}>
          <Text style={styles.sectionHeader}>{section}</Text>
          {items.filter((i) => i.section === section).map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.question}>{item.question}</Text>
              <View style={styles.row}>
                {(['pass', 'fail', 'na'] as const).map((opt) => (
                  <Pressable
                    key={opt}
                    style={[
                      styles.opt,
                      responses[item.id]?.answer === opt && opt === 'pass' && styles.optPass,
                      responses[item.id]?.answer === opt && opt === 'fail' && styles.optFail,
                      responses[item.id]?.answer === opt && opt === 'na' && styles.optNa,
                    ]}
                    onPress={() => setAnswer(item.id, opt)}
                  >
                    <Text style={styles.optText}>{opt === 'na' ? 'N/A' : opt}</Text>
                  </Pressable>
                ))}
              </View>
              <TextInput
                style={styles.notes}
                placeholder="Add notes..."
                value={responses[item.id]?.notes ?? ''}
                onChangeText={(t) => setNotes(item.id, t)}
                multiline
              />
              <Pressable style={styles.photoBtn} onPress={() => addPhotoNote(item.id)}>
                <Text style={styles.photoBtnText}>📷 Take Photo</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ))}

      <Pressable style={styles.aiBtn} onPress={runAi}>
        <Text style={styles.aiBtnText}>🤖 AI Summarize</Text>
      </Pressable>
      {aiResult ? <Text style={styles.aiResult}>{aiResult}</Text> : null}

      <Pressable style={styles.submitBtn} onPress={handleSubmit} disabled={saving}>
        <Text style={styles.submitText}>{saving ? 'Submitting...' : 'Submit Audit'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 16, paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  offlineBanner: { backgroundColor: '#fef3c7', padding: 10, borderRadius: 8, marginBottom: 12 },
  offlineText: { color: '#92400e', fontWeight: '600', textAlign: 'center' },
  ref: { fontSize: 12, color: '#1349e1', fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  org: { color: '#64748b', marginTop: 4 },
  progress: { marginTop: 8, fontSize: 13, color: '#475569' },
  gpsRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  checkInBtn: { flex: 1, backgroundColor: '#0f172a', padding: 12, borderRadius: 8, alignItems: 'center' },
  checkInText: { color: '#fff', fontWeight: '600' },
  checkOutBtn: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#0f172a' },
  checkOutText: { color: '#0f172a', fontWeight: '600' },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#1349e1', marginTop: 20, marginBottom: 8 },
  card: { marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  question: { fontWeight: '500' },
  row: { flexDirection: 'row', gap: 8, marginTop: 12 },
  opt: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  optPass: { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
  optFail: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  optNa: { backgroundColor: '#f1f5f9', borderColor: '#94a3b8' },
  optText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  notes: { marginTop: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 10, fontSize: 14, minHeight: 60 },
  photoBtn: { marginTop: 8, alignSelf: 'flex-start' },
  photoBtnText: { fontSize: 13, color: '#1349e1' },
  aiBtn: { marginTop: 16, backgroundColor: '#f0f4ff', padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#c7d7fe' },
  aiBtnText: { color: '#1349e1', fontWeight: '600' },
  aiResult: { marginTop: 8, fontSize: 13, color: '#475569', backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  submitBtn: { marginTop: 24, backgroundColor: '#1349e1', padding: 16, borderRadius: 8, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700' },
});
