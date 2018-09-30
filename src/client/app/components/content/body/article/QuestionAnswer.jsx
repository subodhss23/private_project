import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../../../../css/QuestionAnswer.css'

function LinkRenderer(props) {
  return <a href={props.href} target="_blank">{props.children}</a>
}

const QuestionAnswer = (props) => (
		<div styleName="qaWrapper">
			<div styleName="qWrapper">
				<div styleName="q">
	          <span>Question:</span>
	      </div>
				<div styleName="question">
					{props.content.question}
	      </div>
			</div>
			<div styleName="aWrapper">
				<div styleName="a">
	          <span>Answer:</span>
	      </div>
				<div styleName="answer">
					<ReactMarkdown source={props.content.answer} renderers={{link: LinkRenderer}}/>
					<span styleName="createdAt">
						Last updated on {props.content.createdAt}
					</span>
	      </div>
			</div>
		</div>
	)

export default QuestionAnswer