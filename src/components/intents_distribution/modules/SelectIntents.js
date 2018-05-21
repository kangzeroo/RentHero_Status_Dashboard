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
import { Input, Button } from 'antd'
import { changeChosenIntents, chooseAllIntents } from '../../../actions/intents/intent_actions'
import { Checkbox } from 'antd'


class IntentsDistributions extends Component {

	constructor(){
		super()
		this.state = {
			checked: [],
			search_string: '',
   	}
	}

	componentWillMount() {
		this.setState({
			checked: this.props.chosen_intents
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.chosen_intents !== this.props.chosen_intents) {
			this.setState({
				checked: this.props.chosen_intents
			})
		}
	}

	updateChecked(intent){
		const x = this.state.checked.filter((c) => {
			return c.intent_id === intent.intent_id
		}).length
		if (x > 0) {
			this.setState({
				checked: this.state.checked.filter((c) => {
					return c.intent_id !== intent.intent_id
				})
			})
		} else {
			this.setState({
				checked: this.state.checked.concat([intent])
			})
		}
	}

	submitIntents() {
		this.props.changeChosenIntents(this.state.checked)
	}

	selectAll(bool) {
		this.setState({
			checked: bool ? this.props.unique_intents : []
		}, () => console.log(this.state))
	}

	render() {
		return (
			<div id='IntentsDistributions' style={comStyles().container}>
				<h2>Filter Intents</h2>
				<h4>Will cause a refresh, takes 10 seconds</h4>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Input.Search placeholder='Filter Intents' value={this.state.search_string} onChange={(v) => this.setState({ search_string: v.target.value })} />
					<Button type='primary' onClick={() => this.submitIntents()}>Filter Intents</Button>
				</div>
				<br />
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Button onClick={() => this.selectAll(true)}>Select All</Button>
					<Button onClick={() => this.selectAll(false)}>Unselect All</Button>
				</div>
				<br />
				<div style={{ borderBottom: '1px solid #E9E9E9', display: 'flex', flexDirection: 'column' }}>
					{
						this.props.unique_intents.filter((u) => {
							return u.intent_name.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
						}).map((u) => {
							return (
								<Checkbox key={u.intent_id} checked={this.state.checked.filter((c) => c.intent_id === u.intent_id).length > 0} onClick={() => this.updateChecked(u)}>{u.intent_name}</Checkbox>
							)
						})
					}
				</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentsDistributions.propTypes = {
	history: PropTypes.object.isRequired,
	unique_intents: PropTypes.array.isRequired,
	chosen_intents: PropTypes.array.isRequired,
	changeChosenIntents: PropTypes.func.isRequired,
}

// for all optional props, define a default value
IntentsDistributions.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentsDistributions)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		unique_intents: redux.intents.unique_intents,
		chosen_intents:redux.intents.chosen_intents,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		changeChosenIntents,
		chooseAllIntents,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
			width: '400px',
		}
	}
}
