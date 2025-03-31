// Componente calendario que muestra lista de excursiones con su imagen y detalle
import React from 'react';  //Importa React para poder usar JSX y definir componentes en React
import { ListItem, Avatar } from '@rneui/themed';//Importa componentes ListItem y Avatar 
//  Estos componentes son parte de una biblioteca de UI de React Native (React Native Elements)
// de libreria que proporciona componentes predefinidos y estilizados.
//ListItem se usa para mostrar cada elemento de la lista, y Avatar se usa para mostrar una imagen, 
// como un ícono o una foto, junto al nombre y la descripción de la excursión.
import { SafeAreaView, FlatList } from 'react-native';
//SafeAreaView asegura que el contenido no se solape 
// como la barra de estado o los bordes redondeados de los dispositivos.
//FlatList es un componente eficiente para renderizar listas de elementos 
function Calendario(props) { // Componente que recibe las propiedades de su componente padre, 
    // un listado de excursiones

    const renderCalendarioItem = ({ item, index }) => { // define una funcion que recibe
        // un objeto con los valores item - conjunto de datos, e index-indice de cada excursion, 
        //renderiza un listItem para cada excursion
        // funcion onPress, se ejecuta cuando el usuario pulsa una excursion, para el id 
        //  - ITEM img predeterminada
        //  - ListItem.contet, que contiene el nombre,descripcion
        return (<ListItem key={index} onPress={() => props.onPress(item.id)} bottomDivider>
            <Avatar source={require('./imagenes/40Años.png')} />
             
            <ListItem.Content>
                <ListItem.Title>{item.nombre}</ListItem.Title>
                <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>);
    };

    // SafeArea, para que el contenido no se solape con areas sensibles de la pantalla
    // flatlist, con lista de excursiones recibidas,
    //renderizar cada elemento de la lista
    //Keyextractor que cada elemento tenga su clave unica, id convertida a cadena de texto
    return (<SafeAreaView>
        <FlatList
            data={props.excursiones}
            renderItem={renderCalendarioItem}
            keyExtractor={item => item.id.toString()} />
    </SafeAreaView>

    );
}

export default Calendario;