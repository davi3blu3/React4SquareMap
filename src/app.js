import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Places from './components/Places'
import superagent from 'superagent'
import Search from './components/Search.jsx'





let geocoder = new google.maps.Geocoder();

class App extends Component {
  constructor(){
    super()
    this.state = {
      venues: [],
      locStr: ""
    }
  }

    geocodeAddress(address) {


    geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        var lat = JSON.stringify(results[0].geometry.location.lat());
        var lng = JSON.stringify(results[0].geometry.location.lng());
        //
        // this.state.locStr = `${lat},${lng}`

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
          locStr: (results[0].geometry.location.lat() + "," + results[0].geometry.location.lng())
        });
        console.log(this.state.locStr)
        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true,

      });

    })
  }
  componentDidMount(){

      const location = {
        //default lat and long is West Palm Beach
        lat: 26.715347,
        lng: -80.053325
      }
    console.log('componentDidMount')

    var locStr = location.lat + "," + location.lng;
    const url = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=${locStr}&client_id=XT1QFLKB4I2NPDXPKT1SUVXLOKQKPC4IDMKCHJIKRZEH0PHX&client_secret=PVWXPB34V1NTB1P41GHN1IHAS34RYOHCOIWT5YIFWROEY3LC`

    superagent
      .get(url)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {

        const venues = response.body.response.venues
        console.log(JSON.stringify(venues))
        this.setState({
          venues: venues
        })
      })
  }

  render() {
    const location = {
      //default lat and long is West Palm Beach
      lat: 26.715347,
      lng: -80.053325
    }

    return (
      <div>
        This is the react app
        <div style={{width:300, height:600, background:'red'}}>
          <Map center={location} markers={this.state.venues}/>
        </div>
        <Places venues={this.state.venues} />
        <Search locStr={this.state.locStr} geocodeAddress={this.geocodeAddress()}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
