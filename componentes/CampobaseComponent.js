//componente de React Native que configura la navegación entre dos pantallas 
// dentro de una aplicación móvil utilizando React Navigation. 
import React, { Component } from 'react';// importa react y la clase componente de react,Component se usa para definir componentes de clase en React.
import { EXCURSIONES } from '../comun/excursiones';
import Constants from 'expo-constants'; // Importa Constants desde Expo, lo que permite acceder a constantes del entorno
import Calendario from './CalendarioComponent';//importa el componente Calendario, para usarla en la navegacion
import DetalleExcursion from './DetalleExcursionComponent';// importa DetalleExcursion para usarla en la navegacion
import { Platform, View } from 'react-native';//Platform permite ejecutar código específico para iOS o Android.
//View es un contenedor que se usa para estructurar la interfaz.
import { NavigationContainer } from '@react-navigation/native';//es el contenedor que maneja la navegación.
import { createNativeStackNavigator } from '@react-navigation/native-stack';//crea una pila de navegación para moverse entre pantallas.
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
const Stack = createNativeStackNavigator();//Se crea una instancia del Stack Navigator, 
// que define la estructura de la navegación entre pantallas. Ir hacia adelante y volver hacia atras
//Componente calendarioNavegador

const Drawer = createDrawerNavigator(); // Menú lateral (desplegable).
//Se define el componente funcional CalendarioNavegador, 
// que maneja la navegación entre Calendario y DetalleExcursion
// //Se usará como pantalla dentro del Drawer

import QuienesSomos from './QuienesSomosComponent';
import Contact from './ContactoComponent';

function CalendarioNavegador() {
  return (
    <Stack.Navigator //configura el stack de navegación.
      initialRouteName="Calendario" //define que la primera pantalla será Calendar.
      headerMode="float"
      screenOptions={{ //personaliza el estilo de los encabezados de las pantallas.
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Calendario"//Agrega una pantalla llamada Calendar, que renderiza el componente Calendario
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


//Componente funcional HomeNavegador
//Maneja la navegación en pila solo para la pantalla principal (Home).
//Se integra en el Drawer como otra sección del menú.
function HomeNavegador() {
  return (
<Stack.Navigator
    initialRouteName="Home"
    screenOptions={{

     // headerMode: 'screen',
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#015afc' },
      headerTitleStyle: { color: '#fff' },
    }}
  > 
  <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Campo Base',
      }}
    />
  </Stack.Navigator>
  );
}

//Componente funcional ContactNavegador
//Maneja la navegación en pila solo para la pantalla Contacto
//Se integra en el Drawer como otra sección del menú.

function ContactNavegador() {

  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      screenOptions={{
        title: 'Aligned Center',
        headerTitleAlign: 'center',
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >

      <Stack.Screen
        name="Contacto"
        component={Contact}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
 
  );
 
}

//Componente funcional QuienesSomosNavegador
//Maneja la navegación en pila solo para la pantalla QuienesSomos
//Se integra en el Drawer como otra sección del menú.
function QuienesSomosNavegador() {

  return (
    <Stack.Navigator
      initialRouteName="Quienes Somos"
      screenOptions={{
        title: 'Aligned Center',
        headerTitleAlign: 'center',
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
 

    >

      <Stack.Screen
        name="Quienes Somos" // este es el nombre que mira el drawer
        component={QuienesSomos}
        options={{
          title: 'QuienesSomos',
        }}
      />
    </Stack.Navigator>
  );
}



//Componente funcional DrawerNavegador
//Define el menú lateral (drawer) de la app.
//Contiene dos pantallas:
    //"Campo base" → HomeNavegador
    //"Calendario" → CalendarioNavegador
function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#c2d3da',
        },
      }}
    >
      <Drawer.Screen name="Campo base" component={HomeNavegador} />
      <Drawer.Screen name="Quienes Somos" component={QuienesSomosNavegador} />
      <Drawer.Screen name="Calendario" component={CalendarioNavegador} />
      <Drawer.Screen name="Contacto" component={ContactNavegador} />
    </Drawer.Navigator>
  );
}


//componente principal de la app.
class Campobase extends Component {// define componente de clase llamado Campobase que extiende de react component
  render() {// metodo render obligatorio en un componente de clase react, define que debe renderizar
    // el componente en la interfaz de usuario
    return (//envuelve la navegación de la aplicación - avigationContainer (obligatorio para usar navegación).
      //View es un contenedor que ocupa todo el espacio disponible (flex:1).
      //ajusta la interfaz para evitar que la barra de estado se superponga en Android.
      //se renderiza Renderiza el DrawerNavegador.
      <NavigationContainer> 
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}> 
          <DrawerNavegador /> 
        </View> 
          </NavigationContainer>
      
    );
  }
}

export default Campobase;