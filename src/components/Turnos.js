import React from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'
import bailarina from '../img/imagen2.png'
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css'
import 'bootstrap3/dist/css/bootstrap.css'

function setErrorMsg(error) {
  return {
    sendMessage: error,
  }
}

  function setSuccessMsg(success) {
    return {
      sendMessageSuccess: success
    }
  }

class Turnos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: '',
      hora: '',
      horaId: '',
      horas: [],
      fechas: [],
      fechaSeleccionada: '',
      horaSeleccionada: '',
      horasNew: [],
      name: '',
      mail:'',
      consulta:'',
      telefono: '',
      sendMessage: null,
      sendMessageSuccess: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(disponiblesId){
    const rootsRef = firebase.database().ref().child('Gaynor Minden');
    const daysRef = rootsRef.child('Disponibles');
    daysRef.on('value', snap => {
      let fechas = snap.val();
      let newState = [];
      for(let fecha in fechas){
        newState.push({
          id: fecha,
          Dia: fechas[fecha].Dia
        })
      }
      this.setState({
        fechas: newState
        })
    })
  }

  async handleDate(e) {
    let select = e.target;

    this.handleChange(select.selectedOptions[0].dataset.id);

    await this.setState({
      startDate: select.value
    })
  }

  async handleHour(e){
    await this.setState({
      hora: e.target.value
    })
  }

  async deleteHora(horaId){
    console.log(horaId)
    await this.setState({
      horaId
    })
  }

  async handleName(e){
    await this.setState({
      name: e.target.value
    })
  }

  async handleMail(e){
    await this.setState({
      mail: e.target.value
    })
  }

  async handleConsulta(e){
    await this.setState({
      consulta: e.target.value
    })
  }

  async handleTelefono(e){
    await this.setState({
      telefono: e.target.value
    })
  }

  async handleSubmit(e){
  let fechaSeleccionada = this.state.fechaSeleccionada;
  let horaId = this.state.horaId;
  const rootsRefsa = firebase.database().ref().child('Gaynor Minden');
  const daysRefsa = rootsRefsa.child(`Disponibles/${fechaSeleccionada}/Hora/${horaId}`);
  const rootRefs = firebase.database().ref().child('Gaynor Minden');
  const dayRefs = rootRefs.child('Turnos');
  const turno = {
    Dia: this.state.startDate,
    Hora: this.state.hora,
    Nombre: this.state.name,
    Mail: this.state.mail,
    Consulta: this.state.consulta,
    Telefono: this.state.telefono
  }
  // Tengo que revisar por que razon es que no borra
  daysRefsa.remove();
  alert('Turno solicitado correctamente. ¡No olvides traer tus punteras! Dirección: Santa Fe 1229 Piso 2C, CABA. Por favor seleccionar el cuadro de confirmación!');
  //Generar el Mensaje de confirmacion
  this.setState(setSuccessMsg('Turno solicitado correctamente.'))
  //Enviar turnos
  await this.state.hora === '' ? alert('Hora no seleccionada') : dayRefs.push(turno);
}

async handleChange(fechaId) {
  const rootsRefa = firebase.database().ref().child('Gaynor Minden');
  const daysRefa = rootsRefa.child(`Disponibles/${fechaId}`);
  let fechaSeleccionada = fechaId;
  await this.setState({
    fechaSeleccionada
  })
  daysRefa.on('value', snap => {
    let horas = snap.val();
    let newState = [];
    this.setState({
      horasNew: []
    })
    if(horas.Hora === undefined) {
      alert('No hay turnos disponibles');
    } else {
      if(horas.Hora.length < 1){
        alert('No hay turnos disponibles');
      }else {
        let eachHour = horas.Hora
        Object.values(eachHour).map( ho => {
          return newState.push(ho);
        })
      }
    }
    this.setState({
      horasNew: newState
    })
  })
}

  render() {

    return (
      <div className="container-fluid">
      <form action="https://formspree.io/robertcelt95@gmail.com" onSubmit={this.handleSubmit.bind(this)} method="POST">
        <div className="row turnos">
          <div className="col-md-6 centered">
            <img id="bailarina2" src={bailarina} alt="Bailarina" />
            {
                  this.state.sendMessage &&
                  <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                  </div>
                }
                {
                  this.state.sendMessageSuccess &&
                  <div className="alert alert-success" role="alert">
                    <span className="sr-only">Success:</span>
                    <p className="link"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Turno solicitado correctamente. ¡No olvides traer tus punteras! Dirección: Santa Fe 1229 Piso 2C, CABA</p>
                  </div>
                }
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 margin-bottom ">
                <h3 className="colorPink" >FECHA <span className="glyphicon glyphicon-calendar"></span></h3>
                <select className="selectSir" name="Fecha " onChange={this.handleDate.bind(this)} >
                  {this.state.fechas.map( (fecha, index) => {
                        return (
                          <option key={index} value={fecha.Dia} data-id={fecha.id} >
                            {fecha.Dia}
                          </option>
                        )
                      } )}
                </select>
              </div>
              <div className="col-md-6">
              <h3 className="colorPink" >HORA <span className="glyphicon glyphicon-hourglass"></span></h3>
              <div className="select">
                <select className="selectSir" name="Hora " onChange={this.handleHour.bind(this)}>
                  {this.state.horasNew.map( (hora, index)=> {
                    return (
                      <option key={index} value={hora} onClick={() => this.deleteHora(index)}>
                        {hora}
                      </option>
                    )
                  })}
                </select>
              </div>
              </div>
              <div className="nombre" >
                <input type="text" name="Nombre y Apellido" placeholder="*Nombre y Apellido" onChange={this.handleName.bind(this)} className="form-control username-input"  required/>
              </div>
              <div className="nombre" >
                <input type="text" name="Telefono" placeholder="*Telefono" onChange={this.handleTelefono.bind(this)} className="form-control mail username-input" required />
              </div>
              <div className="nombre" >
                <input type="text" name="Mail" placeholder="*Mail" onChange={this.handleMail.bind(this)} className="form-control username-input mail" required />
              </div>
              <div className="nombre" >
              <input type="text" name="Consulta" placeholder="*Consulta" onChange={this.handleConsulta.bind(this)} className="form-control username-input" required />
              </div>
              <div className="botones" >
                <button value="cancel" className="btn btnTurnos" id="botonesTurnos" >Cancelar</button>
                <input type="submit" value="Solicitar" className="btn btnTurnosSend" id="subir" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

export default Turnos
