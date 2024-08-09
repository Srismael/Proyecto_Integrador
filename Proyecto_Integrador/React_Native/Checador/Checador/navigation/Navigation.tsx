import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/app/(tabs)/login';
import Home from '@/app/(tabs)/home';
import Usuarios from '@/app/(tabs)/usuarios';
import Materias from '@/app/(tabs)/materias';
import AsistenciaUsuarios from '@/app/(tabs)/asistencia_usuarios';
import CrearAsistencia from '@/app/(tabs)/Asistencia';
import InsertAsistencia from '@/app/(tabs)/InsertAsistencia';
 

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen 
      name='Checanding'
      component={Login}
    />
    <Stack.Screen 
      name='Home'
      component={Home}
    />
    <Stack.Screen 
      name='Usuarios'
      component={Usuarios}
    />
    <Stack.Screen 
      name='Materias'
      component={Materias}
    />
    <Stack.Screen 
    name='AsistenciaUsuarios' 
    component={AsistenciaUsuarios} 
    />
    <Stack.Screen 
    name="CrearAsistencia" 
    component={CrearAsistencia} 
    />
    <Stack.Screen name="InsertAsistencia" component={InsertAsistencia} />
  </Stack.Navigator>
  
  );
}

export default function Navigation () {
    return (
    <NavigationContainer independent={true}>
        <MyStack />
    </NavigationContainer>

   

    )
}