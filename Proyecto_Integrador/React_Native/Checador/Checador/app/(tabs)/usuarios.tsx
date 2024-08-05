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
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre</Text>
          <Text style={styles.headerText}>Apellido Paterno</Text>
          <Text style={styles.headerText}>Apellido Materno</Text>
          <Text style={styles.headerText}>Email</Text>
        </View>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{item.nombre}</Text>
              <Text style={styles.rowText}>{item.apellido_Paterno}</Text>
              <Text style={styles.rowText}>{item.apellido_Materno}</Text>
              <Text style={styles.rowText}>{item.email}</Text>
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
