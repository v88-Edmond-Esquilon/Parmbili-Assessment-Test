/** React */
import React, { Component } from 'react';

/** Plugin */
import { Modal, Button } from 'react-bootstrap';

/** Dummy Data */
import { plants } from '../dummy_data';

/** CSS */
import './select_plant.modal.scss';


/**
 * @class 
 * @extends Component 
 * This represents the plant selection modal <br>
 * This component is called at App.jsx <br>
 */
export default class SelectPlant extends Component {
    state = {
        active_selection: '',
        selected_plant: {}
    }

    /**
     * DOCU: Sets the state of the plant if active or not and the selected plant object <br>
     * Trigger: When the user clicks the tile of the plant <br>
     * Last date updated: January 5, 2023
     * @function
     * @memberof select_plant.modal.jsx 
     * @param {string} component_name - gets the active or clicked plant name
     * @param {object} plant_object - gets the object of the selected plant
     * @author Edmond
     */
    handleClick = (component_name, plant_object) => {
        this.setState({ active_selection: component_name, selected_plant: plant_object });
    }

    /**
     * DOCU: Determines if the user has sufficient balance to buy a plant and trigger the cropped plant function <br>
     * Trigger: When the user submits the selected plant <br>
     * Last date updated: January 5, 2023
     * @function
     * @memberof select_plant.modal.jsx 
     * @param {object} event - object for the events of the form
     * @author Edmond
     */
    onSubmit = (event) => {
        const { selected_plant } = this.state;
        const { croppedPlant, toggleModal, money} = this.props;
        event.preventDefault();
        if (Object.keys(selected_plant).length === 0) {
            alert('Please select a plant to crop.');
        }
        else if(money < selected_plant.price){
            alert("Insufficient funds");
        }
        else{
            croppedPlant(selected_plant);
            toggleModal();
        }
    }

    render() {
        const { show, toggleModal, money } = this.props;
        const { active_selection } = this.state;
        return (
            
            <React.Fragment>
                <Modal
                    show={show}
                    onHide={toggleModal}
                    backdrop="static"
                    centered
                    id="select_plant_modal"
                >
                    <Modal.Body id="select_plant_body">
                        <button id='btn_close_modal' onClick={toggleModal}/>
                        <p>Select a Crop to Plant</p>
                        <form id='plant_selection_form' onSubmit={this.onSubmit}>
                            {plants.map((plant, index) => 
                                <div key={index} className={ `crop_plant ${active_selection === plant.name? 'active': ''}` } onClick={() => this.handleClick(plant.name, plant)}>
                                    <div className={plant.name}></div>
                                    <p>{`${plant.timer}s / ${plant.price}$ / ${plant.reward}$`}</p>
                                </div>
                            )}
                            <Button className='modal_controls' variant='secondary' type='button' onClick={toggleModal}>Cancel</Button>
                            <Button className='modal_controls' variant='primary' type='submit' disabled={money === 0 ? true : false}>Plant</Button>                 
                        </form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}
