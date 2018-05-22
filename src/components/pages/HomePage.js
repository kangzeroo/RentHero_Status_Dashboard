// Compt for copying as a HomePage
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'

class HomePage extends Component {

	render() {
		return (
			<div id='HomePage' style={comStyles().container}>
				<iframe
					src='https://search-renthero-intents-mfb4bx6dwwpbqxdssfg2ocbcum.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/2a7ec850-5df6-11e8-ac6f-c752a838516e?embed=true&_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3Anow-24h%2Cmode%3Aquick%2Cto%3Anow))'
					height='1000px'
					width='100%'>
				</iframe>
			</div>
		)
	}
}

// defines the types of variables in this.props
HomePage.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
HomePage.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HomePage)

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
