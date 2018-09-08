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

class TurnosCreadosDos extends React.Component {
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

    handleChange(fechaId) {
        const rootsRefa = firebase.database().ref().child('Gaynor Minden');
        const daysRefa = rootsRefa.child(`Disponibles/${fechaId}`);
        daysRefa.remove();

    }

    render() {

        return (
            <div className="container-fluid">
                <form>
                    <h1 className="heading1" >Eliminar Dia</h1>
                    <div className="row turnos">
                        <div className="col-md-6 centered">
                            <img id="bailarina2" src={bailarina} alt="Bailarina" />
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6 margin-bottom ">
                                    <h3 className="colorPink" >FECHA <span className="glyphicon glyphicon-calendar"></span></h3>
                                    <select className="selectSir" >
                                        {this.state.fechas.map((fecha, index) => {
                                            return (
                                                <option key={index} value={fecha.Dia} data-id={fecha.id} onClick={() => this.handleChange(fecha.id)}>
                                                    {fecha.Dia} 
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="colorPink" >Seleccionar día a eliminar</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default TurnosCreadosDos
