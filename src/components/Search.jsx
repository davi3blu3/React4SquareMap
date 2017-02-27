const React = require('react');

var Search = React.createClass({
	onFormSubmit: function(e){
		e.preventDefault();

		var address = this.refs.address.value;

		if(address.length > 0) {
			this.refs.address.value= '';
			this.props.onSearch(address);
		}
	},
	render: function() {
		return (
		<div>
			<form onSubmit={this.onFormSubmit}>
				<input type='search' placeholder='Search things to do by city' ref='address'/>
				<button className='button expanded hollow'>Get Busy</button>
			</form>
		</div>
		);
	}
});

module.exports = Search;
