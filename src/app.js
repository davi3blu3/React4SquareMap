import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Places from './components/Places'
import superagent from 'superagent'
import Search from './components/Search.jsx'
import Results from './components/Results.jsx'
import Geocode from './components/Geocode.jsx'

class App extends Component {
  constructor(){
    super()
    this.state = {
      venues: [],
    }
  }
  componentDidMount(){
      // 
      // const location = {
      //   //default lat and long is West Palm Beach
      //   lat: 26.715347,
      //   lng: -80.053325
      // }
    console.log('componentDidMount')
    const url = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=${locStr}&client_id=XT1QFLKB4I2NPDXPKT1SUVXLOKQKPC4IDMKCHJIKRZEH0PHX&client_secret=PVWXPB34V1NTB1P41GHN1IHAS34RYOHCOIWT5YIFWROEY3LC`

    console.log('superagent' + locStr);
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
        <Results/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
