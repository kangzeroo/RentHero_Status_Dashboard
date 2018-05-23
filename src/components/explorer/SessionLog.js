// Compt for copying as a SessionLog
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import moment from 'moment'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Table, Input } from 'antd'


class SessionLog extends Component {

  constructor() {
    super()
    this.state = {
      search_string: '',
    }
  }

	render() {
		return (
			<div id='SessionLog' style={comStyles().container}>
				<h1>{`Convo Sessions related to ${this.props.filter_type}:${this.props.filter_id}`}</h1>
        <Input placeholder='String filter' value={this.state.search_string} onChange={(e) => this.setState({ search_string: e.target.value })} />
        <Table dataSource={this.props.sessions.sort((a, b) => {
          return moment(a.created_at).valueOf() < moment(b.created_at).valueOf()
        }).filter((s) => {
          return s.ad_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || s.identity_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || s.session_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || s.bot_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1 || s.created_at.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
        })}>
          <Table.Column
            title='Created Date'
            dataIndex='created_at'
            key='created_at'
          />
          <Table.Column
            title='Ad ID'
            dataIndex='ad_id'
            key='ad_id'
          />
          <Table.Column
            title='Tenant/Lead ID'
            dataIndex='identity_id'
            key='identity_id'
          />
          <Table.Column
            title='Session ID'
            dataIndex='session_id'
            key='session_id'
          />
          <Table.Column
            title='Bot ID'
            dataIndex='bot_id'
            key='bot_id'
          />
        </Table>
			</div>
		)
	}
}

// defines the types of variables in this.props
SessionLog.propTypes = {
	history: PropTypes.object.isRequired,
  sessions: PropTypes.array.isRequired,       // passed in
  filter_id: PropTypes.string.isRequired,       // passed in
  filter_type: PropTypes.string.isRequired,       // passed in
}

// for all optional props, define a default value
SessionLog.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SessionLog)

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
