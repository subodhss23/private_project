import React, {Component} from 'react'
import {connect} from 'react-redux'

import { event } from '../../../GAHelper.jsx'
import { sendFeedback } from '../../../../actions/index.jsx'

import '../../../../css/Feedback.css'

class Feedback extends Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleYESClick = this.handleYESClick.bind(this);
    this.handleNOClick = this.handleNOClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

	handleYESClick() {
		this.refs.title.innerHTML = "Thanks for your feedback!";
		this.refs.buttons.style.display = "none";
		event("FEEDBACK", "USEFUL");
	}

	handleNOClick() {
		this.refs.title.innerHTML = "Sorry about that";
		this.refs.howimprove.style.display = "block";
		this.refs.buttons.style.display = "none";
		this.refs.form.style.display = "block";
	}

	onSubmit() {
		const { dispatch } = this.props
		this.props.dispatch(sendFeedback(this.refs.ta.value, window.location.href))
	}

	render() {
		const { complete } = this.props

		if (complete) {
			return (
				<div styleName="feedback">
			    <div styleName="title" ref="title">Thanks for your feedback!</div>
			  </div>
			 )
		}
		else {
			return (
				<div styleName="feedback">
			    <div styleName="title" ref="title">Was the above helpful?</div>
			    <div styleName="how-improve" ref="howimprove">How can we improve it?</div>
			    <div className="button-group" ref="buttons">
			      <button styleName="as-button" data-value="5" type="button" onClick={this.handleYESClick}>YES</button>
			      <button styleName="as-button" data-value="1" type="button" onClick={this.handleNOClick}>NO</button>
			    </div>
			    <form ref="form">
			      <div>
			        <textarea ref="ta" aria-label="How can we improve it?" name="feedback"></textarea>
			      </div>
			      <button styleName="submit-button" type="button" onClick={this.onSubmit}>Submit</button>
			    </form>
			  </div>
			 )
		 }		
	}	
}

const mapStateToProps = state => {
	return  {complete : state.feedback.complete}
}

export default connect(mapStateToProps)(Feedback)