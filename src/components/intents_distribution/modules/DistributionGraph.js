// Compt for copying as a DistributionGraph
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import BasicIntentStats from './BasicIntentStats'


class DistributionGraph extends Component {

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
    if (prevProps.intents !== this.props.intents) {
      this.calcDist()
    }
  }

  calcDist() {
    this.setState({
      distribution: this.calculateDist(this.props.intents)
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
			<div id='DistributionGraph' style={comStyles().container}>
        <BasicIntentStats distribution={this.state.distribution} intents={this.props.intents} />
        <br /><br />
				<div id='chart'></div>
			</div>
		)
	}
}

// defines the types of variables in this.props
DistributionGraph.propTypes = {
	history: PropTypes.object.isRequired,
  intents: PropTypes.array.isRequired,        // passed in
}

// for all optional props, define a default value
DistributionGraph.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(DistributionGraph)

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
