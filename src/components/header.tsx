import Link from "next/link"
import style from "../styles/header.module.css"

import sendicon from "../assets/send-50.png"

import Logo from "../ui/logo"
import Image from "next/image"

export default function header() {
    return (
        <header className={style.header}>
            <Logo />
            <div className={style.header_button_container}>
                <button className={style.buttons }>
                    <p>Download CV</p>
                    <Image src={sendicon} alt="arrow" width={20} height={20} />
                </button>
                <button className={style.buttons}>
                    <Link className={style.links} href={"https://www.linkedin.com/in/sola-opeyemi-155729258"} rel="noopener noreferrer" target="_blank">Connect</Link>
                </button>
            </div>

        </header>
    )
}