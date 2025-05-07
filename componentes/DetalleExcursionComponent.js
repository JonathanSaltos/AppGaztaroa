// Componente funcional, muestra una tarjeta con los detalles de la excursion si la hubiera
// pasa la excursion a RenderExcursion
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Modal, Button, Pressable } from 'react-native';
// importa componentes tipo Text para mostrar texto en pantalla
// y View contenedor para esructurar la interfaz
import { Card, Icon, Input } from '@rneui/themed';// importa componente card para mostrar informacion dentro de una tarjeta,  e iconos con estilo.
//import { EXCURSIONES } from '../comun/excursiones';//Importa una lista de excursiones desde un archivo externo.
//import { COMENTARIOS } from '../comun/comentarios';//Importa una lista de comentarios desde un archivo externo.
import { ListItem } from '@rneui/base';

import { LogBox } from 'react-native';
import { baseUrl } from '../comun/comun';
import { colorGaztaroaClaro } from '../comun/comun';
import { colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
// Ignorar advertencia de VirtualizedList dentro de ScrollView
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // texto exacto o parcial del warning
]);
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings'; // estrellas formulario


const mapStateToProps = state => {
  return {
    actividades: state.actividades,
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor,
    comentario))
})


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
          <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
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

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>

          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />

          {/* Icono para acceder al formulario */}
          <Icon
            raised
            reverse
            name={'pencil'}
            type='font-awesome'
            color='#0000ff'
            onPress={() => props.onPressAddComentary()}
          />

        </View>
      </Card>
    );
  }
  else {
    return (<View></View>);// si no esta no muestra nada, un view vacio
  }
}

function RenderComentario(props) {//Renderiza una tarjeta con los comentarios relacionados a la excursión.
  const comentarios = props.comentarios;
  const renderCommentarioItem = ({ item, index }) => {
    return (
      <ListItem
        // key={index}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.comentario}</ListItem.Title>
          <ListItem.Subtitle>{item.valoracion}</ListItem.Subtitle>
          <ListItem.Subtitle>-- {item.autor}, {item.dia}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

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


class DetalleExcursion extends Component {// define el componente DetalleExcursion, 
  //constructor(props) {
  // super(props);
  // this.state = { // inicializa el estado con excursiones,comentarios,favoritos
  //excursiones: EXCURSIONES, //En el state, guarda la lista de excursiones (EXCURSIONES).
  //comentarios: COMENTARIOS,
  // favoritos: [],
  // };
  //}

  constructor(props) {
    super(props);
    this.state = { //DATOS DEL FORMULARIO EN EL ESTADO
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    }
  }



  marcarFavorito(excursionId) {
    //this.setState({ favoritos: this.state.favoritos.concat(excursionId) }); //AÑADE excursion a la lista favoritos
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal }); // sigue en estado
  }

  // gestionarComentario(excursionId, valoracion, autor, comentario) {
  gestionarComentario(excursionId) {
    console.log(this.state.valoracion, this.state.autor, this.state.comentario);
    this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario); // en ActionReducers recibe 4 params, a traves de Maps...
    //this.toggleModal(); //alterno apertura y cierre modal
    this.resetForm();
  }

  resetForm() { // resetear el formulario
    this.setState({
      valoracion: 3,
      autor: '',
      comentario: '',
      dia: '',
      showModal: false
    });
  }





  render() {
    const { excursionId } = this.props.route.params; //Extrae excursionId desde this.props.route.params
    //  (parámetro pasado desde la navegación).
    return (
      <>
        <ScrollView>
          {/*añade boton para volver al calendario */}
          <View style={{ margin: 10 }}>
            <Button
              title="Volver Calendario"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <RenderExcursion
            //excursion={this.state.excursiones[+excursionId]}
            excursion={this.props.excursiones.excursiones[+excursionId]} // viene de redux
            //favorita={this.state.favoritos.some(el => el === excursionId)}
            favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
            onPress={() => this.marcarFavorito(excursionId)}
            onPressAddComentary={() => this.toggleModal()}
          // toggleModal={() => { this.toggleModal() }}
          //showModal={this.state.showModal}

          />


          <RenderComentario
            //comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
            comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
          />
        </ScrollView>

        <Modal // MODAL PARA EL FORMULARIO, recomendable sacarlo fuera del scrolview
          animationType="slide" // Define el tipo de animación que se usará cuando el modal se muestre o se oculte.
          transparent={false} // Define si el fondo del modal será transparente o no
          visible={this.state.showModal}
          onDismiss={() => {
            this.toggleModal();
            this.resetForm();
          }}
          onRequestClose={() => { this.toggleModal(); this.resetForm(); }} // Este evento se dispara cuando se intenta cerrar el modal, por ejemplo, presionando el botón de atrás en un dispositivo Android
        >

          <View style={styles.modal}>
            <Rating style={styles.rating} //estrellas
              showRating // Muestra el texto de la calificación.
              startingValue={5}
              onFinishRating={rating => { this.setState({ valoracion: rating }) }}
            //  Actualiza el estado valoracion con el valor seleccionado.
            />
            <Input
              placeholder="  Autor"
              leftIcon={{ type: 'font-awesome', name: 'user' }} // Icono a la izquierda del campo -USUARIO
              onChangeText={value => this.setState({ autor: value })}
            />
            <Input
              placeholder="  Comentario"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={value => this.setState({ comentario: value })}
            />
            <View style={styles.enviarContent}>
              <Button
                color={colorGaztaroaOscuro}
                title="ENVIAR"
                onPress={() => {
                  this.gestionarComentario(excursionId);
                  this.resetForm();
                }}

              // gestion del comentario y reseteo del formulario
              />
              <View style={styles.cancelarContent} />
              {/* separa envio de cancelar */}
              <Button
                color={colorGaztaroaClaro}
                title="CANCELAR"
                onPress={() => { this.toggleModal(); this.resetForm() }} /// Cancelo envio y reseteo del formulario
              />
            </View>

          </View>
        </Modal>
      </>



    );//Pasa la excursión a RenderExcursion, que se encargará de mostrarla.
    /// muestra los comentarios relacinados con renderComentario
  }
}

const styles = StyleSheet.create({ // hoja de estilos para iconos


  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50
  },
  rating: {
    paddingVertical: 10
  },
  enviarContent: {
    flexDirection: 'column',//row
    justifyContent: 'center'
    // alignItems: 'center',
  },
  cancelarContent: {
    height: 10 //width
  }

});

//export default DetalleExcursion;
//export default connect(mapStateToProps)(DetalleExcursion);
export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
