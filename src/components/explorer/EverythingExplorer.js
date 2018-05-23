// Compt for copying as a EverythingExplorer
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import ChatLog from './ChatLog'
import { Input, Button } from 'antd'
import { getMessagesForSession, getSessionsForTenant, getSessionsForAd, getSessionsForLandlord } from '../../api/explorer/explorer_api'

class EverythingExplorer extends Component {

  constructor() {
    super()
    this.state = {
      ad_id: '',
      session_id: 'b75bf952-b4de-4a94-86a7-6ce3ff7757b4',
      tenant_id: '',
      landlord_id: '',
      messages: [],
      tenant_ids: [],
      session_ids: [],
    }
  }

  getAdSessions() {
    getSessionsForAd({ ad_id: this.state.ad_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getLandlordSessions() {
    getSessionsForLandlord({ landlord_id: this.state.landlord_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getTenantSessions(tenant_id) {
    getSessionsForTenant({ tenant_id: tenant_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getMessages(session_id) {
    console.log('GET MESSAGES')
    console.log(session_id)
    getMessagesForSession({ session_id: this.state.session_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
        this.setState({
          messages: data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

	render() {
		return (
			<div id='EverythingExplorer' style={comStyles().container}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '500px', margin: '20px' }}>
            <Input.Search placeholder='Get Sessions by Landlord ID' value={this.state.landlord_id} onChange={(v) => this.setState({ landlord_id: v.target.value })} />
            <Button type='primary' onClick={() => this.getLandlordSessions(this.state.landlord_id)}>Get Landlord Convos</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '500px', margin: '20px' }}>
            <Input.Search placeholder='Get Sessions by Ad ID' value={this.state.ad_id} onChange={(v) => this.setState({ ad_id: v.target.value })} />
            <Button type='primary' onClick={() => this.getAdSessions(this.state.ad_id)}>Get Ad Convos</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '500px', margin: '20px' }}>
            <Input.Search placeholder='Get Sessions by Tenant ID' value={this.state.tenant_id} onChange={(v) => this.setState({ tenant_id: v.target.value })} />
            <Button type='primary' onClick={() => this.getTenantSessions(this.state.tenant_id)}>Get Tenant Convos</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '500px', margin: '20px' }}>
            <Input.Search placeholder='Get Convo by Session ID' value={this.state.session_id} onChange={(v) => this.setState({ session_id: v.target.value })} />
            <Button type='primary' onClick={() => this.getMessages(this.state.session_id)}>Get Messages</Button>
          </div>
        </div>
        {
          this.state.messages && this.state.messages.length > 0
          ?
          <ChatLog session_id={this.state.session_id} messages={this.state.messages} />
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
EverythingExplorer.propTypes = {
	history: PropTypes.object.isRequired,
  node_env: PropTypes.string.isRequired,
}

// for all optional props, define a default value
EverythingExplorer.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(EverythingExplorer)

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
      justifyContent: 'center',
      alignItems: 'center',
		}
	}
}
