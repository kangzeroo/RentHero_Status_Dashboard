// Compt for copying as a DateRange
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  DatePicker,
} from 'antd'
import IntentsDistributions from '../intents_distribution/IntentsDistributions'
const { RangePicker } = DatePicker;

class DateRange extends Component {

  constructor(){
    super()
    this.state = {
      startDate: '',
      endDate: '',
    }
  }

  onChange(dateRange) {
    console.log(dateRange[0]);
    console.log(dateRange[1]);
  }

  onOk(value) { // arrange
    this.props.updateDateRange(value[0], value[1])
  }

	render() {
		return (
			<div id='DateRange' style={comStyles().container}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Start Time', 'End Time']}
          onChange={(e) => this.onChange(e)}
          onOk={(e) => this.onOk(e)}
        />
			</div>
		)
	}
}

// defines the types of variables in this.props
DateRange.propTypes = {
	history: PropTypes.object.isRequired,
  updateDateRange: PropTypes.func.isRequired,    // passed in
}

// for all optional props, define a default value
DateRange.defaultProps = {
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(DateRange)

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
