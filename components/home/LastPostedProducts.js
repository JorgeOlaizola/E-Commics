import React, { Component } from "react";
import Slider from "react-slick";
import LastPostedProductCard from "./LastProductCard";


const LastPostedProducts =({lastProducts})=>{
    
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
                   breakpoint: 790,
                   settings: {
                     slidesToShow: 4,
                     slidesToScroll: 4,
                     initialSlide: 2
                   }
                 },
                 {
                   breakpoint: 620,
                  settings: {
                     slidesToShow: 3,
                     slidesToScroll: 1
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
                    breakpoint: 340,
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
                 <h2> Mas valorados </h2>
                 <Slider {...settings}  >
                  {lastProducts && lastProducts.map(p=> (
                     <LastPostedProductCard key={p._id} product={p}></LastPostedProductCard>
                  ))}
                 </Slider>
               </div>
    )
}

export default LastPostedProducts;

