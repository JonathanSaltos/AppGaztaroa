import React, { Component } from 'react'; // Importa React y su clase base Component para poder crear componentes de clase.
import { Text, ScrollView, View } from 'react-native'; // Importa componentes nativos de React Native:
//Text para mostrar texto.
//ScrollView para permitir desplazamiento vertical.
//View para crear contenedores.
import { Card } from '@rneui/themed'; //Importa el componente Card del paquete @rneui/themed (parte de React Native Elements), 
// para mostrar contenido como una tarjeta.
import { EXCURSIONES } from '../comun/excursiones';//Importa tres conjuntos de datos desde archivos externos:
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem(props) { // componente funcional, recibe props

    const item = props.item; // extrae item de props
    if (item != null) { // si no es null
        return (
            // devuelve una tarjeta card con el nombre, imagen fija, descripción del item
            <Card>
                <View style={{ position: 'relative' }}>
                    <Card.Image
                        source={require('./imagenes/40Años.png')}
                        style={{ height: 200 }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: 10,
                            left: 0,
                            right: 0,
                            alignItems: 'center', // centra horizontalmente el texto
                            padding: 5,
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{ color: 'chocolate', fontSize: 40, fontWeight: 'bold', textAlign: 'center', }}
                        >
                            {item.nombre}
                        </Text>
                    </View>
                </View>

                <Text style={{ margin: 20 }}>{item.descripcion}</Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component { // componente Home que hereda de Component

    constructor(props) { // construcutor, recibe props
        super(props);
        this.state = { // e inicializa el estado
            excursiones: EXCURSIONES,
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES
        };
    }

    render() { // devuelve lo que se va a renderizar

        return (
            // muestra un scrollview desplazable que contiene
            //tarjeta para cabecera
            //tarjeta para excursion 
            //tarjeta para actividad
            // para cada caso se filtra el array del estado para marcar el primer elemento destacado
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default Home;