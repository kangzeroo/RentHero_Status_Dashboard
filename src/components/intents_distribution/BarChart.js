// Compt for copying as a BarChart
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { getIntentsDistribution } from '../../api/intents/intents_api'
import IntentTimeline from '../intents_timeline/IntentTimeline'

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
        return this.setState({
          intents,
          distribution: this.calculateDist(intents)
        })
      })
      .then(() => {
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
				<div id='chart'></div>
        <br />
        {
          this.state.intents && this.state.intents.length > 1
          ?
          <IntentTimeline intents={this.state.intents} />
          :
          null
        }
			</div>
		)
	}
}

// defines the types of constiables in this.props
BarChart.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
BarChart.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(BarChart)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    node_env: redux.app.node_env,
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
      padding: '20px',
      height: '90vh',
      justifyContent: 'center',
      // alignItems: 'center',
		}
	}
}
