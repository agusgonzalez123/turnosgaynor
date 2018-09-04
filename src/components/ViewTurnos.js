import React from 'react'
import * as firebase from 'firebase'
import bailarina from '../img/imagen2.png'
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css'
import 'bootstrap3/dist/css/bootstrap.css'

function setMessage(succes) {
  return {
    setMessage: succes,
  }
}

  function setSuccessMsg(success) {
    return {
      sendMessageSuccess: success
    }
  }

class viewTurnos extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      turnos: [],
      historial: '',
      historialConsultas:[],
      setMessage: null,
      sendMessageSuccess: null
    }
  }

  componentWillMount(){
    const rootRef = firebase.database().ref().child('Gaynor Minden');
    const dayRef = rootRef.child('Turnos');
    const consultasRef = rootRef.child('Consultas');
    dayRef.on('value', snap => {
      let turnos = snap.val();
      let newState = [];
      for(let turno in turnos){
        newState.push({
          id: turno,
          Dia: turnos[turno].Dia,
          Hora: turnos[turno].Hora,
          Nombre: turnos[turno].Nombre,
          Mail: turnos[turno].Mail,
          Consulta: turnos[turno].Consulta,
          Telefono: turnos[turno].Telefono
        })
      }
      this.setState({
        turnos: newState
      })
    })
    consultasRef.on('value', snap => {
      let consultas = snap.val();
      let newS = [];
      for(let consulta in consultas){
        newS.push({
          id: consulta,
          Historial: consultas[consulta].Historial
        })
      }
      this.setState({
        historialConsultas: newS
      })
    })
  }

  removeTurno(turnoId) {
    const rootRefe = firebase.database().ref().child('Gaynor Minden');
    const dayRefe = rootRefe.child(`Turnos/${turnoId}`);
    dayRefe.remove();
    this.setState(setMessage('  Eliminado correctamente.'))
  }

  removeConsulta(historialId) {
    const rootRefes = firebase.database().ref().child('Gaynor Minden');
    const dayRefes = rootRefes.child(`Consultas/${historialId}`);
    dayRefes.remove();
    this.setState(setMessage('  Eliminado correctamente.'))
  }

  addHistorial(e){
    e.preventDefault();
    const rootRefer = firebase.database().ref().child('Gaynor Minden');
    const dayRefer = rootRefer.child(`Consultas/`);
    const historial = { Historial: this.state.historial}
    dayRefer.push(historial)
    this.setState({
      historial: ''
    })
    this.setState(setSuccessMsg('  Producto agregado.'))
  }

  async handleHistorial(e){
    await this.setState({
      historial: e.target.value
    })
  }

  handlePrint(el) {
    let restorepage = document.body.innerHTML;
    let printcontent = document.getElementsByClassName("verTurnosContainer").innerHTML;
    restorepage = printcontent;
    window.print();
  }

  render() {
    return (
      <div className="container-fluid">
      <form onSubmit={this.addHistorial.bind(this)} >
        <h1 className="heading1" >TURNOS RESERVADOS</h1>
        <div className="row turnos-view">
          <div className="col-md-4 centered">
            <img id="bailarina2" src={bailarina} alt="Bailarina" />
            {
              this.state.setMessage &&
              <div className="alert alert-danger" role="alert">
              <p className="link"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>  Eliminado correctamente.</p>
              <span className="sr-only">Success:</span>
              </div>
            }
            {
              this.state.sendMessageSuccess &&
              <div className="alert alert-success" role="alert">
                <p className="link"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>  Producto agregado.</p>
                <span className="sr-only">Success:</span>
              </div>
            }
          </div>
          <div className="col-md-8">
            <div className="displayTurnos">
              <div className="row vistaTurnos ">
                <div className="historial" >
                  <h5 className="colorPink">HISTORIAL DE TURNOS</h5>
                </div>
                <button className="botonCuchi marginBottom" onClick={() => this.handlePrint()}> Imprimir </button>
                <div className="col-md-6 columnsa-flex verTurnosContainer">
                  <ul className="displayFlex">
                    {this.state.turnos.map( turno => {
                      return (
                        <li key={turno.id}>
                          <div className="moverTurno">
                            <div >
                                <span className="glyphicon glyphicon-play"></span> <b>{turno.Nombre}</b> el dia <b>{turno.Dia}</b> a las<b>{turno.Hora}</b> Mail:<b>{turno.Mail}</b> Consulta: <b>{turno.Consulta}</b> Telefono: <b> {turno.Telefono} </b> <button className="botonCuchi" onClick={()=>this.removeTurno(turno.id)}>x</button>
                            </div>
                          </div>
                        </li>
                      )
                    } )}
                  </ul>
                </div>
                <h5 className="colorPink">CONSULTAS</h5>
                  <div className="col-md-6 columnsa-flex verTurnosContainer">
                  <ul className="displayFlex">
                    <div clasName="col-md-4">
                      {this.state.turnos.map(turno => {
                        return (
                          <div className="turno-wrapper">
                            <li key={turno.id} className="space">
                              <span className="glyphicon glyphicon-play"></span>
                              <b>{turno.Nombre}</b>
                            </li>
                          </div>
                        )
                      })}
                    </div>
                    <div className="col-md-4">
                      {this.state.historialConsultas.map(historial => {
                        return (
                          <div className="consultas-wrapper" >
                            <li key={historial.id}>
                              {historial.Historial}
                              <button className="botonCuchi" onClick={()=>this.removeConsulta(historial.id)}>x</button>
                            </li>
                          </div>
                        )
                      })}
                    </div>
                    <div className="col-md-4">
                      {this.state.turnos.map(turno => {
                        return(
                          <div className="consultas-input-wrapper" >
                            <li key={turno.id + 1} className="spaceInput">
                              <input className="inputConsulta" type="text" placeholder={turno.Nombre} onChange={this.handleHistorial.bind(this)} />
                              <button className="botonCuchi" type="Submit">+</button>
                            </li>
                          </div>
                        )
                      })}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
    )
  }
}

export default viewTurnos
