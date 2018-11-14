import React, { Component } from 'react';

class Selector extends Component {

	render() {
		return(
			<div className="food-type-selector">
				<select tabIndex="2" value={this.props.selectedCuisine} onChange={(event) => this.props.filterVenues(event.target.value)}>
				  <option value="select" disabled aria-label="Select A Cuisine">Select A Cuisine</option>
				  <option value="mexican" >Mexican</option>
				  <option value="pizza" >Pizza</option>
				  <option value="chinese" >Chinese</option>
				  <option value="bbq" >BBQ</option>
				  <option value="restaurants" >All</option>
				</select>
			</div>
		)
	}

}

export default Selector