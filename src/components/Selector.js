import React, { Component } from 'react';

class Selector extends Component {

	render() {
		return(
			<div className="food-type-selector">
				<select value="select" onChange={(event) => alert('hi')}>
				  <option value="select" disabled>Select A Cuisine</option>
				  <option value="mexican">Mexican</option>
				  <option value="pizza">Pizza</option>
				  <option value="asian">Asian</option>
				  <option value="bbq">BBQ</option>
				  <option value="all">All</option>
				</select>
			</div>
		)
	}

}

export default Selector