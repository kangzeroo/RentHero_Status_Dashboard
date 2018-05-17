// Compt for copying as a IntentsPicker
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import {
	Menu, Icon, Button
} from 'antd'
import { getAllDomainIntents } from '../../../api/mappings/mappings_api'


class IntentsPicker extends Component {

  constructor() {
    super()
    this.state = {
      intents: []
    }
  }

  componentWillMount() {
    getAllDomainIntents('development').then((intents) => {
      console.log(intents)
      this.setState({
        intents: intents
      })
    })
  }

	render() {
		return (
			<div id='IntentsPicker' style={comStyles().container}>
      <Menu
        mode="inline"
        theme="dark"
      >
        {
            this.state.intents.map((intent) => {
            return (
              <Menu.Item key={intent.dialogFlow_intentID}>
                <span>{intent.dialogFlow_intentName}</span>
              </Menu.Item>
            )
          })
        }
      </Menu>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentsPicker.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
IntentsPicker.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentsPicker)

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
