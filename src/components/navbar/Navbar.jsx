import React from 'react';

import './Navbar.css';

function Navbar () {

    return(
        <section className="navbar">
        <a href="/" className="navbar-item">HOME</a>
        <a href="/about" className="navbar-item">LIST</a>
        <a href="/adminlogin" className="navbar-item">LOGIN</a>
    </section>
    )
}

export default Navbar;