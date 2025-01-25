import style from "./ui-style/logo.module.css"

import logo from "../assets/bit2.png"
import Image from "next/image"

export default function Logo(){
    return(
        <button className={style.logo}>
            <Image src={logo} alt="logo" width={20} height={20}/>
            ByteBandit
            </button>
    )
}