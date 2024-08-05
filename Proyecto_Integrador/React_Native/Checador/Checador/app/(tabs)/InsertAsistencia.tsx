// InsertAsistencia.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

interface Usuario {
  id: number;
  nombre: string;
}

interface Asistencia {
    id: number;
    fecha: string;
    horaEntrada: string;
    horaSalida: string;
  }
  

export default function InsertAsistencia({ navigation }: { navigation: any }) {
  const [usuario, setUsuario] = useState<string>('');
  const [asistencia, setAsistencia] = useState<string>('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [asistenciaStatus, setAsistenciaStatus] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al obtener la lista de usuarios.');
      });

    axios.get('http://127.0.0.1:5000/asistencia')
      .then(response => {
        setAsistencias(response.data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al obtener la lista de asistencias.');
      });
  }, []);

  const handleInsertAsistencia = () => {
    const asistenciaData = { id_Usuario: usuario, id_Asistencia: asistencia, asistencia: asistenciaStatus };
    axios.post('http://127.0.0.1:5000/insert_asistencia', asistenciaData)
      .then(response => {
        Alert.alert(
          'Éxito',
          'La asistencia se ha insertado correctamente.',
          [
            { text: 'OK', onPress: () => navigation.navigate('Home') }
          ]
        );
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al insertar la asistencia.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Insertar Asistencia</Text>
      <View style={styles.inputContainer}>
        <Text>Usuario:</Text>
        <Picker
          selectedValue={usuario}
          onValueChange={(itemValue) => setUsuario(itemValue as string)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar usuario" value={null} />
          {usuarios.map(usuario => (
            <Picker.Item key={usuario.id} label={`${usuario.nombre}`} value={usuario.id} />
          ))}
        </Picker>
        <Text>Asistencia:</Text>
        <Picker
          selectedValue={asistencia}
          onValueChange={(itemValue) => setAsistencia(itemValue as string)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar asistencia" value={null} />
          {asistencias.map(asistencia => (
            <Picker.Item key={asistencia.id} label={`${asistencia.fecha} - ${asistencia.horaEntrada} - ${asistencia.horaSalida}`}
            value={asistencia.id} 
            />
          ))}
        </Picker>
        <Text>Status de Asistencia:</Text>
        <Picker
          selectedValue={asistenciaStatus}
          onValueChange={(itemValue) => setAsistenciaStatus(itemValue as boolean)}
          style={styles.picker}
        >
          <Picker.Item label="Asistió" value={true} />
          <Picker.Item label="No asistió" value={false} />
        </Picker>
      </View>
      <Button 
        title="Insertar Asistencia" 
        onPress={handleInsertAsistencia} 
        color="#1E90FF"
      />
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
  inputContainer: {
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
  },
});
