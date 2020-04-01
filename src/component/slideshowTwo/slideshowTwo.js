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
    // direction: 'vertical',
    loop: true,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 70,
      stretch: 30,
      depth: 50,
      modifier: 1,
      // slideShadows : true,
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
    <>
      <div className="swiper-container">
        <p data-aos="fade-up" data-aos-duration="1500" className="slide2-p">“No one has ever become poor by giving”</p>
        <p data-aos="fade-up" data-aos-duration="1500" className="slide2-p">“It's not how much we give but how much love we put into giving”</p>
        <Swiper {...params} data-aos="fade-up" data-aos-duration="1500"  >
          <div  class="swiper-slide"><img  className="slide-img"  src={img1}/></div>
          <div class="swiper-slide"><img className="slide-img"  src={img2}/></div>
          <div class="swiper-slide"><img className="slide-img"  src={img3}/></div>
          <div class="swiper-slide"><img className="slide-img"  src={img4}/></div>
          <div class="swiper-slide"><img className="slide-img"  src={img1}/></div>
          <div class="swiper-slide"><img className="slide-img"  src={img6}/></div>
          <div class="swiper-slide"><img className="slide-img"  src={img7}/></div>
        </Swiper>
      </div>
      <p data-aos="fade-up" data-aos-duration="1200" className="slide2-p">“There is no exercise better for the heart than reaching down and lifting people up”</p>
      <p  data-aos="fade-up" data-aos-duration="1200" className="slide2-p">“When we give cheerfully and accept gratefully, everyone is blessed”</p>
      <div className="clear-div"></div>
    </>
  );
};

export default SimpleSwiperWithParams;