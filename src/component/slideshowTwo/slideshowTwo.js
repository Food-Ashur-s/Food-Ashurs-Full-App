/* eslint-disable no-unused-vars */
import React from 'react';
import './slideshowTwo.scss';
// import 'swiper/swiper.scss';
import Swiper from 'react-id-swiper';
import img1 from '../../assets/img-home-1.jpg';
import img2 from '../../assets/img-home-2.jpg';
import img3 from '../../assets/img-home-3.jpg';
import img4 from '../../assets/img-home-4.jpg';
import img6 from '../../assets/img-home-6.jpg';
import img7 from '../../assets/img-home-7.jpg';
const SimpleSwiperWithParams = () => {
  const params = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 70,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    },
  };

  return(
    <div className="swiper-container">
      <Swiper {...params} >
        <div class="swiper-slide"><img className="slide-img"  src={img1}/></div>
        <div class="swiper-slide"><img className="slide-img"  src={img2}/></div>
        <div class="swiper-slide"><img className="slide-img"  src={img3}/></div>
        <div class="swiper-slide"><img className="slide-img"  src={img4}/></div>
        <div class="swiper-slide"><img className="slide-img"  src={img1}/></div>
        <div class="swiper-slide"><img className="slide-img"  src={img6}/></div>
        <div class="swiper-slide"><img className="slide-img"  src={img7}/></div>
      </Swiper>
    </div>
  );
};

export default SimpleSwiperWithParams;