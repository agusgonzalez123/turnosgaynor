import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import {Redirect} from 'react-router-dom'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {


    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Registrarse</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" className="form-control" placeholder="Contraseña" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn ingresar">Registrarse</button>
        </form>
      </div>
    )
  }
}

export default Register;
