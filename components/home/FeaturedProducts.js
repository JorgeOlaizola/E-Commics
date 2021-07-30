import React, { Component } from "react";
import Slider from "react-slick";
import FeaturedProductCard from "./FeaturedProductCard";



const FeaturedProducts =({ratingProducts})=>{
    console.log(ratingProducts)
    const settings = {
               dots: true,
               infinite: false,
               speed: 500,
               slidesToShow: 3,
               slidesToScroll: 3,
               initialSlide: 0,
               responsive: [
                 {
                   breakpoint: 1024,
                   settings: {
                     slidesToShow: 3,
                     slidesToScroll: 3,
                     infinite: true,
                     dots: true
                   }
                 },
                 {
                   breakpoint: 900,
                   settings: {
                     slidesToShow: 2,
                     slidesToScroll: 2,
                     initialSlide: 2
                   }
                 },
                 {
                   breakpoint: 625,
                  settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1
                   }
                 },
                
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
                     {ratingProducts && ratingProducts.map(p=>(
                         <FeaturedProductCard key={p._id} product={p}></FeaturedProductCard>

                     ))}

                 </Slider>
               </div>
    )
}

export default FeaturedProducts;