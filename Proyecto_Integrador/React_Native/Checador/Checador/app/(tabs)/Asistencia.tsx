import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

interface Materia {
  id: number;
  nombre: string;
}

export default function CrearAsistencia({ navigation }: { navigation: any }) {
  const [fecha, setFecha] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [materia, setMateria] = useState<string>('');
  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/materias')
      .then(response => {
        setMaterias(response.data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al obtener la lista de materias.');
      });
  }, []);

  const handleCreateAsistencia = () => {
    const asistenciaData = { fecha, horaEntrada, horaSalida, materia_id: materia };
    axios.post('http://127.0.0.1:5000/crear_asistencia', asistenciaData)
      .then(response => {
        Alert.alert(
          'Éxito',
          'La asistencia se ha creado correctamente.',
          [
            { text: 'OK', onPress: () => navigation.navigate('AsistenciaUsuarios') }
          ]
        );
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al crear la asistencia.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear Asistencia</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput 
          style={styles.input} 
          value={fecha} 
          onChangeText={setFecha} 
          placeholder="YYYY-MM-DD" 
          keyboardType="numeric" 
        />
        <Text style={styles.label}>Hora de Entrada:</Text>
        <TextInput 
          style={styles.input} 
          value={horaEntrada} 
          onChangeText={setHoraEntrada} 
          placeholder="HH:MM" 
          keyboardType="numeric" 
        />
        <Text style={styles.label}>Hora de Salida:</Text>
        <TextInput 
          style={styles.input} 
          value={horaSalida} 
          onChangeText={setHoraSalida} 
          placeholder="HH:MM" 
          keyboardType="numeric" 
        />
        <Text style={styles.label}>Materia:</Text>
        <Picker
          selectedValue={materia}
          onValueChange={(itemValue) => setMateria(itemValue as string)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar materia" value={null} />
          {materias.map(materia => (
            <Picker.Item key={materia.id} label={materia.nombre} value={materia.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Crear Asistencia" 
          onPress={handleCreateAsistencia} 
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
