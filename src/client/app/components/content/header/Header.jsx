import React from 'react';
import { Link } from 'react-router-dom'

import MenuItem from './MenuItem.jsx'

// CSS
import h from '../../../css/Header.css';

class Header extends React.Component {

	render() {

		let homeHigh = false;
		let supportHigh = false;
		if (window.location.pathname == "/") {
			homeHigh = true;
		}
		else if (window.location.pathname == "/support") {
			supportHigh = true;
		}

		return (
				<header styleName="h.header">
					<div styleName="h.left">
						<Link to="/" styleName="h.leftBrandContainer">
							<div styleName="h.logo">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221.57 240.79"><g id="Layer_2" data-name="Layer 2"><g id="Layer_6" data-name="Layer 6"><rect styleName="cls-1" x="49.6" y="49.6" width="12.4" height="12.4"/><rect styleName="cls-1" x="62" y="12.4" width="12.4" height="12.4"/><rect styleName="cls-1" x="49.6" y="74.4" width="12.4" height="12.4"/><path styleName="cls-1" d="M86.81,49.6v4.93H93a86.49,86.49,0,0,1,18.64,1.84V49.6H99.21V37.2H62V49.6H86.81Z"/><rect styleName="cls-1" x="86.81" y="12.4" width="12.4" height="12.4"/><polygon styleName="cls-1" points="12.4 86.81 0 86.81 0 111.61 12.4 111.61 12.4 99.21 12.4 86.81"/><polygon styleName="cls-1" points="24.8 49.6 12.4 49.6 12.4 62 12.4 74.4 24.8 74.4 24.8 62 24.8 49.6"/><rect styleName="cls-1" x="49.6" y="24.8" width="12.4" height="12.4"/><polygon styleName="cls-1" points="37.2 37.2 37.2 24.8 24.8 24.8 12.4 24.8 12.4 37.2 24.8 37.2 37.2 37.2"/><polygon styleName="cls-1" points="37.2 86.81 37.2 74.4 24.8 74.4 24.8 86.81 24.8 99.21 37.2 99.21 49.6 99.21 49.6 86.81 37.2 86.81"/><polygon styleName="cls-1" points="24.8 136.41 37.2 136.41 37.2 124.01 37.2 111.61 24.8 111.61 12.4 111.61 12.4 124.01 24.8 124.01 24.8 136.41"/><path styleName="cls-2" d="M215.66,72.93a105.32,105.32,0,0,0-19-38.6A85.92,85.92,0,0,0,163.35,8.87,88.2,88.2,0,0,0,148.81,4V12.4h-12.4V24.8H124V12.4h12.4V1.66A185.48,185.48,0,0,0,110.54,0H99.21V12.4h12.4V49.6H124V60.73a35.16,35.16,0,0,1,10.35,7.93q12.48,14.11,12.48,52.39,0,28.92-5.59,41.8t-15.43,18.07q-9.85,5.18-33.18,5.17H74.4V124H62v-12.4H74.4V86.81H62v12.4H49.6v37.2H62v12.4H49.6v-12.4H37.2v12.4H12.4V124H0V240.79H110.54q19.88,0,44.35-6.57,17.9-4.77,33.5-19.13a99.16,99.16,0,0,0,24.4-35.65q8.78-21.27,8.78-59.87A179.15,179.15,0,0,0,215.66,72.93ZM148.81,49.6h-12.4V37.2h12.4Z"/><rect styleName="cls-1" x="37.2" y="62" width="12.4" height="12.4"/></g></g></svg>
							</div>
							<div styleName="h.name">
							eleteMyData
							</div>
						</Link>
					</div>
					<div styleName="h.right">
						<MenuItem link="/" name="HOME" highlight={homeHigh}/>
						<MenuItem link="/support" name="SUPPORT" highlight={supportHigh}/>
					</div>
				</header>
		)
	}
}


export default Header