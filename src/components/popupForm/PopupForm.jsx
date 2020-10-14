import Axios from "axios";
import React from "react";
import Modal from "react-modal";
import "./PopupForm.css";


// Modal popup styling
const BirdPopup = {
  content : 
    {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(0, 0, 0)',
    background: '#aa9fa5',
    overflow: 'auto',
    borderRadius: '30px',
    outline: 'none',
    padding: '32px',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
    }
};


class PopupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  formSubmit = (e) => {
    e.preventDefault();
   
    const bird = {
      birdname: this.state.birdname,
      nickname: this.state.nickname,
      date: this.state.date,
      birdlat: this.state.birdlat,
      birdlon: this.state.lon
    }

    console.log(bird);

    Axios.post('http://localhost:5000/birds/add', bird)
      .then(res => console.log(res.data));
  }


  // rendering modal popup and form
  render() {
    return (
      <div>
        <button className="addButton" onClick={this.openModal}>+</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={BirdPopup}
          contentLabel="Bird Observation"
        >
          <form onSubmit={this.formSubmit}>
             <input className="inputText" type="text" name="birdname" placeholder="Linnun nimi" /><br />
             
             <input className="inputText" type="text" name="nickname" placeholder="Nimimerkki" /><br />
             
             <input className="inputDate" type="date" name="date" placeholder="Päivämäärä" /><br />
            
            <button className="submitButton" type="submit" onSubmit={this.handleSubmit}>
              SUBMIT
            </button>
            
            <button onClick={this.closeModal} className="cancelButton">
              CANCEL
            </button>

          </form>
        </Modal>
      </div>
    );
  }
}

export default PopupForm;