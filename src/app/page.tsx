import React from "react";
import style from "../styles/page.module.css"

import Header from "@/components/header"
import Carousel from "@/components/carousel"

import FloatNav from "@/ui/floatNavBar"
import Logo from "@/ui/logo"
import GetInTouch from "@/ui/getInTouch"


export default function Home(): JSX.Element {
    return (
        <div className={style.homepage}>
            <FloatNav />
            <Header />
            <section className={style.about_site}>
                <Logo />
                <p className={style.site_description}>
                    Radically Better,<br/>
                    Observability Stack.
                </p>
                <p className={style.site_sub_description}>
                    We ship and deliver higher quality software. By taking <br/>
                    advantage of new tools/trends in tech.
                </p>
                <GetInTouch/>
                
            </section>
            <Carousel/>
        </div>
    )
}