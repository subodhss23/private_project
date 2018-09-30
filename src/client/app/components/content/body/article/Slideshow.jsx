import React, {Component}  from 'react';
import Slider from 'react-slick'
import ReactMarkdown from 'react-markdown';

import {eventWithValue} from '../../../../components/GAHelper.jsx'

import '../../../../css/Slideshow.css'

class SampleNextArrow extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    eventWithValue("SLIDES", "NEXT", this.props.currentSlide);
    this.props.onClick();
  }

  render() {
    const {className, style, onClick} = this.props
    return (
      <div
        className={className}
        onClick={this.onClick}
      >❯</div>
    );
  }
}

class SamplePrevArrow extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    eventWithValue("SLIDES", "PREV", this.props.currentSlide)
    this.props.onClick();
  }

  render() {
    const {className, style, onClick} = this.props
    return (
      <div
        className={className}
        onClick={this.onClick}
      >❮</div>      
    );
  }
}

function LinkRenderer(props) {
  return <a href={props.href} target="_blank">{props.children}</a>
}

const List = (props) => {
  const array = props.arr;
  let rows = []

  if (array != undefined) {
    for (var i = 0; i < array.length; i++) {
      rows.push(<li key = {i}>
                  <ReactMarkdown source={array[i]} renderers={{link: LinkRenderer}}/>
                  <br/>
                </li>
                )
    }
  }

  return rows
};

class Slideshow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {  
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    let slides = null;
    if (this.props.slides) {
      const imgStyle = {
        maxHeight: '420px',
        maxWidth: '630px'
      }
      slides = this.props.slides.map((img, index) => (
        <div key={index}>
          <img src={img.url} style={imgStyle} alt={img.alt} title={img.title}/>
        </div>
      ))
    }

    let before = null;
    if (this.props.before != null) {
      before = (
          <li>
              {this.props.before}
              <br/>
              <br/>
          </li>
        );
    }

    let after = null;
    if (this.props.after != null) {
      after = (
          <li>
              {this.props.after}
              <br/>
              <br/>
          </li>
        );
    }

    return (
      <div styleName="howTo">
        <div styleName="module">
          <div>
            <Slider {...settings}>
              {slides}
            </Slider>
          </div>
          <div styleName="right">
            <ul>
              {before}
              <List arr={this.props.steps} />
              {after}              
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Slideshow