//El archivo App.js en una aplicación de React Native con Expo
// tiene la función de definir el componente principal de la aplicación. 
// Es el punto de entrada donde se estructura la interfaz y se gestionan los estilos.
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
]);
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';  // Campo base,Importa el componente principal de la aplicación,
// que gestiona la navegación entre excursiones.

//importar el componente SafeAreaProvider 
//se usa para gestionar el área segura de la pantalla del dispositivo,  
// no solape con áreas como la barra de estado
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return(//devuelve el contenido que se va a renderizar en la interfaz de usuario.

    // SafeAreaProvider, envuelve el contenido de la aplicacion para gestionar areas seguras
    //se asegura que el contenido no quede cubierto por la barra de estado
    //View, estructura la interfaz de usuario

    //Status bar, componente que controla la apariencia de la barra de estado, ajusta elcolor
    // de la barra de estado en funcion del fondo
     //Renderiza el componente principal de la aplicación, CampoBase
     // que maneja las excursiones y la navegación.


  <SafeAreaProvider>
    <View style={styles.container}>
      <Campobase/> 
      <StatusBar style="auto" />
    </View>
  </SafeAreaProvider>
  );
}
//Define los estilos de la vista principal (View):
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
