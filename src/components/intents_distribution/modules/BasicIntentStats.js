// Compt for copying as a BasicIntentStats
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Button } from 'antd'


class BasicIntentStats extends Component {

  constructor() {
    super()
    this.state = {
      show_counts: false
    }
  }

  totalIntents(intents) {
    const uniques = []
    intents.forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.intent_id === i.intent_id) {
          exists = true
        }
      })
      if (!exists) {
        uniques.push(i)
      }
    })
    return uniques.length
  }

  totalSessions(intents) {
    const uniques = []
    intents.forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.session_id === i.session_id) {
          exists = true
        }
      })
      if (!exists) {
        uniques.push(i)
      }
    })
    return uniques.length
  }

  totalAds(intents) {
    const uniques = []
    intents.forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.ad_id === i.ad_id) {
          exists = true
        }
      })
      if (!exists) {
        uniques.push(i)
      }
    })
    return uniques.length
  }

  totalTenants(intents) {
    const uniques = []
    intents.forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.identity_id === i.identity_id) {
          exists = true
        }
      })
      if (!exists) {
        uniques.push(i)
      }
    })
    return uniques.length
  }

	render() {
		return (
			<div id='BasicIntentStats' style={comStyles().container}>
  			<div style={comStyles().statbar}>
          <div style={comStyles().stat}>
    				<h2>{this.totalIntents(this.props.intents)}</h2>
            <h5>Total Intents</h5>
          </div>
          <div style={comStyles().stat}>
    				<h2>{this.totalSessions(this.props.intents)}</h2>
            <h5>Total Sessions</h5>
          </div>
          <div style={comStyles().stat}>
    				<h2>{this.totalAds(this.props.intents)}</h2>
            <h5>Total Ads</h5>
          </div>
          <div style={comStyles().stat}>
    				<h2>{this.totalTenants(this.props.intents)}</h2>
            <h5>Total Tenants</h5>
          </div>
        </div>
        <Button onClick={() => this.setState({ show_counts: !this.state.show_counts })}>
          { this.state.show_counts ? 'HIDE COUNTS' : 'SHOW COUNTS' }
        </Button>
        {
          this.state.show_counts
          ?
          this.props.distribution.sort((a, b) => {
            return a.count < b.count
          }).map((intent) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h3>{intent.count}</h3>
                &nbsp;
                <h4>{intent.intent_name}</h4>
              </div>
            )
          })
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
BasicIntentStats.propTypes = {
	history: PropTypes.object.isRequired,
  intents: PropTypes.array.isRequired,
  distribution: PropTypes.array.isRequired,     // passed in
}

// for all optional props, define a default value
BasicIntentStats.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(BasicIntentStats)

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
      height: 'auto',
      minHeight: '200px',
		},
		statbar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
		},
    stat: { display: 'flex', flexDirection: 'column', alignItems: 'center' }
	}
}
