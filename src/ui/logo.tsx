'use client';

import style from "./ui-style/logo.module.css";
import logo from "../assets/bit2.png";
import Image from "next/image";

export default function Logo() {
  return (
    <div className={style.logo}>
      <Image 
        src={logo} 
        alt="ByteBandit Logo" 
        width={28} 
        height={28} 
        className={style.logo_image}
      />
      <span>ByteBandit</span>
    </div>
  );
}