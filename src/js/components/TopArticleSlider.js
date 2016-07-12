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
      nextIndex: 2
    };
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
  }

  componentDidMount() {
    this.state.imageGallery = findDOMNode(this.refs.imageGallery);
    this.state.number = this.state.imageGallery.children.length;
    var self = this;
    setInterval(() => {self.swipeLeft();}, 3000);
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

  render() {
    return (
      <div className="top-article-slider">
        <div ref="imageGallery" className="image-gallery">
          {
            this.props.topArticleItems.map((topArticleItem, index) => (
              <Link key={index} className={
                classNames({
                  'current-image': (this.state.currentIndex === index),
                  'pre-image': (this.state.prevIndex === index),
                  'next-image': (this.state.nextIndex === index)
                })
              } to={`/article/${topArticleItem.id}`}>
                <Image src={topArticleItem.image} title={topArticleItem.title}/>
              </Link>
            ))
          }
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
