// Compt for copying as a IntentDistribution
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import { } from 'antd-mobile'
import IntentTimeline from '../intents_timeline/IntentTimeline'
import { getIntentsDistribution } from '../../api/intents/intents_api'
import SelectIntents from './modules/SelectIntents'
import SelectDateRange from './modules/SelectDateRange'
import SelectSessionIDs from './modules/SelectSessionIDs'
import SelectAdIDs from './modules/SelectAdIDs'
import SelectTenantIDs from './modules/SelectTenantIDs'
import DistributionGraph from './modules/DistributionGraph'
import {changeAllIntents} from '../../actions/intents/intent_actions'

class IntentDistribution extends Component {

	render() {

		return (
			<div id='IntentDistribution' style={comStyles().container}>
        <SelectDateRange />
        <br /><br />
        <DistributionGraph intents={this.props.selected_intents} />
        <br /><br />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <SelectIntents />
          <SelectAdIDs />
          <SelectTenantIDs />
          <SelectSessionIDs />
        </div>
			</div>
		)
	}
}

// defines the types of constiables in this.props
IntentDistribution.propTypes = {
	history: PropTypes.object.isRequired,
  selected_intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
IntentDistribution.defaultProps = {
  selected_intents: []
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentDistribution)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    node_env: redux.app.node_env,
    selected_intents: redux.intents.selected_intents,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeAllIntents,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      height: '90vh',
      justifyContent: 'center',
      // alignItems: 'center',
		}
	}
}
