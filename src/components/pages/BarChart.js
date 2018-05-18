// Compt for copying as a BarChart
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import { } from 'antd-mobile'
import { getIntentsDistribution } from '../../api/intents/intents_api'
import IntentsDistributions from '../SelectContent/IntentsDistributions'
import {changeAllIntents} from '../../actions/intents/intent_actions'

class BarChart extends Component {

  constructor() {
    super()
    this.state = {
      intents: [],
      distribution: []
    }
  }

  componentDidMount() {
    this.getIntents()
    setInterval(() => {
      this.getIntents()
    }, 120000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.node_env !== this.props.node_env) {
      this.getIntents()
    }
  }

  getIntents() {
    getIntentsDistribution(this.props.node_env)
      .then((intents) => {
        console.log(intents)
        this.setState({
          intents,
          distribution: this.calculateDist(intents)
        })
        return intents
      })
      .then((intents) => {
        this.props.changeAllIntents(intents)
        this.renderChart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  calculateDist(intents) {
    console.log(intents)
    const distribution = {}
    intents.forEach((int) => {
      distribution[int.intent_name] = {
        intent_name: int.intent_name,
        count: 0
      }
    })
    const unique_intents = Object.keys(distribution)
    console.log(unique_intents)
    unique_intents.forEach((intent_name) => {
      const count = intents.filter((i) => {
        return i.intent_name === intent_name
      }).length
      distribution[intent_name].count = count
    })
    console.log(distribution)
    const x = Object.keys(distribution).map((key) => {
      return distribution[key]
    })
    console.log(x)
    return x
  }

  renderChart() {
    console.log('renderChart')
    google.charts.load('current', {'packages':['bar']})
    google.charts.setOnLoadCallback(() => {
      // Create the data table.
      const x = [
         ['Intents', 'Count', { role: 'style' }, { role: 'annotation' } ]
      ]
      this.state.distribution.forEach((intent) => {
        x.push([intent.intent_name, intent.count, '#b87333', `${intent.count}`])
      })
      console.log(x)
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
			<div id='BarChart' style={comStyles().container}>
        <IntentsDistributions />
				<div id='chart'></div>
			</div>
		)
	}
}

// defines the types of constiables in this.props
BarChart.propTypes = {
	history: PropTypes.object.isRequired,
  all_Intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
BarChart.defaultProps = {
  all_Intents: []
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(BarChart)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    node_env: redux.app.node_env,
    all_Intents: redux.intents.all_Intents,
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
