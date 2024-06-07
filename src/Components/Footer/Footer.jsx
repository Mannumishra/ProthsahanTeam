import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto fixed-bottom">
      {/* <div style={{position:"absolute" ,right:10 ,bottom:100 ,cursor:"pointer"}}>
      <img src="./image/whatsapp-fill.png" alt="" style={{height:50}} />
      </div> */}
      <div className="container-fluid px-4">
        <div className="text-muted" style={{ textAlign: "center" }}>
        2024 © Prothsahan Team brought to you by <Link  to={'https://www.digiindiasolutions.com/'} > Digi India Solution</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

