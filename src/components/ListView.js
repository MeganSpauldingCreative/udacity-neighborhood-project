import React, { Component } from 'react';
import VenueListing from './VenueListing'

class ListView extends Component {

	render() {
		return(
			<div id="list-view">
				<h1>JacksonEATS</h1>
				<hr/>
				{this.props.venues.map((venue, key) => (<VenueListing venue={venue} key={key} />))}
			</div>
		)
	}

}

export default ListView