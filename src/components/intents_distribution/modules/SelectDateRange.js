// Compt for copying as a SelectDateRange
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { changeSelectedDates } from '../../../actions/intents/intent_actions'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker


class SelectDateRange extends Component {

	constructor(){
		super()
		this.state = {
      start: null,
      stop: null,
    }
	}

	render() {

		return (
			<div id='SelectDateRange' style={comStyles().container}>
			<RangePicker
	      showTime={{ format: 'HH:mm' }}
	      format="YYYY-MM-DD HH:mm"
	      placeholder={['Start Time', 'End Time']}
	      onOk={(value) => this.setState({ start: value[0], stop: value[1] })}
	    />
			</div>
		)
	}
}

// defines the types of variables in this.props
SelectDateRange.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
SelectDateRange.defaultProps = {
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SelectDateRange)

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
