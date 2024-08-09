import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';

type Usuario = {
  id: number;
  nombre: string;
  apellido_Paterno: string;
  apellido_Materno: string;
  email: string;
  contrasena: string;
  matricula: string;
  uid: string;
  id_rol: number;
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Usuarios</Text>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.headerNombre]}>Nombre</Text>
          <Text style={[styles.headerText, styles.headerApellido]}>Apellido Paterno</Text>
          <Text style={[styles.headerText, styles.headerApellido]}>Apellido Materno</Text>
          <Text style={[styles.headerText, styles.headerEmail]}>Email</Text>
        </View>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowNombre]} numberOfLines={1} ellipsizeMode="tail">{item.nombre}</Text>
              <Text style={[styles.rowText, styles.rowApellido]} numberOfLines={1} ellipsizeMode="tail">{item.apellido_Paterno}</Text>
              <Text style={[styles.rowText, styles.rowApellido]} numberOfLines={1} ellipsizeMode="tail">{item.apellido_Materno}</Text>
              <Text style={[styles.rowText, styles.rowEmail]} numberOfLines={1} ellipsizeMode="tail">{item.email}</Text>
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
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007bff', // Azul
    padding: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerNombre: {
    width: 80, // Ancho fijo para la columna Nombre
  },
  headerApellido: {
    width: 100, // Ancho fijo para las columnas Apellido
  },
  headerEmail: {
    width: 150, // Ancho fijo para la columna Email
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
    width: 80, // Ancho fijo para la columna Nombre
  },
  rowApellido: {
    width: 100, // Ancho fijo para las columnas Apellido
  },
  rowEmail: {
    width: 150, // Ancho fijo para la columna Email
  },
});
