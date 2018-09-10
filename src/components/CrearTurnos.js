import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as firebase from 'firebase'
import bailarina from '../img/imagen2.png';
import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'
import 'bootstrap3/dist/css/bootstrap.css'

  function setSuccessMsg(success) {
    return {
      sendMessageSuccess: success
    }
  }

class crearTurno extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      hora: [],
      sendMessage: null,
      sendMessageSuccess: null
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  async handleHour(e){
    let hora = this.state.hora
    let valueHoras = e.target.value;
    await hora.push(valueHoras);
  }

  handleSubmit(e){
    e.preventDefault();
  const rootRef = firebase.database().ref().child('Gaynor Minden');
  const dayRef = rootRef.child('Disponibles');
  const turno = {
    Dia: this.state.startDate.format('DD-MM-YYYY'),
    Hora: this.state.hora
  }
  this.setState(setSuccessMsg('Turno creado correctamente.'))
  //Enviar turnos
  dayRef.push(turno);
  this.callRender();
}

callRender(){
  this.setState({
    hora: []
  })
}

  render(){
    return (
      <div className="container-fluid">
      <form onSubmit={this.handleSubmit.bind(this)} >
        <h1 className="heading1" >CREAR TURNO</h1>
        <div className="row turnos">
          <div className="col-md-6 centered">
            <img id="bailarina2" src={bailarina} alt="Bailarina" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 margin-bottom ">
                <h3 className="colorPink" >FECHA <span className="glyphicon glyphicon-calendar"></span> </h3>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange.bind(this)}
                  dateFormat="DD-MM-YYYY"
                  className="datepickerSir"
                />
              </div>
              <div className="col-md-6">
              <h3 className="colorPink" >HORA <span className="glyphicon glyphicon-hourglass"></span></h3>
              <div className="select">
                <select multiple className="multiselect" onChange={this.handleHour.bind(this)}>
                  <option></option>
                  <option value="08:00">08:00</option>
                  <option value="08:30">08:30</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
              </div>
              <div className="botones" id="botonesTurnosCrear">
                <button value="cancel" className="btn btnTurnos" >Cancelar</button>
                <button type="Submit" value="Enviar" className="btn btnTurnosSend">Solicitar</button>
              </div>
                {
                  this.state.sendMessageSuccess &&
                  <div className="alert alert-success" role="alert">
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    <span className="sr-only">Success:</span>
                    <p className="link">Turno solicitado correctamente</p>
                  </div>
                }
            </div>
          </div>
        </div>
      </form>
      </div>
    )
  }

}

export default crearTurno;
