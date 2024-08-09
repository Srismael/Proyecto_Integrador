import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function Home({ navigation }: any) {
  return (
    <ImageBackground 
      source={{ uri: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/421574324_865301878936990_868039623401406851_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Pb9dMuemsMIQ7kNvgH2HUQR&_nc_ht=scontent-qro1-2.xx&oh=00_AYDtkC5AURaGTTMWHb1eTO2-L8BKqGxYVoMkmm5lkB5a_g&oe=66B8D267' }} 
      style={styles.container}
    >
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Usuarios')}>
        <Text style={styles.buttonText}>Ver Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Materias')}>
        <Text style={styles.buttonText}>Ver Materias</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AsistenciaUsuarios')}>
        <Text style={styles.buttonText}>Ver Asistencia Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CrearAsistencia')}>
        <Text style={styles.buttonText}>Crear Asistencia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InsertAsistencia')}>
        <Text style={styles.buttonText}>Insertar Asistencia</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // El estilo `container` se aplicará a la imagen de fondo
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff', // Color del texto
  },
  button: {
    backgroundColor: '#007bff', // Azul
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
