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
	Timeline, Icon, Input
} from 'antd'


class ChatLog extends Component {

	constructor(){
		super()
		this.state = {
			search_string: '',
		}
	}

	render() {
		return (
			<div id='ChatLog' style={comStyles().container}>
        <h1>{`Conversation History for Session ${this.props.session_id}`}</h1>
				<input placeholder='SEARCH' onChange={(v) => this.setState({ search_string: v.target.value})} style={{marginLeft: '15%', marginRight: '15%'}} />
				<Timeline style={comStyles().timeline}>
	        {
	          this.props.messages.sort((a, b) => {
	            return moment(a.DATETIME) - moment(b.DATETIME)

	          }).filter((msgs) =>
								msgs.MESSAGE_ID.includes(this.state.search_string) ||
								msgs.SENDER_TYPE.includes(this.state.search_string) ||
								msgs.MESSAGE.includes(this.state.search_string) ||
								moment(msgs.DATETIME).toISOString().includes(this.state.search_string)
						 ).map((msg) => {
								if (msg.SENDER_TYPE === 'TENANT_HUMAN') {
									return (
										<Timeline.Item key={msg.MESSAGE_ID} dot={ <Icon type="user" style={{ fontSize: '28px' }} /> } color="red"> {msg.SENDER_TYPE} - { msg.MESSAGE_ID } - { moment(msg.DATETIME).toISOString() } <br/> - <b>{ msg.MESSAGE }</b> </Timeline.Item>
									)
								}
								else {
									return (
										<Timeline.Item key={msg.MESSAGE_ID} dot={ <Icon type="customer-service" style={{ fontSize: '28px' }} /> } color="blue"> {msg.SENDER_TYPE} - { msg.MESSAGE_ID } - { moment(msg.DATETIME).toISOString() } <br/> - <b>{ msg.MESSAGE }</b> </Timeline.Item>
									)
								}
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
		},
		timeline: {
			marginLeft: '5%',
			marginRight: '5%',
			marginTop: '5%'
		}
	}
}
