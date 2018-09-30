import React from 'react';

import {eventWithLabel} from '../../../GAHelper.jsx'

//CSS
import '../../../../css/ActionButton.css'

class ActionButton extends React.Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		eventWithLabel("ACTION", "CLICK", this.props.action.text);
	}

	render() {
		return (
			<a styleName="action-button" href={this.props.action.link} target="_blank" onClick={this.onClick}>
        <p styleName="name">{this.props.action.text}</p>
      </a>
		)
	}
}

export default ActionButton