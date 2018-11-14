import React, { Component } from 'react';
import './App.css';
import * as Utils from './utils.js'
import axios from 'axios'
import ListView from './components/ListView.js'

class App extends Component {

  state = {
    venues: [],
    parameters: {
      client_id: "5RIR2S4LZ2SJYZ5UKKP5T1JP5O3SIHLAEGYJOEL2YE30MZ2J",
      client_secret: "IZIRWZ1T1ER0ECBDASJ1LOCOZGZXC1I25AAZPCU5DTKTZQDG",
      query: "restaurants",
      near: "Jackson, TN",
      v: "20182507"
    },
    markers: []
  }

  componentDidMount () {
    this.getVenues()
  }

  // Render Google Map
  
  renderMap = () => {
    Utils.loadScript()
    window.initMap = this.initMap
  }

  // Get Venues from Foursquare API

  getVenues = () => {

    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'

    axios.get(endPoint + new URLSearchParams(this.state.parameters))
    .then(resp => {
      this.setState({venues: resp.data.response.groups[0].items}, this.renderMap())
    }).catch((err) => console.log("ERROR!!" + err))

  }

  initMap = () => {

  var infowindow = new window.google.maps.InfoWindow();

  var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.6145, lng: -88.8139},
      zoom: 11
    });

  const markers = []

  this.state.venues.map( v => {
    var contentString = '<h3>'+ v.venue.name + '</h3';


    var marker = new window.google.maps.Marker({
      position: {lat: v.venue.location.lat, lng: v.venue.location.lng},
      map: map,
      title: v.venue.name,
      animation: window.google.maps.Animation.DROP
    })

    markers.push(marker);

    return marker.addListener('click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
    });

  })

  this.setState({markers: markers})
  console.log(this.state.markers)
}

  render() {
    return (
      <div id='app'>
        <div id="wrapper">
          <ListView venues={this.state.venues} markers = { this.state.markers }/>
          <div id="map"></div>
        </div>
      </div>
    );
  }
}

export default App;
