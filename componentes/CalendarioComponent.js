// Componente calendario que muestra lista de excursiones con su imagen y detalle
import React, { Component } from 'react'; // importa react y la clase componente de react
import { ListItem, Avatar } from '@rneui/themed'; //Importa componentes ListItem y Avatar 
// Estos componentes son parte de una biblioteca de UI de React Native (React Native Elements)
// de libreria que proporciona componentes predefinidos y estilizados.
//ListItem se usa para mostrar cada elemento de la lista, y Avatar se usa para mostrar una imagen, 
// como un ícono o una foto, junto al nombre y la descripción de la excursión.
import { SafeAreaView, FlatList } from 'react-native';
//SafeAreaView asegura que el contenido no se solape 
// como la barra de estado o los bordes redondeados de los dispositivos.
//FlatList es un componente eficiente para renderizar listas de elementos 
//import { EXCURSIONES } from '../comun/excursiones';// importa el array de objetos EXCURSIONES, 
// el cual contiene el listado de excursiones, id,nombre,//detalle
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones
    }
  }


//clase Calendario, que extiende de Component.
class Calendario extends Component {
   // constructor(props) {//se inicializa el state con los datos de EXCURSIONES, 
        // permitiendo que el componente maneje su propio estado.
       // super(props);
       // this.state = {
        //    excursiones: EXCURSIONES
       // };
  //  }

    render() {

        const { navigate } = this.props.navigation;   // Se extrae navigate de this.props.navigation, 
        // permitiendo la navegación a otra pantalla cuando se selecciona una excursión.

        const renderCalendarioItem = ({ item, index }) => {// define una funcion que recibe
            // un objeto con los valores item - conjunto de datos, e index-indice de cada excursion, 
            //renderiza un listItem para cada excursion
            // funcion onPress, se ejecuta cuando el usuario pulsa una excursion, para el id 
            //  - ITEM img predeterminada
            //  - ListItem.contet, que contiene el nombre,descripcion
            //   <Avatar source={require('./imagenes/40Años.png')} />

            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider>
                    <Avatar source={{uri: baseUrl + item.imagen}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };
        //Renderización de la Lista
        // SafeArea, para que el contenido no se solape con areas sensibles de la pantalla
        // flatlist, con lista de excursiones recibidas,
        //renderizar cada elemento de la lista
        //Keyextractor que cada elemento tenga su clave unica, id convertida a cadena de texto
        return (
            <SafeAreaView>
                <FlatList
                   // data={this.state.excursiones}
                   data={this.props.excursiones.excursiones}
                    renderItem={renderCalendarioItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        );
    }
}

//export default Calendario;
export default connect(mapStateToProps)(Calendario);