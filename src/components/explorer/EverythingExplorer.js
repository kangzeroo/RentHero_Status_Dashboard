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
import SessionLog from './SessionLog'
import { Input, Button } from 'antd'
import { getMessagesForSession, getSessionsForTenant, getSessionsForAd, getSessionsForLandlord, getSessionsForLead } from '../../api/explorer/explorer_api'

class EverythingExplorer extends Component {

  constructor() {
    super()
    this.state = {
      ad_id: 'd5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb',
      session_id: 'b75bf952-b4de-4a94-86a7-6ce3ff7757b4',
      tenant_id: 'us-east-1:22655d61-cd57-4218-93b4-51ef12ea7126',
      landlord_id: '9f8c0f75-f13e-49ba-a90c-0f9e689d7b40',
      lead_id: 'us-east-1:22655d61-cd57-4218-93b4-51ef12ea7126',
      chosen: {
        filter_type: '',
        filter_id: '',
      },
      messages: [],
      sessions: [],
    }
  }

  getAdSessions(ad_id) {
    console.log('getAdSessions')
    console.log(ad_id)
    getSessionsForAd({ ad_id: ad_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
        this.setState({
          sessions: data,
          chosen: {
            filter_type: 'Ad ID',
            filter_id: this.state.ad_id,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getLandlordSessions(landlord_id) {
    console.log('getLandlordSessions')
    console.log(landlord_id)
    getSessionsForLandlord({ landlord_id: landlord_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
        this.setState({
          sessions: data,
          chosen: {
            filter_type: 'Landlord ID',
            filter_id: this.state.landlord_id,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getTenantSessions(tenant_id) {
    console.log('getTenantSessions')
    console.log(tenant_id)
    getSessionsForTenant({ tenant_id: tenant_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
        this.setState({
          sessions: data,
          chosen: {
            filter_type: 'Tenant ID',
            filter_id: this.state.tenant_id,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getLeadSessions(lead_id) {
    console.log('getLeadSessions')
    console.log(lead_id)
    getSessionsForLead({ lead_id: lead_id, node_env: this.props.node_env })
      .then((data) => {
        console.log(data)
        this.setState({
          sessions: data,
          chosen: {
            filter_type: 'Lead ID',
            filter_id: this.state.lead_id,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getMessages(session_id) {
    console.log('getMessages')
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
            <Input.Search placeholder='Get Sessions by Lead ID' value={this.state.lead_id} onChange={(v) => this.setState({ lead_id: v.target.value })} />
            <Button type='primary' onClick={() => this.getLeadSessions(this.state.lead_id)}>Get Lead Convos</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '500px', margin: '20px' }}>
            <Input.Search placeholder='Get Convo by Session ID' value={this.state.session_id} onChange={(v) => this.setState({ session_id: v.target.value })} />
            <Button type='primary' onClick={() => this.getMessages(this.state.session_id)}>Get Messages</Button>
          </div>
        </div>
        {
          this.state.sessions && this.state.sessions.length > 0
          ?
          <SessionLog sessions={this.state.sessions} filter_id={this.state.chosen.filter_id} filter_type={this.state.chosen.filter_type} />
          :
          null
        }
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
