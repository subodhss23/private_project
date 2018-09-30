import React from 'react';

import { event } from '../../../GAHelper.jsx'

class References extends React.Component {
  
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.references) {
      event("REFERENCES", "CLICK")  
    }
    else  if (this.props.breaches) {
      event("DATA-BREACHES", "CLICK")  
    }
    else  if (this.props.relatedAccounts) {
      event("RELATED-ACCOUNTS", "CLICK")  
    }
  }

  render() {

    return (
      <div className="references">
        <h2>{this.props.title}</h2>
        <ol>
        {
          this.props.list.map((p, index)  => (
            <li key = {index}>
              <a href={p.link} target="_blank" onClick={this.onClick}>
                {p.text}
              </a>
            </li>
          ))
        }
        </ol>
      </div>
    )
  }
}

export default References