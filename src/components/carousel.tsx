"use client"

import style from "../styles/carousel.module.css"

import { useEffect, RefObject, useRef } from "react";
import gsap from "gsap";

export default function Carousel() {

    const carouselRef: RefObject<HTMLElement> | RefObject<null> = useRef(null);
    // const cloneRef: RefObject<HTMLElement> | RefObject<null> = useRef(null);

    useEffect(() => {
        const marquee :HTMLDivElement | null = carouselRef.current;

        // Calculate the total width of all children
        let totalWidth: number = 0;
        totalWidth += marquee.scrollWidth;
        
        Array.from(marquee.children).forEach((child) => {
            const clone: Node = child.cloneNode(true); // Clone each child
            marquee.appendChild(clone); // Append the clone to the marquee
        });

        // Animate the marquee
        gsap.to(marquee.children, {
            x: -(totalWidth) ,
            duration: totalWidth / (100 * 0.90), // Adjust speed based on total width
            ease: "linear",
            repeat: -1, // Infinite loop
        });

    }, []);

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