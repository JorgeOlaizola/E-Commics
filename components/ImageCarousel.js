import React from 'react'

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getProducts, searchByUser, getProductsByUser } from '../store/actions/productActions';
import styled from 'styled-components'
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from 'next/image'

const ImageContainer = styled.img`

z-index:9000;
margin: 0.5rem;
`
export default function ImageCarousel({allImages}) {
    // const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const products = useSelector(state => state.product.products);
    
    
    const NextArrow = ({ onClick }) => {
        return (
            <div className="arrow next" onClick={onClick}>
                <FaArrowRight />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev" onClick={onClick}>
                <FaArrowLeft />
            </div>
        );
    };

    const [imageIndex, setImageIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        fade: true,
        cssEase: 'linear',
        arrows:false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    };

    return (
        <div className="SliderContainer">
            <Slider {...settings}>
                {allImages && allImages.length  && allImages.map((img, idx) => 
                    {
                    return <div key={img + idx} className={idx === imageIndex ? "slide activeSlide" : "slide"}>

                    <ImageContainer src={img} />
                    </div>}
                )}
            </Slider>
        </div>
    );
}




