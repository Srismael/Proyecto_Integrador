import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/app/(tabs)/login';
import Home from '@/app/(tabs)/home';


const Stack = createNativeStackNavigator();

function MyStack() {
  return (
   <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen 
    name='Login'
    component={Login}

    />
     <Stack.Screen 
    name='Home'
    component={Home}
    
    />

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