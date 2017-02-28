var React = require('react');
var Search = require('./Search.jsx');
var Geocode = require('./Geocode.jsx');

var Results = React.createClass({

  getInitialState: function(){
    return {
      isLoading: false,
      locStr: "25.7616798,-80.19179020000001",
      venues: [],
      errorMessage: undefined,
      isGeocodingError: false,
      foundAddress: undefined,
      address: undefined
    }
  },

  geocodeAddress: function (address) {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({ 'address': address }, function(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {
        var lat = JSON.stringify(results[0].geometry.location.lat());
        var lng = JSON.stringify(results[0].geometry.location.lng());
        var locStr = `${lat},${lng}`;
        console.log('1. this is from geocoder' + locStr);
      };

    }).then(function(locStr) {
        console.log('2.', locStr);

        // this.setState({
        //   address: address,
        //   locStr: locStr,
        //   isLoading: false
        // });
    })
    return this.geocoder.geocode;

  },

  handleSearch: function(address){
		var that = this;

		this.setState({
			isLoading: true
		});

    this.geocodeAddress(address);
  },


  componentDidMount: function(){

    var address = this.props.address;

    if(address && address.length > 0){
      this.handleSearch(address);
      window.address.hash = '#/';
    }
  },
  render: function() {
	var {isLoading, locStr, address, errorMessage} = this.state;

	function renderMessage(){
		if(isLoading){
			return <h3 className="text-center">Fetching Location...</h3>;
		} else if (address) {
			return <Results address={address} />;
		}
	}
  return (
		<div>
			<h1 className="text-center page-title">Get Location</h1>
			<Search onSearch={this.handleSearch}/>
			{renderMessage()}
			{/* {renderError()} */}
		</div>
		);
	}


  })

  module.exports = Results;
