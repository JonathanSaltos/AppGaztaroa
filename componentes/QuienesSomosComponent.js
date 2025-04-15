import React, { Component } from 'react'; //Se importan herramientas de React y React Native:
//Component: Para crear un componente de clase.
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';// Importar Componente de tarjeta para estructurar contenido
import { ACTIVIDADES } from '../comun/actividades';//  Importar actividades del grupo desde un archivo externo
import { FlatList } from 'react-native-gesture-handler'; //Lista optimizada para mostrar muchos elementos.
import { Avatar, ListItem } from 'react-native-elements'; //Componentes visuales de react-native-elements.
import { baseUrl } from '../comun/comun';

function RenderItem({ item = {} }) {// componente funcional que renderiza una actividad
    //Imagen fija, titulo, descripcion
    //<Avatar source={require('./imagenes/40Años.png')} />
    if (item != null) {
        return (
            // si no es null

            <ListItem bottomDivider>

                <Avatar source={{ uri: baseUrl + item.imagen }} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        );
    }


    else {
        return (<View></View>);
    }


}


function Historia() {// componente funcional Historia, que muestra la historia del grupo de montaña

    return (
        // Card para mostrar la informacion
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
            </Text>
            <Text style={{ margin: 20 }}>Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.</Text>
            <Text style={{ margin: 20 }}>Gracias!</Text>
        </Card>


    );


}

class QuienesSomos extends Component {// componente QuienesSomos que hereda de Component, componente de clase
    constructor(props) {
        super(props);
        this.state = {

            actividades: ACTIVIDADES//En el state, guarda la lista de actividades del archivo importado ACTIVIDADES


        };


    }


    render() {

        return (
            // muestra un scrollview para que todo el contenido se pueda desplazar verticalmente. 
            // desplazable que contiene el card con el componente historia del club y el otro card
            // Actividad y recursos", muestra una lista (FlatList) de actividades usando RenderItem.
            <ScrollView>
                <Historia />
                <Card>
                    <Card.Title>Actividad y recursos</Card.Title>
                    <Card.Divider />
                    <FlatList scrollEnabled={false}
                        data={this.state.actividades}
                        renderItem={RenderItem}
                        keyExtractor={item => item.id.toString()}
                    />

                </Card>
            </ScrollView>

        );
    }
}

export default QuienesSomos;