import React from 'react';

import Header from './content/header/Header.jsx';
import Main from './content/body/Main.jsx';
import Footer from './content/footer/Footer.jsx';

import Beta from './Beta.jsx'

// CSS
import '../css/Wrapper.css';

const Wrapper = () => {	
	return (
		<div styleName="wRow">
			<div>
				<Beta/>
				<div styleName="wCol">
					<div></div>
					<Header />
					<div></div>
				</div>
			</div>
			<div styleName="wCol">
				<div></div>
				<Main />
				<div></div>
			</div>
			<div styleName="footer">
				<div styleName="wCol">
					<div></div>
					<Footer />
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default Wrapper