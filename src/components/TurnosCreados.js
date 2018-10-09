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

class TurnosCreados extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: '',
            fechaIdState: '',
            horaIdState: '',
            hora: '',
            horas: [],
            fechas: [],
            horasNew: [],
            name: '',
            mail: '',
            consulta: '',
            telefono: '',
            sendMessage: null,
            sendMessageSuccess: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(disponiblesId) {
        const rootsRef = firebase.database().ref().child('Gaynor Minden');
        const daysRef = rootsRef.child('Disponibles');
        daysRef.on('value', snap => {
            let fechas = snap.val();
            let newState = [];
            for (let fecha in fechas) {
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

    async handleHora(e) {
        let select = e.target;
        this.removeHora(select.selectedOptions[0].dataset.id);

        await this.setState({
            horaIdState: select.value
        })
    }

    async handleHour(e) {
        await this.setState({
            hora: e.target.value
        })
    }

    async handleName(e) {
        await this.setState({
            name: e.target.value
        })
    }

    async handleMail(e) {
        await this.setState({
            mail: e.target.value
        })
    }

    async handleConsulta(e) {
        await this.setState({
            consulta: e.target.value
        })
    }

    async handleTelefono(e) {
        await this.setState({
            telefono: e.target.value
        })
    }

    handleChange(fechaId) {
        const rootsRefa = firebase.database().ref().child('Gaynor Minden');
        const daysRefa = rootsRefa.child(`Disponibles/${fechaId}`);
        this.setState({fechaIdState: fechaId})
        daysRefa.on('value', snap => {
            let horas = snap.val();
            let newState = [];
            this.setState({
              horasNew: []
            })
            let eachHour = horas.Hora
            Object.values(eachHour).map( ho => {
              return newState.push(ho);
            })
            this.setState({
              horasNew: newState
            })   
          })
    }

    removeHora(horaId) {
        const fechaIdState = this.state.fechaIdState;
        const rootRefse = firebase.database().ref().child('Gaynor Minden');
        const dayDay = rootRefse.child(`Disponibles/${fechaIdState}`);
        const dayRefse = dayDay.child(`/Hora/${horaId}`);
        dayRefse.remove()
    }

    render() {

        return (
            <div className="container-fluid">
                <form>
                    <h1 className="heading1" >Eliminar Hora</h1>
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
                                    <p className="link"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Turno solicitado correctamente. ¡No olvides traer tus punteras!</p>
                                </div>
                            }
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6 margin-bottom ">
                                    <h3 className="colorPink" >FECHA <span className="glyphicon glyphicon-calendar"></span></h3>
                                    <select className="selectSir" onChange={this.handleDate.bind(this)} >
                                        {this.state.fechas.map((fecha, index) => {
                                            return (
                                                <option key={index} value={fecha.Dia} data-id={fecha.id} >
                                                    {fecha.Dia} 
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="colorPink" >HORA <span className="glyphicon glyphicon-hourglass"></span></h3>
                                      <div className="select">
                                        <select className="selectSir">
                                          {this.state.horasNew.map( (hora, index)=> {
                                            return (
                                              <option key={index} value={hora} onClick={() => this.removeHora(hora.Id)}>
                                                {hora}
                                              </option>
                                            )
                                          })}
                                        </select>
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

export default TurnosCreados
