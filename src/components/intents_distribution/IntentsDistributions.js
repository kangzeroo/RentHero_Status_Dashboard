// Compt for copying as a IntentsDistributions
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
	Menu, Icon, Button
} from 'antd'
import DateRange from '../modules/DateRange'
import { getIntentsDistribution } from '../../api/intents/intents_api'
import IntentsPicker from './modules/IntentsPicker'
function handleClick(e) {

  console.log('click', e);
}


class IntentsDistributions extends Component {

	constructor(){
		super()
		this.state = {
			collapsed: false,
			selectedIntent: 'geo',
			filterOptions: {
				min_date: null,
				max_date: null,
				intents: []
			}
		}
	}

	toggleCollapsed(){
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}

	setMenu(key){
		console.log(key)
		if (key == '.$1'){
			return this.setState({
				selectedIntent: 'geo'
			})
		}
		else if (key == '.$2'){
			console.log('asd')
			return this.setState({
				selectedIntent: 'searching'
			})
		}
		else if (key == '.$3'){
			return this.setState({
				selectedIntent: 'meta'
			})
		}
		else if (key == '.$4'){
			return this.setState({
				selectedIntent: 'general'
			})
		}
		else if (key == '.$5'){
			return this.setState({
				selectedIntent: 'tours'
			})
		}
		else if (key == '.$6'){
			return this.setState({
				selectedIntent: 'spec_struc'
			})
		}
		else if (key == '.$7'){
			return this.setState({
				selectedIntent: 'spec_unstruc'
			})
		}
		else if (key == '.$8'){
			return this.setState({
				selectedIntent: 'init'
			})
		}
		else {
			return Promise.reject('Could not match key')
		}
	}

	selectMenu(key){
		this.setMenu(key)
		setTimeout(() => {
			console.log('hi')
			getIntentsDistribution({intent: this.state.selectedIntent, min_date: this.state.filterOptions.min_date.toISOString(), max_date: this.state.filterOptions.max_date.toISOString()})
		}, 250)
	}

	updateDateRange(min_date, max_date){
		this.setState({
			filterOptions: {
				...this.state.filterOptions,
				min_date,
				max_date
			}
		})

	}

	render() {
		return (
			<div id='IntentsDistributions' style={comStyles().container}>
				IntentsDistributions
				<DateRange
					onClick={(e) => console.log(e)}
					updateDateRange={(min_date, max_date) => this.updateDateRange(min_date, max_date)}
				/>
				<div style={{ width: 256 }}>
					<IntentsPicker />
				</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentsDistributions.propTypes = {
	history: PropTypes.object.isRequired,

}

// for all optional props, define a default value
IntentsDistributions.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentsDistributions)

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
