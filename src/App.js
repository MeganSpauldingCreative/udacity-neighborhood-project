import React, { Component } from 'react';
import './App.css';
import * as Utils from './utils.js'
import axios from 'axios'
import ListView from './components/ListView.js'

class App extends Component {


  state = {
    showingVenues: [],
    markers: [],
    allVenues: [],
    map: {},
    selectedCuisine: "select"
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

    // Uses FourSquare Developer API to get locations

    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'

    const parameters = {      

      client_id: "5RIR2S4LZ2SJYZ5UKKP5T1JP5O3SIHLAEGYJOEL2YE30MZ2J",
      client_secret: "IZIRWZ1T1ER0ECBDASJ1LOCOZGZXC1I25AAZPCU5DTKTZQDG",
      query: "restaurants",
      near: "Jackson, TN",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(resp => {
      this.setState({allVenues: resp.data.response.groups[0].items})
      this.setState(
      {showingVenues: resp.data.response.groups[0].items}, this.renderMap())
    })
    .catch((err) => {
      console.log("ERROR!!" + err)
      alert("Oops, something went wrong! Try again in a few minutes.")
    })

  }

// Initialize Map and Markers
  initMap = () => {

  var infoWindow = new window.google.maps.InfoWindow();

  var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.6145, lng: -88.8139},
      zoom: 11
    });

  this.setState({map: map})

  const markers = []

  // InfoWindow Content
  this.state.showingVenues.map( v => {
    var contentString = '<h3>'+ v.venue.name + '</h3';

    // Initialize Markers

    var marker = new window.google.maps.Marker({
      position: {lat: v.venue.location.lat, lng: v.venue.location.lng},
      map: map,
      title: v.venue.name,
      animation: window.google.maps.Animation.DROP,
      id: v.venue.id
    })

    markers.push(marker);

    marker.addListener('click', function() {
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(function(){ marker.setAnimation(null); }, 2000);
    });

    return infoWindow

  })

  this.setState({markers: markers})
  console.log(this.state.allVenues)
  console.log(this.state.markers)
}

// Filter out venues from drop down menu

filterVenues = (query) => {
  this.setState({selectedCuisine : query})
  if (query !== "restaurants"){
      // filtering markers
      this.state.markers.forEach(
      marker => {
      marker.title.toLowerCase().includes(query.toLowerCase()) === true ?
      marker.setVisible(true) :
      marker.setVisible(false)
      })
      // filtering list items
      let filteredVenues = this.state.allVenues.filter(v => v.venue.name.toLowerCase().includes(query.toLowerCase()))
      console.log(filteredVenues)
      this.setState({showingVenues: filteredVenues})

    //Making sure none are filtered when "all" is selected 
  } else{
        this.state.markers.forEach(marker => {marker.setVisible(true)})
        this.setState({showingVenues: this.state.allVenues})
  

  }

}

// Open up infowindow when list item is clicked

listItemClick = (venueID) => {


  var infowindow = new window.google.maps.InfoWindow();

  let selectedMarker = this.state.markers.filter(marker => marker.id === venueID)[0]
  console.log(selectedMarker)
  infowindow.open(window.map, selectedMarker)
  infowindow.setContent(selectedMarker.title)
  selectedMarker.setAnimation(window.google.maps.Animation.BOUNCE)
  setTimeout(function(){ selectedMarker.setAnimation(null); }, 2000);


  document.addEventListener('click',() => {
    infowindow.close()
  })

  }

  render() {


    return (
      <div id='app'>
        <div id="wrapper">
          <ListView venues={this.state.showingVenues} selectedCuisine = {this.state.selectedCuisine} markers = { this.state.markers } filterVenues={this.filterVenues} listItemClick={this.listItemClick}/>
          <div id="map" role="application"></div>
        </div>
      </div>
    );
  }
}

export default App;
