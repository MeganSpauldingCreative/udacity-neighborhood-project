import React, { Component } from 'react';
import VenueListing from './VenueListing.js'
import Selector from './Selector.js'

class ListView extends Component {

	render() {
		return(
			<div id="list-view" role="main">
				<h1 tabIndex="1">JacksonEATS</h1>
				<Selector filterVenues={this.props.filterVenues} listItemClick={this.props.listItemClick} selectedCuisine={this.props.selectedCuisine}/>
				<hr/>
				{this.props.venues.map((venue, key) => (<VenueListing venue={venue} key={key} markers={this.props.markers} listItemClick={this.props.listItemClick}/>))}
			</div>
		)
	}

}

export default ListView