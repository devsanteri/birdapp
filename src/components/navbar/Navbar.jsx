import React from 'react';
import Table from '../table';

import './Navbar.css';



class Navbar extends React.Component {

    constructor(props) {
        super(props);
		this.state = {
          modalIsOpen: false,
          }
          this.handleClick = this.handleClick.bind(this);
          }


handleClick(event) {  // switch the value of the showModal state
  this.setState({
    modalIsOpen: !this.state.modalIsOpen
  });
}
getComponent() {
  if (this.state.modalIsOpen) {  // show the modal if state showModal is true
    return <Table />;
  } else {
    return null;
  }
}


  render() {
    return (

    <section className="navbar">
        <Table />
        <a href="/about" className="navbar-item">TOP WATCHER</a>
    </section>
    )
}};


export default Navbar;