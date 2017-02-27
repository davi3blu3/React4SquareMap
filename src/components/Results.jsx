var React = require('react');
var Search = require('./Search.jsx');
var Geocode = require('./Geocode.jsx');

var Results = React.createClass({

  getInitialState: function(){
    return {
      isLoading: false,
      locStr: "25.7616798,-80.19179020000001",
      venues: [],

      isGeocodingError: false,
      foundAddress: undefined
    }
  },

  handleSearch: function(address){
		var that = this;


		this.setState({
			isLoading: true,
			errorMessage: undefined,
			locStr: "25.7616798,-80.19179020000001",
      address: undefined
		});
    Geocode.geocodeAddress(address).then(function(locStr){
      console.log(locStr);
      this.setState({
        address: address,
        locStr: locStr,
        isLoading: false
      })
    }, function(e) {
      that.setState({
        isLoading: false,
        errorMessage: e.message
      })
    })
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
