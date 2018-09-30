import React from 'react';
import {connect} from 'react-redux'

import { event } from '../../../GAHelper.jsx'

import { requestBulkDelete } from '../../../../actions/index.jsx'

// CSS
import '../../../../css/ContactForm.css';

class BulkDeleteForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {email: '', desc: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleDescChange(event) {
    this.setState({desc: event.target.value});
  }

  handleSubmit(e) {
    console.log("Email: " + this.state.email);
    console.log("Desc: " + this.state.desc);

    e.preventDefault();
    const { dispatch } = this.props
    this.props.dispatch(requestBulkDelete(this.state.email, this.state.desc))
    event("BULKDELETE", "SUBMIT");
  }

  render() {
    const { complete } = this.props

    if (complete) {
      return (
        <p>
          You'll soon receive a carefully assembled set of steps for you to delete away quite easily.
          <br/>
          Feel free to reach us at <b>contact@deletemydata.io</b> for any questions.
        </p>
       )
    }

    return (
      <div styleName="contact">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Your Email Address To Contact You" autoComplete='email' required/>
          <textarea type="text" value={this.state.desc} onChange={this.handleDescChange} placeholder="List all the accounts you want to delete"/>
          <input styleName="submit" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return  {complete : state.bulkdelete.complete}
}

export default connect(mapStateToProps)(BulkDeleteForm)