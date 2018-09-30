import React from 'react';
import { Link } from 'react-router-dom'

// CSS
import '../.././../css/MenuItem.css'

class MenuItem extends React.Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleMouseHover = this.handleMouseHover.bind(this);

    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {

    // TODO: we need to have this backgroundColor for the `box` when we are on the page
    // not just on hover.
    var style = null;
    if (this.props.highlight || this.state.isHovering) {
    	style = {
    		"backgroundColor": "#f24848"
    	}
    }
    else {
    	style = {
    		"backgroundColor": "transparent"
    	}
    }

		return (
			<Link to={this.props.link} styleName="X" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
				<div styleName="box" style={style}></div>		
				<div styleName="item">{this.props.name}</div>
			</Link>
		)
	}
}

export default MenuItem