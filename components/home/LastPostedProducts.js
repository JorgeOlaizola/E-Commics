import React, { Component } from "react";
import Slider from "react-slick";
import LastPostedProductCard from "./LastProductCard";


const LastPostedProducts =({lastProducts})=>{
    console.log(lastProducts)
    const settings = {
               dots: true,
               infinite: false,
               speed: 500,
               slidesToShow: 6,
               slidesToScroll: 6,
               initialSlide: 0,
               responsive: [
                 {
                   breakpoint: 1024,
                   settings: {
                     slidesToShow: 5,
                     slidesToScroll: 5,
                     infinite: true,
                     dots: true
                   }
                 },
                 {
                   breakpoint: 600,
                   settings: {
                     slidesToShow: 3,
                     slidesToScroll: 3,
                     initialSlide: 2
                   }
                 },
                 {
                   breakpoint: 480,
                  settings: {
                     slidesToShow: 2,
                     slidesToScroll: 1
                   }
                 },
                 {
                    breakpoint: 320,
                   settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
               ]
            }
    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:"center"
        }}>
                 <h2> Úlitimas publicaciones </h2>
                 <Slider {...settings}  >
                  {lastProducts && lastProducts.map(p=> (
                     <LastPostedProductCard product={p}></LastPostedProductCard>
                  ))}
                 </Slider>
               </div>
    )
}

export default LastPostedProducts;

