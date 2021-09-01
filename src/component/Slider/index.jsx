import React from 'react';
import SliderSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Slider.module.scss';
import { Link } from 'react-router-dom';

function Slider() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToScroll: 0,
    swipe: true,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img width={370} height={270} src="/img/slider/sale.png" alt="sale" />
        <Link to="/orders">
          <button className="greenButton">
            Перейти к покупкам
            <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </Link>
      </div>
      <SliderSlick {...settings}>
        <div>
          <img src="/img/slider/1.jpg" alt="slide1" />
        </div>
        <div>
          <img src="/img/slider/2.jpg" alt="slide1" />
        </div>
        <div>
          <img src="/img/slider/3.jpg" alt="slide1" />
        </div>
        <div>
          <img src="/img/slider/5.jpg" alt="slide1" />
        </div>
        <div>
          <img src="/img/slider/6.jpg" alt="slide1" />
        </div>
      </SliderSlick>
    </div>
  );
}

export default Slider;
