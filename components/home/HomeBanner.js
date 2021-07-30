import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

function HomeBanner() {
    return (
        <div>
            <div style={{position: "absolute", zIndex: 60, color: "white", paddingLeft: "20px"}}><h1 style={{textShadow: "0px 0px 20px black", fontWeight: 700}}>Bienvenido a ecommics</h1></div>
            <div style={{position: "relative", maxWidth: '800px', height: "300px", zIndex: 50, top: "30px", left: "20px"}}>
            <Image 
            // style={{position: "relative"}}
            src={'/batman.jpg'}
            // width={'1200px'}
            // height={'750px'}
            layout="fill"
            objectFit="cover"
            alt={'batman'}
            />
            </div>
            <div  style={{position: "relative", maxWidth: '1000px', height: "350px", zIndex: 30, top: "-300px", marginBottom: "-280px"}}>
                <Image 
                src={'/batman-blur.jpg'}
                layout="fill"
                objectFit="cover"
                alt={'batman'}
                />
            </div>   
        </div>
    )
}

export default HomeBanner;
