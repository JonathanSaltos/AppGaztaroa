import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//El archivo App.js en una aplicación de React Native con Expo
//  tiene la función de definir el componente principal de la aplicación. 
// Es el punto de entrada donde se estructura la interfaz y se gestionan los estilos.

//El archivo package.json 
// definE las dependencias, scripts y configuración del proyecto. 
//nombre:appgaztaroajavascript
//Archivo principal de la aplicación index.js
export default function App() {
  return (//devuelve el contenido que se va a renderizar en la interfaz de usuario.
    //devuelve el componente view, que es un contenedor para otros componentes
    <View style={styles.container}>
      <Text>Bienvenido a la asignatura DESPLIEGUE DE SERVICIOS MULTIMEDIA</Text>
      <StatusBar style="auto" />
    </View>
  );
}
//define estilo para los componentes de la interfaz de usuario
//el estilo se aplica a un contenedoR
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7dd8bd', // color del fondo 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
