import style from "../styles/page.module.css"

import Header from "@/components/header"
import Logo from "../ui/logo"

export default function Home() {
    return (
        <div className={style.homepage}>
            <Header />
            <section className={style.about_site}>
                <Logo />
            </section>
        </div>
    )
}