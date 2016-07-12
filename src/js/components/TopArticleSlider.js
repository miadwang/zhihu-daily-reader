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
      animation: true,
      touchState: {
        touchStartXPos: 0,
        currentImageLeft: 0,
        prevImageLeft: 0,
        nextImageLeft: 0
      }
    };
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    this.getActiveImages = this.getActiveImages.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  componentDidMount() {
    this.state.imageGallery = findDOMNode(this.refs.imageGallery);
    this.state.number = this.state.imageGallery.children.length;
    const self = this;
    this.state.timer = setInterval(() => {self.swipeLeft();}, 2000);
  }

  getActiveImages() {
    return {
      currentImage: this.state.imageGallery.children[this.state.currentIndex],
      prevImage: this.state.imageGallery.children[this.state.prevIndex],
      nextImage: this.state.imageGallery.children[this.state.nextIndex]
    };
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

  handleTouchStart(e) {
    e.preventDefault();
    clearInterval(this.state.timer);

    const activeImages = this.getActiveImages();
    activeImages.currentImage.style.left = activeImages.currentImage.offsetLeft + 'px';
    activeImages.prevImage.style.left = activeImages.prevImage.offsetLeft + 'px';
    activeImages.nextImage.style.left = activeImages.nextImage.offsetLeft + 'px';

    this.setState({
      animation: false,
      touchStartXPos: e.touches[0].pageX,
      currentImageLeft: activeImages.currentImage.offsetLeft,
      prevImageLeft: activeImages.prevImage.offsetLeft,
      nextImageLeft: activeImages.nextImage.offsetLeft
    });
  }

  handleTouchMove(e) {
    const xPos = e.changedTouches[0].pageX;
    const deltaX = xPos - this.state.touchStartXPos;

    const activeImages = this.getActiveImages();
    activeImages.currentImage.style.left = (this.state.currentImageLeft + deltaX) + 'px';
    activeImages.prevImage.style.left = (this.state.prevImageLeft + deltaX) + 'px';
    activeImages.nextImage.style.left = (this.state.nextImageLeft + deltaX) + 'px';
  }

  handleTouchEnd(e) {
    const xPos = e.changedTouches[0].pageX;
    const deltaX = xPos - this.state.touchStartXPos;
    const activeImages = this.getActiveImages();

    activeImages.currentImage.style.left = null;
    activeImages.prevImage.style.left = null;
    activeImages.nextImage.style.left = null;

    this.setState({
      animation: true
    });

    if (deltaX > 20) this.swipeRight();
    if (deltaX < -20) this.swipeLeft();

    const self = this;
    self.state.timer = setInterval(() => {self.swipeLeft();}, 2000);
  }

  //TODO: add event listener to image/link/image gallery.
  render() {
    return (
      <div className="top-article-slider">
        <div ref="imageGallery" className="image-gallery" onClick={this.handleTouchStart}>
          {
            this.props.topArticleItems.map((topArticleItem, index) => (
              <Link key={index} onClick={this.handleTouchStart} className={
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
          <div className="touch" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>TouchTouchTouchTouchTouchTouch</div>
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
