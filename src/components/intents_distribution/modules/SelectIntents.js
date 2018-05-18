// Compt for copying as a IntentsDistributions
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { changeChosenIntents} from '../../../actions/intents/intent_actions'
import { Checkbox } from 'antd'


class IntentsDistributions extends Component {

	constructor(){
		super()
		this.state = {
   	}
	}

	render() {
		return (
			<div id='IntentsDistributions' style={comStyles().container}>
				<div style={{ borderBottom: '1px solid #E9E9E9' }}>
					{
						this.props.unique_intents.map((u) => {
							return (
								<Checkbox onChange={(e) => console.log(e)}>{u.intent_name}</Checkbox>
							)
						})
					}
				</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentsDistributions.propTypes = {
	history: PropTypes.object.isRequired,
	unique_intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
IntentsDistributions.defaultProps = {
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentsDistributions)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		unique_intents: redux.intents.unique_intents,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeChosenIntents
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
