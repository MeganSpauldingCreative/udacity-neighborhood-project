import React, { Component } from 'react';

class Selector extends Component {

	render() {
		return(
			<div tabIndex="2" className="food-type-selector">
				<select value={this.props.selectedCuisine} onChange={(event) => this.props.filterVenues(event.target.value)}>
				  <option value="select" disabled aria-label="Select A Cuisine">Select A Cuisine</option>
				  <option value="mexican" role="option">Mexican</option>
				  <option value="pizza" role="option">Pizza</option>
				  <option value="chinese" role="option">Chinese</option>
				  <option value="bbq" role="option">BBQ</option>
				  <option value="restaurants" role="option">All</option>
				</select>
			</div>
		)
	}

}

export default Selector