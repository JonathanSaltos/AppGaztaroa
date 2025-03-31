// Componente funcional, muestra una tarjeta con la excursion si la hubiera
// pasa la excursion a RenderExcursion
import React from 'react'; //Importa React necesario para usar componentes en react native
import { Text, View } from 'react-native';// importa componentes tipo Text para mostrar texto en pantalla
// y View contenedor para esructurar la interfaz
import { Card } from '@rneui/themed'; // importa componente card para mostrar informacion dentro de una tarjeta

function RenderExcursion(props) { // define la funcion RnderExcursion, componente funcional
  //recibe el objeto props con toda la informacion de la excursion.

    const excursion = props.excursion; //extrae la excursion
    
        if (excursion != null) { // comprueba si el objeto excursion, esta vacio
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
            return(<View></View>); // si no esta no muestra nada, un view vacio
        }
}

function DetalleExcursion(props) { // define el componente DetalleExcursion, 
  // toma la excursion de props y se la pasa a RenderExcursion
    return(<RenderExcursion excursion={props.excursion} />);
}

export default DetalleExcursion;
