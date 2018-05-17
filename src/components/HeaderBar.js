// Compt for copying as a HeaderBar
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class HeaderBar extends Component {

	render() {
		return (
			<div id='HeaderBar' style={comStyles().container}>
				HeaderBar dev - staging - prod
			</div>
		)
	}
}

// defines the types of variables in this.props
HeaderBar.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
HeaderBar.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HeaderBar)

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
