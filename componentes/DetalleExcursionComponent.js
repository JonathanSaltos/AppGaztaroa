// Componente funcional, muestra una tarjeta con los detalles de la excursion si la hubiera
// pasa la excursion a RenderExcursion
import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';// importa componentes tipo Text para mostrar texto en pantalla
// y View contenedor para esructurar la interfaz
import { Card, Icon } from '@rneui/themed';// importa componente card para mostrar informacion dentro de una tarjeta,  e iconos con estilo.
import { EXCURSIONES } from '../comun/excursiones';//Importa una lista de excursiones desde un archivo externo.
import { COMENTARIOS } from '../comun/comentarios';//Importa una lista de comentarios desde un archivo externo.
import { LogBox } from 'react-native';
import { Button } from 'react-native';
import { baseUrl } from '../comun/comun';
import { colorGaztaroaClaro } from '../comun/comun';
import { colorGaztaroaOscuro } from '../comun/comun';
// Ignorar advertencia de VirtualizedList dentro de ScrollView
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // texto exacto o parcial del warning
]);


function RenderComentario(props) {//Renderiza una tarjeta con los comentarios relacionados a la excursión.
  const comentarios = props.comentarios;
  const renderCommentarioItem = ({ item, index }) => {
    return (

      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'- - ' + item.autor + ', ' + item.dia} </Text>
      </View>
    );
  };


  return (
//Utiliza FlatList para mostrar los comentarios en una lista optimizada
//Cada comentario muestra el texto, valoración y autor con fecha.
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios}
        renderItem={renderCommentarioItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

function RenderExcursion(props) {// define la funcion RnderExcursion, componente funcional
  //recibe el objeto props con toda la informacion de la excursion.

  const excursion = props.excursion;//extrae la excursion
  //<Card.Title>{excursion.nombre}</Card.Title>
  if (excursion != null) {// comprueba si el objeto excursion, esta vacio
    return (// devuelve un componente card, el cual servira como contenedor para los datos
      // muestra el nombre, linea divisoria, imagen, descripcion de la excursion, un icono de corazon para mostrar como 
      //favorita, Si ya es favorita, se muestra un heart; si no, un heart-o
      <Card>
        <View style={{ position: 'relative' }}>
          {/*<Card.Image source={require('./imagenes/40Años.png')} style={{ height: 200 }}>*/}
          <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
          <View
            style={{
              position: 'absolute',
              top: 40,
              left: 0,
              right: 0,
              alignItems: 'center',
              padding: 35,
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: colorGaztaroaClaro,
                fontSize: 35,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {excursion.nombre}
            </Text>
          </View>
        </View>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
        <Icon
          raised
          reverse
          name={props.favorita ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
        />
      </Card>
    );
  }
  else {
    return (<View></View>);// si no esta no muestra nada, un view vacio
  }
}

class DetalleExcursion extends Component {// define el componente DetalleExcursion, 
  constructor(props) {
    super(props); 
    this.state = { // inicializa el estado con excursiones,comentarios,favoritos
      excursiones: EXCURSIONES, //En el state, guarda la lista de excursiones (EXCURSIONES).
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) }); //AÑADE excursion a la lista favoritos
  }

  render() {
    const { excursionId } = this.props.route.params; //Extrae excursionId desde this.props.route.params
    //  (parámetro pasado desde la navegación).
    return (
      <ScrollView>
       {/*añade boton para volver al calendario */}
        <View style={{ margin: 10 }}>
          <Button
            title="Volver Calendario"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <RenderExcursion
          excursion={this.state.excursiones[+excursionId]}
          favorita={this.state.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
      </ScrollView>
    );//Pasa la excursión a RenderExcursion, que se encargará de mostrarla.
    /// muestra los comentarios relacinados con renderComentario
  }
}

export default DetalleExcursion;