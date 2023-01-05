/** React */
import React, { Component } from 'react';

/**
 * @class
 * @extends Component
 * This component represent the timer for the tiles when there is a plant <br>
 * This class component is called at tile.component.jsx <br>
 */
export default class Timer extends Component {
	state = {
		timer: this.props.timer
	}

	/**
	 * DOCU: Mounts the timer interval <br>
	 * Trigger: When the component mounts on the page <br>
	 * Last date updated: January 5, 2023
	 * @memberof timer.component.jsx 
	 * @author Edmond
	 */
	componentDidMount() {
		this.timerID = setInterval(
		() => this.tick(),
			1000
		);
	}
	
	/**
	 * DOCU: Clears the interval for the timer <br>
	 * Trigger: When the component dismounts <br>
	 * Last date updated: January 5, 2023
	 * @memberof timer.component.jsx 
	 * @author Edmond
	 */
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	/**
	 * DOCU: Sets the timer countdown and trigger the change tile state function <br>
	 * Trigger: Triggers at ComponentDidMount <br>
	 * Last date updated: January 5, 2023
	 * @function
	 * @memberof timer.component.jsx
	 * @author Edmond
	 */
	tick() {
		this.setState({
			timer: this.state.timer - 1
		});
		if(this.state.timer === 0) {
			this.props.changeTileState(this.props.plant_index, "planted", "harvest");
		}
	}

	render() {
		return (
			<React.Fragment>
				{this.state.timer}
			</React.Fragment>
		)
	}
}
