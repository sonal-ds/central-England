import React from 'react';
import Slider from 'react-slick';

const CarouselComponent = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <img src={slide.image1.url} alt={slide.title1} />
          <h3>{slide.title1}</h3>
          <p>{slide.description1}</p>
          <a href={slide.cTA.link} target="_blank" rel="noopener noreferrer">
            {slide.cTA.label}
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
