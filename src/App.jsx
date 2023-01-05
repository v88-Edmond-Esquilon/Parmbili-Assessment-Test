/** React */
import React, { Component } from 'react';

/** Components */
import Tile from './components/tile/tile.component';
import { SelectPlantModal, RemovePlantModal } from './modal';

/** Dummy Data */
import { template } from './dummy_data';

/** Plugins */
import { Button } from 'react-bootstrap';

/** Helper */
import { toggleShowModal } from './__helpers/helper';

/** CSS */
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @class
 * @extends Component
 * This class represents the main page of the App Parmbili. <br/>
 * This class component is called at Main.jsx <br/>
 * Last date updated: January 5, 2023
 */
export default class App extends Component {
	state = {
		earnings: 50,
		is_show_select_plant_modal: false,
		is_show_remove_plant_modal: false,
		tile_index: '',
		number_of_columns: '',
		land_expand_text: '5 x 5 180$',
		land_price: 180,
		items: [] 
	}

	/**
	 * DOCU: Changes the state of tile from empty, tilled, planted and harvest. <br>
	 * Triggered: When the user clicks the tiles popover and used the modal controls. <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof App.jsx
	 * @param {number} tile_index - gets the index of the tile component
	 * @param {string} tile_1 - gets the string of the tile state (eg. empty, tilled, planted and harvest)
	 * @param {string} tile_2 - gets the string of the tile state (eg. empty, tilled, planted and harvest)
	 * @author Edmond
	 */
	changeTileState = (tile_index, tile_1, tile_2) =>{
		const { items } = this.state;
		this.setState({
			items: items.map((item, index) => {
				if(index === tile_index){
					return {...item, [tile_1]: false, [tile_2]: true};
				}
				return item;
			})
		});
	}

	/**
	 * DOCU: Change the state of items if its planted and deduct the price to the earnings. <br>
	 * Triggered: when the user selects the plant at the select modal plant. <br>
	 * Last date updated: January 5, 2023
	 * @function 
	 * @memberof App.jsx
	 * @param {object} plant_object - receives the selected plant object
	 * @author Edmond
	 */
	croppedPlant = (plant_object) =>{
		const { tile_index, items, earnings } = this.state;
		this.setState({
			items: items.map((item, index) => {
			  if (index === tile_index) {
				return {...item, tilled: false, planted: true , plant: { ...item.plant, name: plant_object.name, price: plant_object.price, reward: plant_object.reward, timer: plant_object.timer } };
			  }
			  return item;
			}),
			earnings: earnings - plant_object.price
		});
	}

	/**
	 * DOCU: Adds the plant reward to the earnings <br>
	 * Trigger: When the user clicks the harvest popover button at tile component <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof App.jsx
	 * @param {number} plant_reward - receives the reward of the harvested plant
	 * @author Edmond
	 */
	harvestPlant = (plant_reward) => {
		const { earnings } = this.state;
		this.setState({ earnings: earnings + plant_reward });
	}

	/**
	 * DOCU: Duplicate the template object to the specific number given <br>
	 * Trigger: When the user has enough earnings and click the land expansion button <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof App.jsx
	 * @param {number} number_of_tiles - gets the number of tiles per column
	 * @author Edmond
	 */
	landExpand = (number_of_tiles) => {
		const new_items = new Array(number_of_tiles * number_of_tiles).fill(template);
		this.setState({ items: new_items, number_of_columns: number_of_tiles});
	}

	/**
	 * DOCU: Determines if the earning is enough to purchase a land expansion. <br>
	 * Trigger: When the user clicks the land expansion button. <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof App.jsx
	 * @author Edmond
	 */
	handleClickLandExpansion = () =>{
		const { earnings, land_price } = this.state;
		if(earnings > 180 && land_price === 180 ){
			this.landExpand(5);
			this.setState({ earnings: earnings - 180, land_expand_text: "6 x 6 270$", land_price: 270});
		}
		else if(earnings > 270 && land_price === 270 ){
			this.landExpand(6);
			this.setState({ earnings: earnings - 270, land_expand_text: "7 x 7 360$", land_price: 360});
		}
		else if(earnings > 360 && land_price === 360 ){
			this.landExpand(7);
			this.setState({ earnings: earnings - 360, land_expand_text: "8 x 8 450$", land_price: 450});
		}
		else{
			this.landExpand(8);
			this.setState({ earnings: earnings - 450});
		}
		//alert('INFO: All unharvested plants will be remove.');
	}

	/**
	 * DOCU: Displays the default number of tiles <br>
	 * Trigger: When the page loads <br>
	 * Last date updated: January 5, 2023
	 * @memberof App.jsx
	 * @author Edmond
	 */
	componentDidMount(){
		this.landExpand(4);
	}

	render() {
		const { earnings, is_show_select_plant_modal, items, is_show_remove_plant_modal, tile_index, number_of_columns, land_expand_text, land_price } = this.state;
		const gridStyle = {
			gridTemplateColumns: `repeat(${number_of_columns}, 1fr)`,
		};

		return (
			<div>
				<nav>Parmbili</nav>
				<main>
					<section style={gridStyle}>
						{items.map((tile, index) => (
							<Tile key={index}
								tile_state={tile}
								plant_index={index}
								changeTileState={this.changeTileState}
								toggleModalSelectPlant={() => toggleShowModal(this, "is_show_select_plant_modal", true)}
								toggleModalRemovePlant={() => toggleShowModal(this, "is_show_remove_plant_modal", true)}
								getIndex={(tile_index) => this.setState({ tile_index: tile_index })}
								harvestPlant={this.harvestPlant}
							/>
						))}
						<div id='game_controls'>
							<p>Total Earnings: {earnings}$</p>
							<Button 
								variant='info' 
								id='land_expand_btn' 
								type='button' 
								onClick={this.handleClickLandExpansion}
								disabled={ (earnings < land_price)? true : '' }
								hidden={(number_of_columns === 8)? true: ''}
							>
								Expand Land to {land_expand_text}
							</Button>
						</div>
					</section>
				</main> 
				{is_show_select_plant_modal &&
					<SelectPlantModal
						show={is_show_select_plant_modal}
						toggleModal={() => toggleShowModal(this, "is_show_select_plant_modal", false)}
						croppedPlant={this.croppedPlant}
						money={earnings}
					/>
				}     
				{is_show_remove_plant_modal && 
					<RemovePlantModal
						show={is_show_remove_plant_modal}
						toggleModal={() => toggleShowModal(this, "is_show_remove_plant_modal", false)}
						changeTileState={this.changeTileState}
						items={items}
						tile_index={tile_index}
					/>
				}
			</div>	
		)
	}
}
