import React from 'react';

import '../../../../css/T2Remember.css'

const List = (props) => {
  const array = props.arr;
  let rows = []

  if (array != undefined) {
    for (var i = 0; i < array.length; i++) {
      rows.push(<li key = {i}>
                  {array[i]}
                  <br/>
                  <br/>
                </li>
                )
    }
  }

  return rows
};

const T2Remember = (props) => (
	  <div>
      <section styleName="heading">      
        <h2>Things To Remember</h2>
      </section>
      <div styleName="module">
        <ul>
          <List arr={props.t2r} />
        </ul>
      </div>
    </div>

)

export default T2Remember;