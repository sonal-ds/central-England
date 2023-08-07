import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LocationDocument } from "../../types";
import { Link } from "@yext/pages/components";


interface CarouselProps {
    c_carouselForFood:LocationDocument
}
const Carousels = (c_carouselForFood:CarouselProps)=>{

  const [index, setIndex] = useState(1);
  const chunkSize = 3;
 
const carouselForFood = c_carouselForFood?.c_carouselForFood?.c_carouselForFood

console.log(c_carouselForFood?.c_carouselForFood,'c_carouselForFood');
const sliderRef = useRef(null);

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };
  return (
    <>
    <div className="carousel-container">
     <Slider {...settings} ref={sliderRef}>
         {carouselForFood && carouselForFood?.map((item, index) => (
         <div key={index}>
             <img src={item.image1?.url} height={item.image1.height} width={item.image1.width}/>
          <h3>{item.title}</h3>
           <p>{ item.description1}</p>
           <Link href={item.cTA.link}>{item.cTA.label}</Link>
           </div>
      ))}
  </Slider>
  {carouselForFood && 
  <div className="carousel-buttons">
          <button onClick={goToPrevSlide}>Previous</button>
          <button onClick={goToNextSlide}>Next</button>
        </div>}
        </div>
    </>
  );

}

  export default Carousels