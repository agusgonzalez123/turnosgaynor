import React, { Component } from 'react'
import { login, resetPassword} from '../helpers/auth'
import {Redirect} from 'react-router-dom';


  function setSuccessMsg(success) {
    return {
      loginMessageSuccess: success
    }
  }

class Login extends Component {
  state = { loginMessage: null, loginMessageSuccess: null, redirect: false }
  async handleSubmit(e) {
    e.preventDefault()
    login(this.email.value, this.pw.value)
    await this.setState({
      redirect: true
    })
    this.setState(setSuccessMsg('Ingreso correctamente.'))
  }
  render () {

    const {redirect} = this.state;

    if(redirect) {
      return <Redirect to='/turnos' />
    }

    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Ingresar </h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" className="form-control" placeholder="Contraseña" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          {
            this.state.loginMessageSuccess &&
            <div className="alert alert-success" role="alert">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              <span className="sr-only">Success:</span>
              <p className="link">Ingreso correctamente</p>
            </div>
          }
          <button type="submit" className="btn ingresar">Ingresar</button>
        </form>
      </div>
    )
  }
}

export default Login;
