import React from 'react';
import axios from 'axios';
import Modal from "react-modal";

import './Table.css';

const ListPopup = {
  content : 
    {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(0, 0, 0)',
    background: '#808080',
    overflow: 'auto',
    borderRadius: '30px',
    outline: 'none',
    padding: '32px',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
    }
};

class Table extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {
			birds: []
		  }
    }
  
  openModal = () => {
      this.setState({
         modalIsOpen: true 
      });
    }
  
    closeModal = () => {
      this.setState({ 
        modalIsOpen: false 
      });
    }
  
  componentDidMount() {
    axios.get('/birds/getall')
      .then(res => {
        this.setState({
          ...this.state,
          birds: res.data.sort((a, b) => (new Date(b.date) - new Date(a.date)))
        }) 
      })
      .catch(err => console.error(err))
  }



  sortByIdAsc = () => {
    this.setState(prevState => {
      return {
        birds: this.state.birds.sort((a, b) => (new Date(b.date) - new Date(a.date)))
      };
    })
  };

  sortByIdDesc = () => {
    this.setState(prevState => {
      return {
        birds: this.state.birds.sort((a, b) => (new Date(a.date) - new Date(b.date)))
      };
    })
    };

    // Header for the table
  renderTableHeader() {
    const headers = ["date", "nickname", "name"];
    return headers.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  // Rendering table
  renderTableData() {
    return this.state.birds.map((bird, index) => {
      return (
        <tr key={bird._id}>
          <td>{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(Date.parse(bird.date))}</td>
          <td>{bird.birdname}</td>
          <td>{bird.nickname}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="navbar-item">
      <button className="" onClick={this.openModal}>LIST</button>

      <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={ListPopup}
      contentLabel="Bird Observation"
    >
      <div>		 
        <button className="sortButton" onClick={this.sortByIdAsc}>Uusimmat</button>
        <button className="sortButton" onClick={this.sortByIdDesc}>Vanhimmat</button>
        <button className="closeButton" onClick={this.closeModal}>Sulje</button>

        <table id="birds">

          <tbody>
          <tr>{this.renderTableHeader()}</tr>
            {this.state.birds &&
              this.state.birds.length > 0 &&
              this.renderTableData()}
          </tbody>

        </table>
      </div>
      </Modal>
      </div>
    );
  }
}

export default Table;