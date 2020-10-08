import React from 'react';
import { Navbar } from '../../components';
import Background from '../../components/header/4.png';
import './Header.css';



function Header() {
    return(
        <section className="header">
          <section className="header-top">
            <section className="header-top__logo">
            <img className="header-logo-image" src={ Background } alt="Lintu" />
            </section>
            <section className="header-top__navbar">
              <section className="header-top__navigation">
                <Navbar />
              </section>
              <hr className="header-top__seperator" />
            </section>
          </section>
        </section>
      )
}

export default Header;