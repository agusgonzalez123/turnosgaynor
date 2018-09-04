import React, {Component} from 'react'
import bailarina3 from '../img/fondoMobile.jpg'

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


class Contacto extends Component {

  constructor(props){
    super(props);
    this.state = {
      sendMessage: null,
      sendMessageSuccess: null
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState(setSuccessMsg('Turno solicitado correctamente.'))
  }


  render (){
    return (
      <div className="container" >
        <h2 className="heading1 centered mensaje" >Contacto</h2>
        <div className="row turnos">
          <div className="col-sm-6">
            <form action="https://formspree.io/info@puntasballet.com" method="POST" className="form-horizontal contactoMessage">
              <div className="form-group">
              <h2 className="heading5"> ¡Escribe tu mensaje! </h2>
                <div className="col-sm-10">
                  <input type="email" className="form-control" name="Correo" id="inputEmail3" placeholder="Email" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10">
                  <input type="text" className="form-control" name="Consulta" placeholder="Asunto" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10">
                  <textarea className="form-control" name="Mensaje" placeholder="Mensaje" rows="3"></textarea>
                </div>
              </div>
              <div className="form-group row centered">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn col-sm-6 btnPink" onSubmit={this.handleSubmit.bind(this)}>Enviar</button>
                </div>
              </div>
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
                  <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                  <span className="sr-only">Success:</span>
                  <p className="link">Mensaje solicitado correctamente</p>
                </div>
              }
              </form>
            </div>
            <div className="col-sm-6 centered">
              <div className="containerContacto">
                <div className="">
                  <img src={bailarina3} id="bailarina3" alt="bailarina3" />
                </div>
                <div className="" >
                  <h3 className="heading3">Marcela Schiliro</h3>
                </div>
                <div className="">
                  <p className="textoContacto" > Cel: (0054911) 4938-8240 </p>
                  <p className="textoContacto" > Email: puntasballet@hotmail.com </p>
                  <p className="textoContacto" > puntasballet1@gmail.com </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Contacto
