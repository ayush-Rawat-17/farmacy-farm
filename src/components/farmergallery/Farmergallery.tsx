"use client"
import React from 'react'
import g1 from "../../images/video-image1.svg"
import g2 from "../../images/video-image2.svg"
import g3 from "../../images/video-image3.svg"
import g4 from "../../images/g4.svg"
import g5 from "../../images/g5.svg"
import g6 from "../../images/g6.svg"
import Image from 'next/image'




import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from 'react';
import Slider from "react-slick"




const DUMMY_DATA={text:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. Quos unde voluptas illo deserunt unde. At totam est explicabo earum voluptas. Minus consequatur voluptatem non. Quis voluptatem et et sint. Neque aliquam vestibulum morbi blandit.",
galleryImages:[ g1 ,g2,  g3, g4, g5, g6]}



const Farmergallery = () => {

    const slider = useRef<any>(null)
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
              dots: true

  
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
            dots: true

          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
            dots: true

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true

          }
        }
      ]
    };



  
    return (


<div className="relative  bg-cover bg-center bg-videobg  mt-[6.5%] pt-[6%]">



<div className="flex flex-col px-[3.5%] ">
        <h1 className="text-white text-4xl font-bold mb-[2rem]">Our Gallery </h1>
        <p className="text-white text-base leading-7  mb-[2rem] ">{DUMMY_DATA.text}</p>
</div>
<div className='flex justify-center items-center gap-0 md:gap-[20px] pb-[50px]  px-[3.5%] '>
    
    <div className='back w-[100%]  mt-[20px] pb-[50px]'>
      <Slider ref={slider} {...settings}
        dotsClass={`slick-dots `}
        arrows={false}
        className='!w-[100%] pb-[50px]'>
        {DUMMY_DATA.galleryImages.map((item: any,idx:number) => {
          return <div key={idx} className=''>
            <div><Image src={item} alt=" "/></div>
             
              
          </div>
        })}
      </Slider>
    </div>
  </div>


</div>
      );
  
}

export default Farmergallery