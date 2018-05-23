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
	Timeline, Icon
} from 'antd'


class ChatLog extends Component {

	render() {
		return (
			<div id='ChatLog' style={comStyles().container}>
        <h1>{`Conversation History for Session ${this.props.session_id}`}</h1>
				<Timeline>
	        {
	          this.props.messages.sort((a, b) => {
	            return moment(a.DATETIME) - moment(b.DATETIME)
	          }).map((msg) => {
	            return (
	              <Timeline.Item key={msg.MESSAGE_ID} dot={ <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> } color="red"> { msg.MESSAGE_ID }  - { moment(msg.DATETIME).toISOString() } - { msg.MESSAGE } </Timeline.Item>
	            )
	          })
	        }
				</Timeline>
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
