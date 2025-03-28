import React, { Component } from 'react';// importa react y la clase componente de react
import Calendario from './CalendarioComponent';
//importa el componente Calendario, el cual se va a renderizar ()mostrar dentro de Campobase component
// importa el array de objetos EXCURSIONES, el cual contiene el listado de excursiones, id,nombre,
//detalle
import { EXCURSIONES } from '../comun/excursiones';

class Campobase extends Component { // define componente de clase llamado Campobase que extiende de react component
    // inicializamos el estado del componente
    constructor(props) { //recibe propiedades como argumento pasados por el padre
        super(props);
        this.state = {
            excursiones: EXCURSIONES // inicializa el estado del componente con la lista de excursiones a mostrar
        };
    }

    render() { // metodo render obligatorio en un componente de clase react, define que debe renderizar
                // el componente en la interfaz de usuario
        return (
            // devolvera el componente calendario pasandole como propiedad la lista de excursiones
            // y las mostrara 
            <Calendario excursiones={this.state.excursiones} />

        );
    }
}

export default Campobase;