import React from 'react';
import './Form.css';

function Form () {

    return(
            <form>
            <input className="inputText" type="text" name="name" placeholder="Linnun nimi" /><br />
            <input className="inputText" type="text" name="notes" placeholder="Nimimerkki" /><br />
            <input className="inputText" type="file" name="file" placeholder="Kuva" /><br />
            <button className="submitButton" type="submit">
              SUBMIT
            </button>
            <br />
            <button className="cancelButton">
              CANCEL
            </button>
          </form>
    )
}

export default Form;