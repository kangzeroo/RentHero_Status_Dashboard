// Compt for copying as a ChatLog
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import moment from 'moment'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class ChatLog extends Component {

	render() {
		return (
			<div id='ChatLog' style={comStyles().container}>
        <h1>{`Conversation History for Session ${this.props.session_id}`}</h1>
        {
          this.props.messages.sort((a, b) => {
            return moment(a.DATETIME).valueOf() > moment(b.DATETIME).valueOf()
          }).map((msg) => {
            return (
              <div key={msg.MESSAGE_ID}>{moment(msg.DATETIME).valueOf()} - {msg.SENDER_TYPE}: <b>{msg.MESSAGE}</b></div>
            )
          })
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
ChatLog.propTypes = {
	history: PropTypes.object.isRequired,
  session_id: PropTypes.string.isRequired,    // passed in
  messages: PropTypes.array.isRequired,      // passed in
}

// for all optional props, define a default value
ChatLog.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ChatLog)

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
