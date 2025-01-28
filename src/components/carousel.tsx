"use client"

import style from "../styles/carousel.module.css"

import { useEffect, useRef, } from "react";
import gsap from "gsap";

const Carousel: React.FC = () =>{

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current as HTMLDivElement;

        if(!carousel) return;
        const totalWidth: number =  carousel.scrollWidth;
        
        Array.from(carousel.children).forEach((child) => {
            const clone: Node = child.cloneNode(true); 
            carousel.appendChild(clone); 
        });

        gsap.to(carousel.children, {
            x: -(totalWidth) ,
            duration: totalWidth / (100 * 0.90), 
            ease: "linear",
            repeat: -1,
        });

    }, [carouselRef]);

    return (
        <div className={style.carousel_container} ref={carouselRef}>
            <p >HTML</p>
            <p>CSS</p>
            <p>JAVASCRIPT</p>
            <p>PYTHON</p>
            <p>CPP</p>
            <p>WEB</p>
            <p>BACKEND</p>
            <p>DJANGO</p>
            <p>FLASK</p>
            <p>PRISMA</p>
            <p>DJANGO-ORM</p>
            <p>REACT</p>
            <p>NEXTJS</p>
        </div>
    )
}

export default Carousel;