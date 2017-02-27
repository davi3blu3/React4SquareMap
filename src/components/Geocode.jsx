

module.exports = {

  geocodeAddress: function (address) {
  this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {

      var lat = JSON.stringify(results[0].geometry.location.lat());
      var lng = JSON.stringify(results[0].geometry.location.lng());
      var locStr = `${lat},${lng}`
      console.log(locStr)
      this.setState({
        foundAddress: results[0].formatted_address,
        isGeocodingError: false,
        locStr: (results[0].geometry.location.lat() + "," + results[0].geometry.location.lng())
      });

      return;
    }

    this.setState({
      foundAddress: null,
      isGeocodingError: true,

    });

  }
}
}
