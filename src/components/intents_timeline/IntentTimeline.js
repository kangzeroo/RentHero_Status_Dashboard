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
import { Select } from 'antd'


class IntentTimeline extends Component {

  constructor() {
    super()
    this.state = {
      session_id: '',
      sessions: [],
      filtered_intents: []
    }
  }

  componentDidMount() {
    console.log(this.props.all_intents)
    const sessions = []
    this.props.all_intents.forEach((int) => {
      let exists = false
      sessions.forEach((sid) => {
        if (sid === int.session_id) {
          exists = true
        }
      })
      if (!exists) {
        sessions.push(int.session_id)
      }
    })
    console.log(sessions)
    this.setState({
      sessions: sessions
    }, () => console.log(this.state))
  }

  changedSession(sid) {
    this.setState({ session_id: sid })
    this.setState({
      filtered_intents: this.props.all_intents.filter((int) => {
        return int.session_id === sid
      }).sort((a, b) => {
        return moment(b.timestamp).valueOf() < moment(a.timestamp).valueOf()
      })
    })
  }

	render() {
		return (
			<div id='IntentTimeline' style={comStyles().container}>
        Pick a conversation session:
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Select by session_id'
          onChange={(sid) => this.changedSession(sid)}
        >
          {
            this.state.sessions.map((sid) => {
              return (<Select.Option value={sid}>{sid}</Select.Option>)
            })
          }
        </Select>
        <br />
        {
          this.state.filtered_intents.map((i) => {
            return (
              <div key={i.timestamp}>{`${moment(i.timestamp).format('MMMM Do YYYY, h:mm:ss a')}: ${i.intent_name}`}</div>
            )
          })
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentTimeline.propTypes = {
	history: PropTypes.object.isRequired,
  all_intents: PropTypes.array.isRequired,
}

// for all optional props, define a default value
IntentTimeline.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentTimeline)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    all_intents: redux.intents.all_intents
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
