// Compt for copying as a IntentsDashboard
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'

class IntentsDashboard extends Component {

	render() {
		return (
			<div id='IntentsDashboard' style={comStyles().container}>
				<iframe
					src={`
					https://search-renthero-intents-mfb4bx6dwwpbqxdssfg2ocbcum.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/1fd3dd80-5f24-11e8-ac6f-c752a838516e?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,interval:'1h',mode:quick,timezone:America%2FNew_York,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'5b8abfb0-5ddf-11e8-ac6f-c752a838516e',key:INTENT_NAME.keyword,negate:!t,params:!(INIT---LandlordWidget,INIT---PropertyQuestion),type:phrases,value:'INIT---LandlordWidget,+INIT---PropertyQuestion'),query:(bool:(minimum_should_match:1,should:!((match_phrase:(INTENT_NAME.keyword:INIT---LandlordWidget)),(match_phrase:(INTENT_NAME.keyword:INIT---PropertyQuestion))))))),fullScreenMode:!f,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:3,i:'2',w:6,x:6,y:0),id:'427da210-5e04-11e8-ac6f-c752a838516e',panelIndex:'2',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'3',w:6,x:0,y:0),id:'12479820-5df6-11e8-ac6f-c752a838516e',panelIndex:'3',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'5',w:6,x:0,y:3),id:b0a293a0-5e1c-11e8-ac6f-c752a838516e,panelIndex:'5',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'6',w:6,x:6,y:3),id:'8ad8eef0-5e1f-11e8-ac6f-c752a838516e',panelIndex:'6',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'7',w:6,x:0,y:6),id:b13907d0-5e8b-11e8-ac6f-c752a838516e,panelIndex:'7',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'8',w:6,x:6,y:6),id:'96d8ba00-5f23-11e8-ac6f-c752a838516e',panelIndex:'8',type:visualization,version:'6.2.2')),query:(language:lucene,query:''),timeRestore:!f,title:'Intents+Analysis',viewMode:view)
				`}
				height='1000px'
				width='100%'>
			</iframe>
			</div>
		)
	}
}

// defines the types of variables in this.props
IntentsDashboard.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
IntentsDashboard.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(IntentsDashboard)

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
