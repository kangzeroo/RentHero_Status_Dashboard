// Compt for copying as a HeaderBar
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Button, Menu, Dropdown, Icon, message } from 'antd'
import { changeNodeEnv } from '../actions/app/app_actions'


class HeaderBar extends Component {

	renderNodeEnvDropdown() {
      const handleMenuClick = (e) => {
        if (e.key == '.$1'){
          message.info('Development')
          this.props.changeNodeEnv('development')
        }
        else if (e.key == '.$2') {
          message.info('Staging')
          this.props.changeNodeEnv('staging')
        }
        else if (e.key == '.$3') {
          message.info('Production')
          this.props.changeNodeEnv('production')
        }
      }
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key='1'>DEVELOPMENT</Menu.Item>
          <Menu.Item key='2'>STAGING</Menu.Item>
          <Menu.Item key='3'>PRODUCTION</Menu.Item>
        </Menu>
      )
    return (
      <div>
        <Dropdown overlay={menu}>
         <Button style={{ marginLeft: 8 }}>
           {this.props.node_env} <Icon type='down' />
         </Button>
        </Dropdown>
      </div>
    )
	}

	renderPagesDropdown() {
		const menu = (
			<Menu>
				<Menu.Item key='1' onClick={() => this.props.history.push('/explorer')}>Explorer</Menu.Item>
				<Menu.Item key='2' onClick={() => this.props.history.push('/tenants/dashboard')}>Tenants Dashboard</Menu.Item>
				<Menu.Item key='3' onClick={() => this.props.history.push('/ads/dashboard')}>Ads Dashboard</Menu.Item>
				<Menu.Item key='4' onClick={() => this.props.history.push('/intents/dashboard')}>Intents Dashboard</Menu.Item>
				<Menu.Item key='5' onClick={() => this.props.history.push('/intents/distribution')}>Intents Distribution</Menu.Item>
				<Menu.Item key='6' onClick={() => this.props.history.push('/intents/timeline')}>Intent Timeline</Menu.Item>
			</Menu>
		)
	return (
		<div>
			<Dropdown overlay={menu}>
			 <Button style={{ marginLeft: 8 }}>
				 Select Page <Icon type='down' />
			 </Button>
			</Dropdown>
		</div>
	)
	}

	render() {
		return (
			<div id='HeaderBar' style={comStyles().container}>
				{
					this.renderPagesDropdown()
				}
				<h2 style={{ color: 'white' }}>RentHero Status Dashboard</h2>
				{
					this.renderNodeEnvDropdown()
				}
			</div>
		)
	}
}

// defines the types of variables in this.props
HeaderBar.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
HeaderBar.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HeaderBar)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		node_env: redux.app.node_env,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeNodeEnv,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
			padding: '10px',
			backgroundColor: '#2faded',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		}
	}
}
