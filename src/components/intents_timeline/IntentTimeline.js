// Compt for copying as a IntentTimeline
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Input, Button } from 'antd'
import { getTimelineIntents, getMessagesForSession } from '../../api/timeline/timeline_api'
import { changeAllIntents } from '../../actions/intents/intent_actions'
import DistributionGraph from '../intents_distribution/modules/DistributionGraph'


class IntentTimeline extends Component {

  constructor() {
    super()
    this.state = {
      session_id: '',
      ad_id: '',
      identity_id: '',
      messages: [],
    }
  }

  grabIntents() {
    getTimelineIntents({
      session_id: this.state.session_id,
      ad_id: this.state.ad_id,
      identity_id: this.state.identity_id,
      node_env: this.props.node_env,
    }).then((data) => {
      console.log(data)
      this.props.changeAllIntents(data.intents)
    }).catch((err) => {
      console.log(err)
    })
  }

  grabMessages(session_id) {
    if (session_id) {
      getMessagesForSession(session_id)
        .then((data) => {
          this.setState({
            messages: data
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert('No session ID provided!')
    }
  }

	render() {
		return (
			<div id='IntentTimeline' style={comStyles().container}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '500px', height: '200px' }}>
          <Input.Search placeholder='By Ad ID' value={this.state.ad_id} onChange={(v) => this.setState({ ad_id: v.target.value })} />
          <Input.Search placeholder='By Tenant ID' value={this.state.identity_id} onChange={(v) => this.setState({ identity_id: v.target.value })} />
          <Input.Search placeholder='By Session ID (required for convos)' value={this.state.session_id} onChange={(v) => this.setState({ session_id: v.target.value })} />
          <Button type='primary' onClick={() => this.grabIntents()}>Get Intents</Button>
          <Button type='primary' onClick={() => this.grabMessages(this.state.session_id)}>Get Messages</Button>
        </div>
        <br /><br />
        <DistributionGraph intents={this.props.selected_intents} />
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentTimeline.propTypes = {
	history: PropTypes.object.isRequired,
  selected_intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
IntentTimeline.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentTimeline)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    selected_intents: redux.intents.selected_intents,
    node_env: redux.app.node_env,
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
      justifyContent: 'center',
      alignItems: 'center',
		}
	}
}
