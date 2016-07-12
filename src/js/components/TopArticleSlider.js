import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Swiper from 'react-swiper';

import Image from './Image';

class TopArticleSlider extends Component {
  constructor() {
    super();
    this.state = {
      imageGallery: null,
      number: 0,
      currentIndex: 1,
      prevIndex: 0,
      nextIndex: 2,
      timer: null,
      animation: true
    };
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    this.handelTouchStart = this.handelTouchStart.bind(this);
    this.handelTouchEnd = this.handelTouchEnd.bind(this);
  }

  componentDidMount() {
    this.state.imageGallery = findDOMNode(this.refs.imageGallery);
    this.state.number = this.state.imageGallery.children.length;
    const self = this;
    this.state.timer = setInterval(() => {self.swipeLeft();}, 5000);
  }

  swipeLeft() {
    this.setState({
      currentIndex: (this.state.currentIndex === this.state.number - 1) ? 0 : (this.state.currentIndex + 1),
      prevIndex: (this.state.prevIndex === this.state.number - 1) ? 0 : (this.state.prevIndex + 1),
      nextIndex: (this.state.nextIndex === this.state.number - 1) ? 0 : (this.state.nextIndex + 1),
    });
  }

  swipeRight() {
    this.setState({
      currentIndex: this.state.currentIndex === 0 ? (this.state.number - 1) : (this.state.currentIndex - 1),
      prevIndex: this.state.prevIndex === 0 ? (this.state.number - 1) : (this.state.prevIndex - 1),
      nextIndex: this.state.nextIndex === 0 ? (this.state.number - 1) : (this.state.nextIndex - 1),
    });
  }

  handelTouchStart(e) {
    e.preventDefault();
    clearInterval(this.state.timer);

    //TODO: change to virtual DOM
    const currentImage = document.getElementsByClassName('current-image')[0];
    const computedCurrentImageStyle = window.getComputedStyle(currentImage);
    currentImage.style.left = computedCurrentImageStyle.getPropertyValue('left');

    const prevImage = document.getElementsByClassName('prev-image')[0];
    const computedPrevImageStyle = window.getComputedStyle(prevImage);
    prevImage.style.left = computedPrevImageStyle.getPropertyValue('left');

    const nextImage = document.getElementsByClassName('next-image')[0];
    const computedNextImageStyle = window.getComputedStyle(nextImage);
    nextImage.style.left = computedNextImageStyle.getPropertyValue('left');

    this.setState({
      animation: false
    });
  }

  handelTouchEnd() {
    const currentImage = this.state.imageGallery.children[this.state.currentIndex];
    currentImage.style.left = null;

    const prevImage = this.state.imageGallery.children[this.state.prevIndex];
    prevImage.style.left = null;

    const nextImage = this.state.imageGallery.children[this.state.nextIndex];
    nextImage.style.left = null;

    const self = this;
    self.state.timer = setInterval(() => {self.swipeLeft();}, 5000);

    this.setState({
      animation: true
    });
  }

  //TODO: add event listener to image/link/image gallery
  render() {
    return (
      <div className="top-article-slider">
        <div ref="imageGallery" className="image-gallery" onClick={this.handelTouchStart}>
          {
            this.props.topArticleItems.map((topArticleItem, index) => (
              <Link key={index} onClick={this.handelTouchStart} className={
                classNames({
                  'current-image': (this.state.currentIndex === index),
                  'prev-image': (this.state.prevIndex === index),
                  'next-image': (this.state.nextIndex === index),
                  'animation': (this.state.animation === true)
                })
              } to={`/article/${topArticleItem.id}`}>
                <Image src={topArticleItem.image} title={topArticleItem.title}/>
              </Link>
            ))
          }
        </div>
        <div className="control">
          <button type="button" onClick={this.handelTouchStart}>Touch Start</button>
          <button type="button" onClick={this.handelTouchEnd}>Touch End</button>
        </div>
      </div>
    );
  }
}

TopArticleSlider.propTypes = {
  topArticleItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  actions: PropTypes.object.isRequired
};

export default TopArticleSlider;
