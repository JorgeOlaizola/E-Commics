import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getProducts, searchByUser, getProductsByUser } from '../store/actions/productActions';

import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from 'next/image'
// import axios from 'axios';


function ImageSlider() {
    // const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const products = useSelector(state => state.product.products);

    // const images = []
    // userProducts.forEach(p => images.push(p.image[0]))
    // const userProducts= products.filter(p => p.user._id === userData._id)
    // console.log(userProducts)

  //   useEffect(() => {
  //     dispatch(getProductsByUser(data))
  // }, [])


  // const data = {
  //       "user" : `${userData._id}`,
  //       "category": "",
  //       "score" : {
  //           "start":1,
  //           "end": 4
  //       },
  //        "price" : {
  //           "start":0,
  //           "end": 0
  //       },
  //       "search":{
  //           "in":"title",
  //           "text":""
  //       },
  //       "order":{
  //           "in": "price",
  //           "or": 1
  //       },
  //       "page": 1
  //   }

// async function getUserdata(data) {
//   const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products/get`, data);
//   const userProductsRes = await res.data
//   console.log(userProductsRes)
//   return userProductsRes
// }

//   getUserdata(data)


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
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    dots: true,
    centerMode: true,
    centerPadding: '0px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <div className="SliderContainer">
      <Slider {...settings}>
        {products.map((img, idx) => (
          <div key={img._id} className={idx === imageIndex ? "slide activeSlide" : "slide"}>
          {/* <Link href={`/detail/${img._id}`} passHref replace >
            <Image src={img.image} alt={img.title} style={{cursor: "pointer"}}/>
            </Link> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;

