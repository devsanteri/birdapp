import axios from "axios";
import React from "react";
import Modal from "react-modal";
import "./PopupForm.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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
      modalIsOpen: false,

      bird: {
      birdname: '',
      nickname: '',
      date: new Date(),
      },

      birds: [],
    };

  }


  onBirdChange(e) {
    console.log(this.state.bird);
    this.setState({
    ...this.state,
    bird: {
    ...this.state.bird,
    [e.target.name]: e.target.value
    }
    })
  }

  onDateChange(date) {
    this.setState({
      ...this.state,
      bird: {
      ...this.state.bird,
      date: date
      }
      })
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

  formSubmit = (e) => {
    e.preventDefault();
   

    const bird = {
      ...this.state.bird,
      birdlat: this.props.userPos[0],
      birdlon: this.props.userPos[1],
    }

    axios.post('http://localhost:5000/birds/add', bird)
      .then(res => console.log(res.data))
      .catch(err => console.error(err.data))

    this.setState({ 
      modalIsOpen: false 
    });

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
             
             <input className="inputText" 
             type="text" 
             name="birdname"
             value={this.state.bird.birdname}
             onChange={this.onBirdChange.bind(this)}
             placeholder="Linnun nimi" 
             /><br />

             
             <input className="inputText"
              type="text" 
              name="nickname"
              value={this.state.bird.nickname}
              onChange={this.onBirdChange.bind(this)}
              placeholder="Nimimerkki" 
              />
              <br />
             
             <DatePicker
             className="inputText"
             selected={this.state.bird.date}
             onChange={this.onDateChange.bind(this)}
             name="date"
             /><br />

            
            <button className="submitButton" type="submit">
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