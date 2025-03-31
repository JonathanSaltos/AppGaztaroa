import React, { Component } from 'react';// importa react y la clase componente de react
import Calendario from './CalendarioComponent';
//importa el componente Calendario, el cual se va a renderizar ()mostrar dentro de Campobase component
// importa el array de objetos EXCURSIONES, el cual contiene el listado de excursiones, id,nombre,
//detalle
import { EXCURSIONES } from '../comun/excursiones';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
class Campobase extends Component { // define componente de clase llamado Campobase que extiende de react component
    // inicializamos el estado del componente
    constructor(props) { //recibe propiedades como argumento pasados por el padre
        super(props);
        this.state = { // estado inicial
            excursiones: EXCURSIONES, // inicializa el estado del componente con la lista de excursiones a mostrar
            seleccionExcursion: null // permitira almacenar la excursion seleccionada por el usuario
            //  se actualizara cuando el usuario seleccione la excursion
        };



    }

    onSeleccionExcursion(excursionId) { // define un metodo dentro de la clase CampoBase, 
        // recibe el id de la excursion seleccionada
        this.setState({ seleccionExcursion: excursionId }) // actualiza el estado del componente
        //cambia SeleccionExcursion a id de la excursion seleccionada
    }


    render() { // metodo render obligatorio en un componente de clase react, define que debe renderizar
        // el componente en la interfaz de usuario
        // CALENDARIO Y DETALLEEXCURSION

        // Filtrado de lista de excursiones, devuelve un array con la excursion cuyo id coincida con 
        // Devuelve un array con la excursión cuyo id coincida con el seleccionado por el usuario
        // devuelve el primer elemento del array
        return (

            <View>
                <DetalleExcursion excursion={this.state.excursiones.filter((excursion) =>
                    excursion.id === this.state.seleccionExcursion)[0]} />
                    
                <Calendario excursiones={this.state.excursiones} onPress={(excursionId) =>
                    this.onSeleccionExcursion(excursionId)} />
            </View>

            // devolvera el componente calendario pasandole como propiedad la lista de excursiones
            // y las mostrara 
            // define funcion onPress que recibe la excursion id seleccionada por el usuario y 
            // actualiza el estado con esta seleccionada


        );
    }
}

export default Campobase;