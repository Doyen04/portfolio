import style from "../styles/header.module.css"

import Logo from "../ui/logo"

export default function header() {
    return (
        <header className={style.header}>
            <Logo/>
            <div className={style.header_button_container}>
                <button className={style.buttons}>Download CV</button>
                <button className={style.buttons}>Connect </button>
            </div>

        </header>
    )
}