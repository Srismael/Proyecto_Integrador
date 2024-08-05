import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';

interface AsistenciaUsuario {
  fecha: string;
  horaEntrada: string;
  horaSalida: string;
  nombre: string;
  apellido_Paterno: string;
  apellido_Materno: string;
  asistencia: boolean;
  uid: string;
}

export default function Asistencia({ navigation }: { navigation: any }) {
  const [data, setData] = useState<AsistenciaUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    axios.get('http://127.0.0.1:5000/asistenciausuarios')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFirstButtonPress = () => {
    navigation.navigate("home");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ASISTENCIA</Text>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ASISTENCIA</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={() => {
          setLoading(true);
          setError(null);
          fetchData();
        }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ASISTENCIA</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {['Fecha', 'Hora Entrada', 'Hora Salida', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Asistencia', 'uid'].map((header) => (
            <Text style={styles.headerText} key={header}>{header}</Text>
          ))}
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.fecha + item.horaEntrada}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{item.fecha}</Text>
              <Text style={styles.rowText}>{item.horaEntrada}</Text>
              <Text style={styles.rowText}>{item.horaSalida}</Text>
              <Text style={styles.rowText}>{item.nombre}</Text>
              <Text style={styles.rowText}>{item.apellido_Paterno}</Text>
              <Text style={styles.rowText}>{item.apellido_Materno}</Text>
              <Text style={styles.rowText}>{item.asistencia ? 'Sí' : 'No'}</Text>
              <Text style={styles.rowText}>{item.uid}</Text>
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
