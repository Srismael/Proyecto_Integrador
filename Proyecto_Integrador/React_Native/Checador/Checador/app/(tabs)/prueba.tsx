import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';



interface Aire {
  _id: string;
  Tipo: string;
  Prioridad: string;
  ID_AIRE: string;
}

export default function Analisis({ navigation }: { navigation: any }) {
  const [data, setData] = useState<Aire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza 'your-local-ip' con la IP de tu máquina local
    axios.get('http://172.31.98.84:3000/aires')
      .then(response => {
        setData(response.data);
        setLoading(false);
        console.log(data);
        
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleFirstButtonPress = () => {
    navigation.navigate("home");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ANALISIS</Text>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ANALISIS</Text>
      <View style={styles.form}></View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Tipo de Gas</Text>
          <Text style={styles.headerText}>Prioridad</Text>
          <Text style={styles.headerText}>ID_AIRE</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{item.Tipo}</Text>
              <Text style={styles.rowText}>{item.Prioridad}</Text>
              <Text style={styles.rowText}>{item.ID_AIRE}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={handleFirstButtonPress}
          color="#1E90FF"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F4F7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  table: {
    flex: 1,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});