/** React */
import React, { Component } from 'react';

/** Plugin */
import { Modal, Button } from 'react-bootstrap';

/** CSS */
import './remove_plant.modal.scss';

/**
 * @class
 * @extends Component
 * This represent the modal for plant remove modal <br>
 * This component is called at App.jsx <br>
 */
export default class RemovePlant extends Component {

	/**
	 * DOCU: Change the state of the plant when the user wants to remove it <br>
	 * Trigger: when the user clicks the remove button <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof remove_plant.jsx
	 * @author Edmond
	 */
	removePlant = () =>{
		const {items, tile_index, changeTileState, toggleModal} = this.props;
		items.map((item, index)=> {
			if(index === tile_index){
				if(item.planted === true){
					changeTileState(tile_index, "planted", "empty");
				}
				else if(item.harvest === true){
					changeTileState(tile_index, "harvest", "empty");
				}
				toggleModal();
			}	
			return item;
		});
	}

	render() {
		const { show, toggleModal } = this.props;
		return (
			<React.Fragment>
				<Modal
					show={show}
				    onHide={toggleModal}
					backdrop="static"
					centered
					id='remove_plant_modal'
				>
					<Modal.Body id='remove_plant_modal_body'>
						<h6>Remove Plant</h6>
						<p>Are you sure you want<br/>to remove this plant?</p>
						<Button variant='danger' type='button' onClick={toggleModal}>Cancel</Button>
						<Button variant='secondary' type='button' onClick={this.removePlant}>Remove</Button>
					</Modal.Body>
				</Modal>
			</React.Fragment>
		)
	}
}
