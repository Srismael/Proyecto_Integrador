import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Ver Usuarios"
        onPress={() => navigation.navigate('Usuarios')}
      />
      <Button
        title="Ver Materias"
        onPress={() => navigation.navigate('Materias')}
      />
      <Button
        title="Ver Asistencia Usuarios"
        onPress={() => navigation.navigate('AsistenciaUsuarios')}
      />
      <Button
        title="Crear Asistencia"
        onPress={() => navigation.navigate('CrearAsistencia')}
      />
       <Button
        title="Insertar Asistencia" // Nuevo botón
        onPress={() => navigation.navigate('InsertAsistencia')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
});
