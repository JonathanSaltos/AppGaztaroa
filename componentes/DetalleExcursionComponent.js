// Componente funcional, muestra una tarjeta con los detalles de la excursion si la hubiera
// pasa la excursion a RenderExcursion
import React, { Component } from 'react';
import { Text, View } from 'react-native';// importa componentes tipo Text para mostrar texto en pantalla
// y View contenedor para esructurar la interfaz
import { Card } from '@rneui/themed';// importa componente card para mostrar informacion dentro de una tarjeta
import { EXCURSIONES } from '../comun/excursiones';//Importa una lista de excursiones desde un archivo externo.

function RenderExcursion(props) {// define la funcion RnderExcursion, componente funcional
    //recibe el objeto props con toda la informacion de la excursion.

    const excursion = props.excursion;//extrae la excursion
    
        if (excursion != null) {// comprueba si el objeto excursion, esta vacio
            return(// devuelve un componente card, el cual servira como contenedor para los datos
                // muestra el nombre, linea divisoria, imagen, descripcion de la excursion
            <Card>
              <Card.Title>{excursion.nombre}</Card.Title>
              <Card.Divider/>
              <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
            </Card>
            );
        }
        else {
            return(<View></View>);// si no esta no muestra nada, un view vacio
        }
}

class DetalleExcursion extends Component {// define el componente DetalleExcursion, 
        constructor(props) {
            super(props);
            this.state = {
                excursiones: EXCURSIONES //En el state, guarda la lista de excursiones (EXCURSIONES).
            };
        }
      
        render(){
            const {excursionId} = this.props.route.params; //Extrae excursionId desde this.props.route.params
            //  (parámetro pasado desde la navegación).
            return(<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);//Pasa la excursión a RenderExcursion, que se encargará de mostrarla.
        }
}

export default DetalleExcursion;