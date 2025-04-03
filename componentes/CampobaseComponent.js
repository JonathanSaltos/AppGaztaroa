//componente de React Native que configura la navegación entre dos pantallas 
// dentro de una aplicación móvil utilizando React Navigation. 
import React, { Component } from 'react';// importa react y la clase componente de react,Component se usa para definir componentes de clase en React.
import Constants from 'expo-constants'; // Importa Constants desde Expo, lo que permite acceder a constantes del entorno
import Calendario from './CalendarioComponent';//importa el componente Calendario, para usarla en la navegacion
import DetalleExcursion from './DetalleExcursionComponent';// importa DetalleExcursion para usarla en la navegacion
import { Platform, View } from 'react-native';//Platform permite ejecutar código específico para iOS o Android.
//View es un contenedor que se usa para estructurar la interfaz.
import { NavigationContainer } from '@react-navigation/native';//es el contenedor que maneja la navegación.
import { createNativeStackNavigator } from '@react-navigation/native-stack';//crea una pila de navegación para moverse entre pantallas.

const Stack = createNativeStackNavigator();//Se crea una instancia del Stack Navigator, que define la estructura de la navegación entre pantallas.

//Componente calendarioNavegador
//Se define el componente funcional CalendarioNavegador, 
// que maneja la navegación entre las pantallas.
function CalendarioNavegador() {
  return (
    <Stack.Navigator //configura el stack de navegación.
      initialRouteName="Calendar" //define que la primera pantalla será Calendar.
      headerMode="float"
      screenOptions={{ //personaliza el estilo de los encabezados de las pantallas.
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen 
        name="Calendar"//Agrega una pantalla llamada Calendar, que renderiza el componente Calendario
        // cuando se accede a esta pantalla
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',//define el título en la barra de navegación.
        }}
      />
      <Stack.Screen //Agrega una segunda pantalla llamada DetalleExcursion, 
      // que renderiza el componente DetalleExcursion.
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',//define el título en la barra de navegación.
        }}
      />
    </Stack.Navigator>
  );
}
//componente principal de la app.
class Campobase extends Component {// define componente de clase llamado Campobase que extiende de react component
  render() {// metodo render obligatorio en un componente de clase react, define que debe renderizar
    // el componente en la interfaz de usuario
     return (//envuelve la navegación de la aplicación.
      //View es un contenedor que ocupa todo el espacio disponible (flex:1).
      //ajusta la interfaz para evitar que la barra de estado se superponga en Android.
      //se renderiza CalendarioNavegador, que maneja la navegación entre pantallas.
      <NavigationContainer>
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <CalendarioNavegador />
        </View>
      </NavigationContainer>      
  );
  }
}

export default Campobase;