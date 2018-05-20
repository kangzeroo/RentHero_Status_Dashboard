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
import { Input } from 'antd'
import { changeChosenIntents} from '../../../actions/intents/intent_actions'
import { Checkbox } from 'antd'


class IntentsDistributions extends Component {

	constructor(){
		super()
		this.state = {
			checked: [],
			search_string: '',
   	}
	}

	updateChecked(e){
		console.log(e)
		console.log(this.state.checked)
		this.doshit(e)
		.then(() => {
			console.log(this.state.checked)
			this.props.changeChosenIntents(this.state.checked)
		})


	}

	doshit(e) {
		const p = new Promise((res, rej) => {
			if (this.state.checked.map((ele) => ele === e.target.value).length > 0) {
				console.log('exists')
				this.setState({checked: this.state.checked.filter((ele) =>  ele !== e.target.value)})
				res()
			} else{
				console.log('dne')
				this.setState({checked: this.state.checked.concat([e.target.value]) })
				res()
			}
		})
		return p
	}

	render() {
		return (
			<div id='IntentsDistributions' style={comStyles().container}>
				<Input.Search placeholder='Filter Intents' value={this.state.search_string} onChange={(v) => this.setState({ search_string: v.target.value })} />
				<br />
				<div style={{ borderBottom: '1px solid #E9E9E9', display: 'flex', flexDirection: 'column' }}>
					{
						this.props.unique_intents.filter((u) => {
							return u.intent_name.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
						}).map((u) => {
							return (
								<Checkbox key={u.intent_id} value={u.intent_id} onChange={(e) => this.updateChecked(e)}>{u.intent_name}</Checkbox>
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
			width: '400px',
		}
	}
}
