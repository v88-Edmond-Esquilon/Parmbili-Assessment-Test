/** React */
import React, { Component } from 'react';

/** Component */
import Timer from '../timer/timer.component';

/** Plugin */
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

/** CSS */
import './tile.component.scss';

/**
 * @class
 * @extends Component
 * This component represents the tile on the page <br>
 * This class component is called at App.jsx <br>
 * Last date updated: January 5, 2023
 */
export default class Tile extends Component {

	/**
	 * DOCU: Changes the state of tile when clicked (empty, tilled, planted and harvest) <br>
	 * Trigger: When the user clicks the popover buttons <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof tile.component.jsx
	 * @author Edmond
	 */
	onClick = () => {
		const {tile_state} = this.props;
		if(tile_state.empty){
			this.props.changeTileState(this.props.plant_index, "empty", "tilled");
		}
		else if (tile_state.tilled){
			this.props.changeTileState(this.props.plant_index, "tilled", "planted");
		}
		else if(tile_state.planted){
			this.props.changeTileState(this.props.plant_index, "planted", "empty");
		}
		else if(tile_state.harvest){
			this.props.changeTileState(this.props.plant_index, "harvest", "empty");
		}
	}

	/**
	 * DOCU: Displays the select plant  modal <br>
	 * Trigger: When the user clicks the plant popover button <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof tile.component.jsx
	 * @author Edmond
	 */
	handleModalSelect = () => {
		const {toggleModalSelectPlant, getIndex, plant_index} = this.props;
		toggleModalSelectPlant();
		getIndex(plant_index);
	}

	/**
	 * DOCU: Displays the remove plant modal <br>
	 * Trigger: When the user clicks the remove popover button <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof tile.component.jsx
	 * @author Edmond
	 */
	handleModalRemove = () => {
		const {toggleModalRemovePlant, getIndex, plant_index} = this.props;
		toggleModalRemovePlant();
		getIndex(plant_index);
	}

	/**
	 * DOCU: This triggers the props function for harvest rewards and the onClick function <br>
	 * Trigger: When the user clicks the harvest popover button <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof tile.component.jsx
	 * @author Edmond
	 */
	handleHarvest = () => {
		const { harvestPlant, tile_state } = this.props;
		harvestPlant(tile_state.plant.reward);
		this.onClick();
	}



	render() {
	const { tile_state, changeTileState, plant_index, toggleModalRemovePlant } = this.props;

	return (
			<React.Fragment>
				{tile_state.empty && 
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={
							<Popover id='popover-basic' >
								<Popover.Body className='popover_body'>
									<Button variant='primary' className='popover_button' onClick={this.onClick}>Till</Button>
								</Popover.Body>
							</Popover>
						}
					>
						<div className={`${tile_state.empty && 'empty_tile'} `}> </div> 
					</OverlayTrigger>
				}
				{tile_state.tilled &&
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={
							<Popover id='popover-basic'>
								<Popover.Body className='popover_body'>
									<Button variant='primary' className='popover_button' onClick={this.handleModalSelect}>Plant</Button>
								</Popover.Body>
							</Popover>
						}
					>
						<div className='tilled_tile'></div> 
					</OverlayTrigger>
				}
				{tile_state.planted &&
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={
							<Popover id='popover-basic'>
								<Popover.Body className='popover_body'>
									<Button className='popover_button remove' onClick={this.handleModalRemove}>Remove</Button>
								</Popover.Body>
							</Popover>
						}
					>
						<div className='planted_tile'>
							<div className={tile_state.plant.name}> </div>	
							<p>{<Timer changeTileState={changeTileState} plant_index={plant_index} timer={tile_state.plant.timer} />} s</p>
						</div> 
					</OverlayTrigger>
				}
				{tile_state.harvest &&
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={
							<Popover id='popover-basic' >
								<Popover.Body className='popover_body'>
									<Button variant='primary' className='popover_button' onClick={this.handleHarvest}>Harvest</Button>
									<Button className='popover_button remove' onClick={this.handleModalRemove}>Remove</Button>
								</Popover.Body>
							</Popover>
						}
					>
						<div className='harvest_tile'>
							<div className={tile_state.plant.name}> </div>
							<p>{tile_state.plant.reward}$</p>	
						</div> 
					</OverlayTrigger>
				}
			</React.Fragment>
			
		)
	}
}
