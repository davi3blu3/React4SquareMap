var React = require('react');

module.exports = {
  geocodeAddress: function (address) {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({ 'address': address },

    function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        var lat = JSON.stringify(results[0].geometry.location.lat());
        var lng = JSON.stringify(results[0].geometry.location.lng());
        var locStr = `${lat},${lng}`
        console.log('this is from geocoder' + locStr);

      return;
      }
    });
  }
}
