import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
//El archivo App.js en una aplicación de React Native con Expo
//  tiene la función de definir el componente principal de la aplicación. 
// Es el punto de entrada donde se estructura la interfaz y se gestionan los estilos.
import Campobase from './componentes/CampobaseComponent';
//importar el componente SafeAreaProvider 
//se usa para gestionar el área segura de la pantalla del dispositivo,  
// no solape con áreas como la barra de estado
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
export default function App() {
  return (//devuelve el contenido que se va a renderizar en la interfaz de usuario.

    // SafeAreaProvider, envuelve el contenido de la aplicacion para gestionar areas seguras
    //se asegura que el contenido no quede cubierto por la barra de estado
    //View, estructura la interfaz de usuario

    // Campo base, es un componente que se mostrara en pantalla las diferentes excursiones

    //Status bar, componente que controla la apariencia de la barra de estado, ajusta elcolor
    // de la barra de estado en funcion del fondo
    //
    <SafeAreaProvider>
      <View>
        <Campobase/> 
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}
