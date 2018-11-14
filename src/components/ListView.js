import React, { Component } from 'react';
import VenueListing from './VenueListing.js'
import Selector from './Selector.js'

class ListView extends Component {

	render() {
		return(
			<div id="list-view">
				<h1>JacksonEATS</h1>
				<Selector filterVenues={this.props.filterVenues}/>
				<hr/>
				{this.props.venues.map((venue, key) => (<VenueListing venue={venue} key={key} markers={this.props.markers} />))}
			</div>
		)
	}

}

export default ListView