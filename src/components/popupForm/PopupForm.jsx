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
    const newBird = {};


    e.target.childNodes.forEach(function(el) {

      // Create new bird from form data
      if (el.tagName === "INPUT" || el.tagName === "SELECT") {
        if (el.name === "lat" || el.name === "lon") {
          newBird.location = {
            [el.name]: el.value,
            ...newBird.location
          };
          el.value = null;
        } else {
          newBird[el.name] = el.value;
          el.value = null;
        }
      }
    });

    // give id to new bird
    newBird.id = this.props.birds.length + 1;

    // add observation time
    newBird.date = new Date().toDateString();

    // Create new birds array
    const newBirds = this.props.birds.slice();
    newBirds.push(newBird);
    
    this.props.saveNewBirds(newBirds);
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
             <input className="inputText" type="text" name="name" placeholder="Linnun nimi" /><br />
             
             <input className="inputText" type="text" name="notes" placeholder="Nimimerkki" /><br />
             
             <input className="inputText" type="file" name="file" placeholder="Kuva" /><br />
            
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