import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';

const DATA_GUDANG = [
  { id: '1', namaBarang: 'Pallet Kayu', kategori: 'Peralatan', stok: 15, lokasiRak: 'A-01' },
  { id: '2', namaBarang: 'Box Kardus', kategori: 'Kemasan', stok: 50, lokasiRak: 'B-02' },
  { id: '3', namaBarang: 'Strap Plastik', kategori: 'Peralatan', stok: 30, lokasiRak: 'C-03' },
  { id: '4', namaBarang: 'Bubble Wrap', kategori: 'Kemasan', stok: 100, lokasiRak: 'D-04' },
  { id: '5', namaBarang: 'Forklift', kategori: 'Peralatan', stok: 5, lokasiRak: 'E-05' },
  { id: '6', namaBarang: 'Pallet Plastik', kategori: 'Peralatan', stok: 20, lokasiRak: 'F-06' },
  { id: '7', namaBarang: 'Box Kayu', kategori: 'Kemasan', stok: 40, lokasiRak: 'G-07' },
  { id: '8', namaBarang: 'Hand Pallet', kategori: 'Peralatan', stok: 25, lokasiRak: 'H-08' },
  { id: '9', namaBarang: 'Bubble Wrap Besar', kategori: 'Kemasan', stok: 80, lokasiRak: 'I-09' },
  { id: '10', namaBarang: 'Pallet Logam', kategori: 'Peralatan', stok: 10, lokasiRak: 'J-10' },
];

export default function HomeScreen({ navigation }) {
    const [cari,setCari] = useState('');
    const [barcode, setBarcode] = useState('');
    const dataFilter = DATA_GUDANG.filter(item => item.namaBarang.toLowerCase().includes(cari.toLowerCase()));

    const handleBarcode= () => {
      const item = DATA_GUDANG.find(i => i.id === barcode);
      if (item) navigation.navigate('Detail', {item});
      else Alert.alert('Error','Barcode tidak ditemukan');
        setBarcode('');
    };

    return (
    <SafeAreaView style={styles.container}>
        <TextInput
        style={styles.search}
        placeholder="Cari barang..."
        value={cari}
        onChangeText={setCari}
        />

        <View style= {styles.barcodeRow}>
          <TextInput
          style= {styles.barcodeInput}
          placeholder="ID Barcode (1-10)"
          value={barcode}
          onChangeText= {setBarcode}
          keyboardType="numeric"
          />
          <TouchableOpacity style={styles.barcodeBtn} onPress={handleBarcode}>
            <Text style= {styles.barcodeBtnText}>Scan</Text>
          </TouchableOpacity>
        </View>

      <FlatList
        data={dataFilter}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { item })}>
            <Text style={styles.nama}>{item.namaBarang}</Text>
            <Text style={styles.detail}>Stok: {item.stok} | Rak: {item.lokasiRak}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.kosong}>Tidak Ada Barang yang Ditemukan</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: Platform.OS === 'android' ? 25 : 0 },
  search: { backgroundColor:'white', padding:12,margin: 16, margin: 16, marginBottom: 8,borderRadius: 10,fontSize: 16 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginHorizontal: 16, marginBottom: 12, shadowColor:'#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }, 
  
  nama: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  detail: { fontSize: 14, color: '#666', marginTop: 4 },
  kosong: {textAlign: 'center', marginTop:20, color:'#999'},
  
  barcodeRow: {flexDirection:'row', marginHorizontal: 16, marginBottom:8, gap:10},
  barcodeInput: {backgroundColor: 'white', padding:12, borderRadius:10, flex:2, fontSize:16},
  barcodeBtn: {backgroundColor:'27ae60', padding: 12, borderRadius: 10, alignItems:'center', justifyContent:'center', flex:1},
  barcodeBtnText: {color: 'Red', fontWeight: 'bold', fontSize:16},
});
