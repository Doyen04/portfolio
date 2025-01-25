"use client"

import style from "../styles/carousel.module.css"
import { useEffect, useRef, RefObject } from "react"
import { gsap } from "gsap"

export default function Carousel(){
    const carouselRef: RefObject<HTMLElement> | RefObject<null>= useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items: HTMLCollectionOf<HTMLElement> = (carouselRef).current?.children ;
            if (!items) return;

            const totalWidth: number = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0);

            gsap.to(items, {
                x: `-=${totalWidth}`,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                },
                duration: 20,
                repeat: -1,
                ease: "linear"
            });
        }, carouselRef);

        return () => ctx.revert();
    }, []);

    return(
        <div className={style.carousel_container} ref={carouselRef}>
            <p>HTML</p>
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