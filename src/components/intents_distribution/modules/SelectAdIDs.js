// Compt for copying as a SelectAdIDs
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


class SelectAdIDs extends Component {

	render() {
		return (
			<div id='SelectAdIDs' style={comStyles().container}>
        
			</div>
		)
	}
}

// defines the types of variables in this.props
SelectAdIDs.propTypes = {
	history: PropTypes.object.isRequired,
  intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
SelectAdIDs.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SelectAdIDs)

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
