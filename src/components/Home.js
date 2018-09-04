import React from 'react'
import './styles.css'
import main from '../img/Fon.jpg'
import 'bootstrap3/dist/css/bootstrap.css'
import fondo from '../img/fondoMobile.jpg'


const IndexPage = () => (
<div className="container-fluid">
<img src={fondo} className="theFondo" />
    <div className="container">
      <h1 className="heading1">
        RESERVA TU TURNO
      </h1>
      <img id="mainChange" src={main} alt="baile" />
      <img id="fondoMobile" src={fondo} alt="Baile Mobile" />
    </div>
</div>
)

export default IndexPage
