import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

// Definición de la interfaz
interface Materia {
  id: number;
  nombre: string;
  profesor: string;
}

export default function Materias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        // Reemplaza 'localhost' con la IP actual si estás ejecutando en un dispositivo móvil
        const response = await fetch('http://localhost:5000/materias');
        
        // Verifica si la respuesta es correcta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Materia[] = await response.json();
        console.log('Fetched data:', data); // Registro de los datos obtenidos
        setMaterias(data);
      } catch (error) {
        console.error('Error fetching materias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Materias</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre</Text>
          <Text style={styles.headerText}>Profesor</Text>
        </View>
        <FlatList
          data={materias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{item.nombre}</Text>
              <Text style={styles.rowText}>{item.profesor}</Text>
            </View>
          )}
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
});
