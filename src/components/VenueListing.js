import React, { Component } from 'react';


class VenueListing extends Component {

	render() {
		console.log(this.props.venue)
		return(
			<div className="venue-listing">
				<h3 className="venue-name">{this.props.venue.venue.name}</h3>
				<h5 className="venue-category">{this.props.venue.venue.categories[0].name || "n/a"}</h5>
				<p className="venue-address"> {this.props.venue.venue.location.address || "Jackson, TN"} </p>

			</div>
			
		)
	}

}

export default VenueListing