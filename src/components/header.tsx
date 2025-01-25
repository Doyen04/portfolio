import Link from "next/link"
import style from "../styles/header.module.css"

import Logo from "../ui/logo"

export default function header() {
    return (
        <header className={style.header}>
            <Logo/>
            <div className={style.header_button_container}>
                <button className={style.buttons}>Download CV</button>
                <button className={style.buttons}>
                    <Link className={style.links} href={"https://www.linkedin.com/in/sola-opeyemi-155729258"} rel="noopener noreferrer" target="_blank">Connect</Link>  
                </button>
            </div>

        </header>
    )
}