// Compt for copying as a IntentConvolog
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Input,
  Button,
  Timeline,
  Icon
} from 'antd'
import { changeSessionConvo } from '../../actions/intents/intent_actions.js'
import {getSessionMessages} from '../../api/sessions/sessions_api'

const lll = [
    {
        "CHANNEL_ID": "35b37f23-a4dd-48d5-915f-1608bc65f3b6",
        "MESSAGE": "tour",
        "MEDIUM": "RENTHERO.AI.LANDLORD",
        "PAYLOAD": "{\"status\":\"no payload\"}",
        "DATETIME": "2018-05-18T06:10:35.308Z",
        "SENDER_ID": "us-east-1:905f7422-3a14-4788-8320-f195b3b731e8",
        "RECEIVER_ID": "asdasdasd",
        "SENDER_TYPE": "TENANT_HUMAN",
        "MESSAGE_ID": "001d0d75-8f76-4faa-b234-e888fff9e4fa",
        "AD_ID": "d5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb"
    },
    {
        "CHANNEL_ID": "35b37f23-a4dd-48d5-915f-1608bc65f3b6",
        "MESSAGE": "386 Yonge Street, Old Toronto, Toronto Division, Ontario",
        "MEDIUM": "RENTHERO.AI.LANDLORD",
        "PAYLOAD": "{\"address\":\"386 Yonge Street, Old Toronto, Toronto Division, Ontario\",\"location\":{\"gps_x\":\"43.6593290\",\"gps_y\":\"-79.3826747\"},\"text\":\"The address for Aura Luxury Condos is 386 Yonge Street, Old Toronto, Toronto Division, Ontario\",\"type\":\"location\"}",
        "DATETIME": "2018-05-18T06:08:50.878Z",
        "SENDER_ID": "asdasdasd",
        "RECEIVER_ID": "us-east-1:905f7422-3a14-4788-8320-f195b3b731e8",
        "SENDER_TYPE": "LANDLORD_AI",
        "MESSAGE_ID": "00f4f0a8-cd5c-4fef-83de-4a51eba58216",
        "AD_ID": "d5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb"
    },
    {
        "CHANNEL_ID": "35b37f23-a4dd-48d5-915f-1608bc65f3b6",
        "MESSAGE": "nope (This is the landlord's answer in response to the question: \"Are there any noise restrictions?\")",
        "MEDIUM": "RENTHERO.AI.LANDLORD",
        "PAYLOAD": "{}",
        "DATETIME": "2018-05-20T05:48:41.602Z",
        "SENDER_ID": "asdasdasd",
        "RECEIVER_ID": "us-east-1:905f7422-3a14-4788-8320-f195b3b731e8",
        "SENDER_TYPE": "LANDLORD_AI",
        "MESSAGE_ID": "01fd0516-7672-40f7-ba88-b9aea9231294",
        "AD_ID": "d5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb"
    }]

class IntentConvolog extends Component {

  constructor() {
    super()
    this.state = {
      inputID: '',
      usersInConvo: [],

    }
  }

  filterThat(data) {
    let ids = []
    let sorted = data.sort((a,b) => a.DATETIME - b.DATETIME)
    const d = new Promise((res, rej) => {
      data.forEach((obj) => {
        if (ids.includes(obj.SENDER_ID)) {
          console.log('exits')
        }
        else {
          ids = ids.concat([obj.SENDER_ID])
        }
      })
      .then((data) => {


      }).then((data) => {

      })
      .catch((err) => {

      })


    })
  }

  grabSession() {
    getSessionMessages(this.state.inputID)
    .then((data) => {
      this.filterThat(data)

    })
    .then((data) => {

    })
  }

	render() {
		return (
			<div id='IntentConvolog' style={comStyles().container}>
				IntentConvolog
        <input placeholder='Session Id' onChange={ (e) => this.setState({ inputID: e.target.value }) } />
        <Button type="primary" onClick={ () => this.filterThat(lll) }>GET SESSION CONVOLOG</Button>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentConvolog.propTypes = {
	history: PropTypes.object.isRequired,
  session_convo: PropTypes.array.isRequired,
}

// for all optional props, define a default value
IntentConvolog.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentConvolog)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    session_convo: redux.intents.session_convo
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    changeSessionConvo,
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
