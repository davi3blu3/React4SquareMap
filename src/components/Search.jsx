var React = require('react');


var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;


var Search = React.createClass({

  handleFormSubmit: function (submitEvent) {
    submitEvent.preventDefault();

    var address = this.searchInputElement.value;

    this.props.geocodeAddress(address);
  },



  setSearchInputElementReference: function (inputReference) {
    this.searchInputElement = inputReference;
  },

  render: function () {
    return (
      <div>
            <form className="form-inline" onSubmit={this.handleFormSubmit}>


                  <div className="form-group">
                    <label className="sr-only" htmlFor="address">Address</label>
                    <input type="text" className="form-control input-lg" id="address" placeholder="London, United Kingdom" ref={this.setSearchInputElementReference} required />
                  </div>
                  <button type="submit" className="btn btn-default btn-lg">
                  </button>
            </form>

        <div className="row">
          <div className="col-sm-12">
{/*
            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>} */}
            <p> {this.props.locStr}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
