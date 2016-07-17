import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';

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
    this.handleLeftControlClick = this.handleLeftControlClick.bind(this);
    this.handleRightControlClick = this.handleRightControlClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.articleListIsFetched && !prevProps.articleListIsFetched) {
      this.state.imageGallery = findDOMNode(this.refs.imageGallery);
      this.state.number = this.state.imageGallery.children.length;
      const self = this;
      this.state.timer = setInterval(() => {self.swipeLeft();}, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
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
    // if (deltaX < 2 && deltaX > -2) {
    //   this.props.actions.fetchArticleDetail(this.props.topArticleItems[this.state.currentIndex].id);
    //   this.props.actions.hideSideBar();
    //   this.props.actions.showArticleDetail();
    // }
    if (deltaX > 20) this.swipeRight();
    if (deltaX < -20) this.swipeLeft();

    const self = this;
    self.state.timer = setInterval(() => {self.swipeLeft();}, 5000);
  }

  handleLeftControlClick() {
    this.swipeRight();
    clearInterval(this.state.timer);
    const self = this;
    this.setState({
      timer: setInterval(() => {self.swipeLeft();}, 5000)
    });
  }

  handleRightControlClick() {
    this.swipeLeft();
    clearInterval(this.state.timer);
    const self = this;
    this.setState({
      timer: setInterval(() => {self.swipeLeft();}, 5000)
    });
  }

  render() {
    return (
      <div className="top-article-slider">
        {
          this.props.articleListIsFetched ?
          <div ref="imageGallery" className="image-gallery">
          {
            this.props.topArticleItems.map((topArticleItem, index) => (
              <Link key={index}
              onClick={() => {
                this.props.actions.fetchArticleDetail(topArticleItem.id);
                this.props.actions.hideSideBar();
                this.props.actions.showArticleDetail();
              }}
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
              onTouchCancel={this.handleTouchEnd}
              className={
                classNames({
                  'current-image': (this.state.currentIndex === index),
                  'prev-image': (this.state.prevIndex === index),
                  'next-image': (this.state.nextIndex === index),
                  'animation': (this.state.animation === true)
                })
              }
              to={`/article/${topArticleItem.id}`}>
              <div className="image" style={{
                // backgroundImage: `-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${topArticleItem.image})`,
                // backgroundImage: `-webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5))),url(${topArticleItem.image})`,
                // backgroundImage: `-webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${topArticleItem.image})`,
                // backgroundImage: `-o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${topArticleItem.image})`,
                // backgroundImage: `-ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${topArticleItem.image})`,
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${topArticleItem.image.replace(/http:\/\/pic(\d)\.zhimg\.com/, 'https://zhihuproxy.daoapp.io/pic$1')})`
              }}/>
              <h1>{topArticleItem.title}</h1>
              </Link>
            ))
          }
          </div> : null
        }

        <button className="left" onClick={this.handleLeftControlClick}>&#10151;</button>
        <button className="right" onClick={this.handleRightControlClick}>&#10151;</button>

        <div className="indicator">
          <ul>
            {
              this.props.topArticleItems.map((topArticleItem, index) =>
                <li key={index} className={
                  classNames({
                    'current-index': (this.state.currentIndex === index)
                  })
                }>&#9679;</li>)
            }
          </ul>
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
  articleListIsFetched: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default TopArticleSlider;
