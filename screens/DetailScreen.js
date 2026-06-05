import { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params || {};
  const [stok, setStok] = useState(item?.stok || 0);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Data tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>ID Barang</Text>
        <Text style={styles.value}>{item.id}</Text>

        <Text style={styles.label}>Nama Barang</Text>
        <Text style={styles.value}>{item.namaBarang}</Text>

        <Text style={styles.label}>Kategori</Text>
        <Text style={styles.value}>{item.kategori}</Text>

        <Text style={styles.label}>Lokasi Rak</Text>
        <Text style={styles.value}>{item.lokasiRak}</Text>

        <Text style={styles.label}>Stok Saat Ini</Text>
        <View style={styles.stokRow}>
          <TouchableOpacity style={styles.stokBtn} onPress={() => setStok(p => (p > 0 ? p - 1 : 0))}>
            <Text style={styles.stokBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.stokValue, stok < 5 && styles.stokKrits]}>{stok} unit</Text>
          <TouchableOpacity style={styles.stokBtn} onPress={() => setStok(p => p + 1)}>
            <Text style={styles.stokBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {stok < 5 && (
          <View style={styles.warning}>
            <Text style={styles.warningText}> ! Peringatan: Stok hampir habis!</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Kembali ke Daftar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: Platform.OS === 'android' ? 25 : 0, padding: 16 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 12, marginBottom: 4 },
  value: { fontSize: 18, fontWeight: '600', color: '#222' },
  stokRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  stokBtn: { backgroundColor: '#2c3e50', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  stokBtnText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  stokValue: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, minWidth: 60, textAlign: 'center' },
  stokKritis: { color: '#B91C1C' },
  warning: { backgroundColor: '#FEE2E2', padding: 12, borderRadius: 8, marginTop: 16, borderWidth: 1, borderColor: '#EF4444' },
  warningText: { color: '#B91C1C', fontWeight: 'bold', textAlign: 'center' },
  backBtn: { backgroundColor: '#2c3e50', padding: 14, borderRadius: 8, alignItems: 'center' },
  backText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});