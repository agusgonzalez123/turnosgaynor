import React from 'react'
import facebook from '../img/facebook.png'

const Footer = () => {
  return (
    <div className="container containerFooter">
      <div className="row">
        <div className="col-sm-8">
          <h5 className="footerTextCopy" >COPYRIGHT 2018</h5>
        </div>
        <div className="col-sm-2 facebook">
        <a href="https://www.facebook.com/Representante-Exclusiva-de-Gaynor-Minden-Argentina-301508063351829/?hc_ref=ARQwsGSouSzqQUqfQxfjcwqrSywIlXE77ZSMCa2wfR10dZf-wDcD4FPwr5BhH-0Y5O8&fref=nf" > <img src={facebook} className="facebook" alt="facebook" /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer
