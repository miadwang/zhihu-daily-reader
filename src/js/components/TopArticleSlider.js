import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {findDOMNode} from 'react-dom';

import Slider from 'react-slick';
import Image from './Image';

class TopArticleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    };

    return (
      <div className="top-article-slider">
        <Slider {...settings}>
          {
            this.props.topArticleItems.map((topArticleItem, key) => (
              <div key={key}>
                <Link to={`/article/${topArticleItem.id}`}>
                  <Image src={topArticleItem.image} title={topArticleItem.title}/>
                </Link>
              </div>
            ))
          }
        </Slider>
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
