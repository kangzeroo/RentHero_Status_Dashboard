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
	render() {

		return (
			<div id='SelectDateRange' style={comStyles().container}>
				<DatePicker
          format="YYYY-MM-DD h:mm a"
          showTime
          value={this.props.min_date}
          placeholder="Start Date"
          onChange={(a, b) => this.props.changeSelectedDates({ min_date: a, max_date: this.props.max_date })}
          size='large'
          style={screen.width < 550 ? { width: '80%'} : { width: '50%' }}
        />
				&nbsp;
				&nbsp;
				<p style={{ margin: 0, fontWeight: 'bold', }}>to</p>
				&nbsp;
				&nbsp;
        <DatePicker
          format="YYYY-MM-DD h:mm a"
          showTime
          value={this.props.max_date}
          placeholder="End Date"
          onChange={(a, b) => this.props.changeSelectedDates({ min_date: this.props.max_date, max_date: a })}
          size='large'
          style={screen.width < 550 ? { width: '80%'} : { width: '50%' }}
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
		min_date: redux.intents.min_date,
		max_date: redux.intents.max_date,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeSelectedDates,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'row',
		}
	}
}
