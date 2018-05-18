// Compt for copying as a IntentsDistributions
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'

import { getIntentsDistribution } from '../../api/intents/intents_api'
import { changeSelectedDates, changeChosenIntents} from '../../actions/intents/intent_actions'
import { Checkbox, DatePicker } from 'antd'

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['GEO', 'SEARCHING', 'META', 'GENERAL', 'TOURS', 'SPEC_STRUC', 'SPEC_UNSTRUC', 'INIT']
const defaultCheckedList = ['GEO', 'SEARCHING']

const { RangePicker } = DatePicker


class IntentsDistributions extends Component {

	constructor(){
		super()
		this.state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
   }
	}

	componentWillMount(){
	}


	onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    })

  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    })
  }

	filterIntents(checkedList){
		const chosenIntents = []
		this.props.intents.forEach((intent) => {
		  checkedList.forEach((dom) => {
		    if (intent.intent_name.toUpperCase().includes(dom)) {
		      chosenIntents.push(intent.intent_id)
		    }
		  })
		})
		this.props.chosen_Intents(chosenIntents)
	}


	render() {

		return (
			<div id='IntentsDistributions' style={comStyles().container}>
			<RangePicker
	      showTime={{ format: 'HH:mm' }}
	      format="YYYY-MM-DD HH:mm"
	      placeholder={['Start Time', 'End Time']}
	      onOk={(value) => this.setState({start: value[0], stop: value[1]}, console.log(this.state))}
	    />
			<div>
				<div style={{ borderBottom: '1px solid #E9E9E9' }}>
					<Checkbox
						indeterminate={this.state.indeterminate}
						onChange={this.onCheckAllChange}
						checked={this.state.checkAll}
					>
						Check all
					</Checkbox>
				</div>
				<br />
				<CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
			</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentsDistributions.propTypes = {
	history: PropTypes.object.isRequired,
	node_env: PropTypes.array.isRequired,
	all_Intents: PropTypes.array.isRequired,
	chosen_Intents: PropTypes.array.isRequired,
	selected_dates: PropTypes.array.isRequired,
}

// for all optional props, define a default value
IntentsDistributions.defaultProps = {
	node_env: []
	all_Intents: []
	chosen_Intents: []
	selected_dates: []
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentsDistributions)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		node_env: redux.app.node_env,
		all_Intents: redux.intents.all_Intents,
		chosen_Intents: redux.intents.chosen_Intents,
		selected_dates: redux.intents.selected_dates,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeSelectedDates,
		changeChosenIntents
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
