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
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Materias</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.headerNombre]}>Nombre</Text>
          <Text style={[styles.headerText, styles.headerProfesor]}>Profesor</Text>
        </View>
        <FlatList
          data={materias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowNombre]} numberOfLines={1} ellipsizeMode="tail">{item.nombre}</Text>
              <Text style={[styles.rowText, styles.rowProfesor]} numberOfLines={1} ellipsizeMode="tail">{item.profesor}</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Color del texto
  },
  table: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007bff', // Azul
    padding: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerNombre: {
    width: 150, // Ancho fijo para la columna Nombre
  },
  headerProfesor: {
    width: 150, // Ancho fijo para la columna Profesor
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowText: {
    textAlign: 'center',
    flexShrink: 1, // Permite que el texto se ajuste y trunque si es necesario
  },
  rowNombre: {
    width: 150, // Ancho fijo para la columna Nombre
  },
  rowProfesor: {
    width: 150, // Ancho fijo para la columna Profesor
  },
});
