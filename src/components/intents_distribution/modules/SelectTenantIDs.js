// Compt for copying as a SelectTenantIDs
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Input, Button } from 'antd'


class SelectTenantIDs extends Component {

	render() {
		return (
			<div id='SelectTenantIDs' style={comStyles().container}>
      
			</div>
		)
	}
}

// defines the types of variables in this.props
SelectTenantIDs.propTypes = {
	history: PropTypes.object.isRequired,
  intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
SelectTenantIDs.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SelectTenantIDs)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
		}
	}
}
