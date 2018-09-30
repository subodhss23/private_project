import React from 'react';
import {connect} from 'react-redux'

import { showSubscribeModal } from '../actions/index.jsx'
import { eventWithLabel } from './GAHelper.jsx'

import Subscribe from './content/body/home/Subscribe.jsx'

import '../css/Beta.css';

class Beta extends React.Component {

  constructor(props) {
    super(props);
    this.onSubscribeClick = this.onSubscribeClick.bind(this);
  }

  onSubscribeClick(e) {
    eventWithLabel("HOME", "CLICK", "BETA_SUBSCRIBE");
    this.props.dispatch(showSubscribeModal())
  }

  render() {
    const { showSubscribe } = this.props

    let subscribe = null;
    if (this.props.showSubscribe) {
      subscribe = <Subscribe />
    }

    return (
      <div>
        {subscribe}
        <div styleName="beta-ribbon"><a onClick={this.onSubscribeClick}> Thank you for being an early user of DeleteMyData. We are in Beta. Click here to subscribe for new products</a></div>
      </div>
    )
  }
}

// export default Beta

const mapStateToProps = state => {
  return  {showSubscribe : state.home.show}
}

export default connect(mapStateToProps)(Beta)
