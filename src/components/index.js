import React, { Component } from 'react'
import 'bootstrap3/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import IndexPage from './Home'
import Turnos from './Turnos'
import Contacto from './Contacto'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import logo from "../img/logo.jpg"
import Footer from './Footer'
import viewTurnos from './ViewTurnos'
import crearTurno from './CrearTurnos'
import TurnosCreados from './TurnosCreados';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

const config = {
  issuer: 'https://dev-889390.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '{0oag3yi8vpTFWxKXQ0h7}'
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authed: false,
      loading: true,
      clicked: false
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  changeState(e){
    e.preventDefault();
    const val = this.state.clicked
    if(val === false){
      this.setState({
        clicked: true
      })
    } else {
      this.setState({
        clicked: false
      })
    }
  }

  async displayNav(e){
    e.preventDefault();
    const val = this.state.clicked
    if(val === false){
      await this.setState({
        clicked: true
      })
    } else {
      this.setState({
        clicked: false
      })
    }
    const navbars = document.getElementById('bs-example-navbar-collapse-1');
    if(val === true){
      navbars.style.display = 'inline-block'
      this.setState({
        clicked: false
      })
    } else {
      navbars.style.display = 'none'
      this.setState({
        clicked: true
      })
    }
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div className="container-fluid containerHeader">
          <nav className="navbar navbar-default navbar-fluid navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed burgers" href="#bs-example-navbar-collapse-1" onClick={this.displayNav.bind(this)}  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                </button>
                <div className="navbar-brand logoN"><img src={logo} alt="logo" className="logoN" /></div>
                <Link to="/"  className="navbar-brand colors brr">Marcela Schiliro representante exclusiva de Gaynor Minden en Argentina</Link>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav pull-right">
                <li>
                  {this.state.authed
                    ? 
                    <div>
                      <Link to='/turnos-creados' className="navbar-brand colors"> Turnos Creados </Link>
                      <Link to="/turnos-hechos" className="navbar-brand colors"> Turnos Solicitados </Link>
                      <Link to="/crear-turno" className="navbar-brand colors"> Crear Turnos </Link>
                      <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand colors salir ">Salir</button>
                    </div>
                    : <span>
                        <Link to="/turnos" className="navbar-brand colors ">Turnos</Link>
                        <Link to="/contacto" className="navbar-brand colors">Contacto</Link>
                        <Link to="/login" className="navbar-brand colors ">Staff</Link>
                        <Link to="/register" className="navbar-brand colors ">Staffssss</Link>
                      </span>}
                </li>
              </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={IndexPage} />
                <Route authed={this.state.authed} path='/turnos' component={Turnos} />
                <Route authed={this.state.authed} path='/login' component={Login} />
                <Route authed={this.state.authed} path='/register' component={Register} />
                <Route authed={this.state.authed} path='/contacto' component={Contacto} />
                <PrivateRoute authed={this.state.authed} allowed={'admin'} path='/turnos-hechos' component={viewTurnos} />
                <PrivateRoute authed={this.state.authed} allowed={'admin'} path='/crear-turno' component={crearTurno} />
                <PrivateRoute authed={this.state.authed} allowed={'admin'} path='/turnos-creados' component={TurnosCreados} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
