import React from 'react';

import QuestionAnswer from './QuestionAnswer.jsx';

const QuestionAnswerModule = (props) => {

    let list = [];

    props.qandas.map((c, k)  => {
      list.push(
        <QuestionAnswer content={c}/>
      )
    })

    return (
        list
    )
  }

export default QuestionAnswerModule