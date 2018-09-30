import React from 'react';
import { Link } from 'react-router-dom'

// CSS
import '../../../../css/TopSites.css'

const TopSites = (props) => {

	return (
		<section styleName="top-sites">
			{
				props.sites.map((site, index) => {
					let href = site.instructions[0].link;

					let breaches = null;
					if (site.breaches) {
						breaches = (
								<li><h2>{site.breaches}M</h2> breached</li>
							)
					}

					return (
						<div key={index} styleName="tile">
							<Link to={href} styleName="box1">
								<div styleName="icon">
									<img src={site.logo} alt="Logo" height="111" width="111"/>
								</div>
							</Link>
							<div styleName="box2">
								<a key={index} href={site.delete}  styleName="deleteIcon">
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
										<image id="delete_icon_copy_5" data-name="delete icon copy 5" width="32" height="32" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABblBMVEXySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEj0Xl782Nj95+f95ub6t7f3kJD////zUVH3k5P/+fn4nZ36urrzU1P+9PT2fn70Z2f3kZH6vr75sbH4mJj3ior2hYX//f3zWVn94uL+8/P4oaH81NT6tLT2gYH7zc3++Pj1bGz7wcH2hIT96en3jo77ycn3iYn2f3/0Zmb0a2v7y8v4np7/+/v4l5f0X1/ySkr81dX1dXUAAAACVkHKAAAARnRSTlMAGU51mr3U4u4zjdcNdNUQf+0BYOskxCNV8YwGpbekiIlUIvDDYeoM2ts6j5DYGhtQe6G+1tHc6BzZO4ASiouBd5vl6d7O5Os1gAAAAAFiS0dEeaHc1NAAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfiBR4BGwxOPFJzAAACcElEQVRYw62X91/TQBjGr2U0pU3pwFKmQkm1WKTLBSqg+Mo6aRQFsdi4RZzg+vNNUjtyI7n0fH5p+sn7fHuj9977IsRRINjXPzAYUpTQ4EB/XzCAfCk8FAFCkaGwqDuqxoCpmBoVsA/HE8BVIj7sYU+mRsBVI6mkm/9cGjyVHuX7M2PefoCxDG/44yJ2S+PMaUxMivoBJicY/ilxP8AURUhO+/EDTJOzOO/PD3DB6Z/x6wdw7MVslg54sLHZ0dY29T4727UAc4xf2MEOPaQC5jrLkGINcRfX9JYeYfyYjtDa5yfHBuy1n58wAbnWyYoTL57u7Js6wLX9lp5hfGh9PndOJN70XyTOb/0Ic7X1ojsy0cwPKjGABq4ZHB3hl45Q1d6CSwRgD+/y9v4Vfu34nrc2Yh56B8C8CbhMA1xEAAomICIDWEDoCjXON/UGfltn6B3err8nghdRUGSq/MUpopIcoITKXMAHwzyCx4ZhPn40TjiAMqpwAZ/wAcBnjNtWFqCCqnKAqygkB7iGFDnAdXmA9BSkF1F6G8tygLLLX1kIUEJFOUARLcoBbiC0IAO4aWakggzASmlLMoAlK63newfYaZ26WHwA7IsFRZVeAUqUfbn+AxzrXwC+6rr5eKh/YwGWede7YFLN3WoVCBoR+R1v6LROz/CJI0zrlDhpJ+AH51o6+9kdle6q9EadRdav08YmQ7//dAdlHUV3BnyLKLlv+/Xf+d+lrnSxLV/uyzccSLrlQfJNlzkNzavt01zbPutkLbs1nitejaedH9Qq214Van1thQtUnssXhJvvpgLB1bVK7K5yb/1+ZW2V3/7/BQI9jLWvttaEAAAAAElFTkSuQmCC"/>
									</svg>								
								</a>
							</div>
							<Link to={href} styleName="box3">
								<ul styleName="title">
										<li><b>{site.name}</b></li>
										{breaches}
								</ul>
							</Link>
						</div>							
					)
				})
			}				
		</section>
	)
}
	
export default TopSites;