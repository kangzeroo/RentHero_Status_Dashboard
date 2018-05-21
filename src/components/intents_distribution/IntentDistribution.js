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
import BasicIntentStats from './modules/BasicIntentStats'
import SelectSessionIDs from './modules/SelectSessionIDs'
import SelectAdIDs from './modules/SelectAdIDs'
import SelectTenantIDs from './modules/SelectTenantIDs'
import {changeAllIntents} from '../../actions/intents/intent_actions'

class IntentDistribution extends Component {

  constructor() {
    super()
    this.state = {
      distribution: []
    }
  }

  componentDidMount() {
    this.calcDist()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected_intents !== this.props.selected_intents) {
      this.calcDist()
    }
  }

  calcDist() {
    this.setState({
      distribution: this.calculateDist(this.props.selected_intents)
    }, () => this.renderChart())
  }

  calculateDist(intents) {
    const distribution = {}
    intents.forEach((int) => {
      distribution[int.intent_name] = {
        intent_name: int.intent_name,
        count: 0
      }
    })
    const unique_intents = Object.keys(distribution)
    unique_intents.forEach((intent_name) => {
      const count = intents.filter((i) => {
        return i.intent_name === intent_name
      }).length
      distribution[intent_name].count = count
    })
    const x = Object.keys(distribution).map((key) => {
      return distribution[key]
    }).sort((a, b) => {
      return a.count < b.count
    })
    return x
  }

  renderChart() {
    google.charts.load('current', {'packages':['bar']})
    google.charts.setOnLoadCallback(() => {
      // Create the data table.
      const x = [
         ['Intents', 'Count', { role: 'style' }, { role: 'annotation' } ]
      ]
      this.state.distribution.forEach((intent) => {
        x.push([intent.intent_name, intent.count, '#b87333', `${intent.count}`])
      })
      const data = google.visualization.arrayToDataTable(x)

      // Set chart options
      const options = {
        hAxis: { slantedText: true, slantedTextAngle: 60 },
        chartArea: { left: 20, top: 20, right: 20, bottom: 20, width: '100%', height: '100%' },
        chart: {
          title: 'Distribution of Intents Hit',
        },
        legend: {
          position: 'top'
        }
      }

      // Instantiate and draw our chart, passing in some options.
      const chart = new google.charts.Bar(document.getElementById('chart'))
      chart.draw(data, options)
    })
  }

	render() {

		return (
			<div id='IntentDistribution' style={comStyles().container}>
        <BasicIntentStats distribution={this.state.distribution} intents={this.props.selected_intents} />
        <br /><br />
        <SelectDateRange />
        <br /><br />
				<div id='chart'></div>
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
