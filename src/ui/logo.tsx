'use client';

import style from "./ui-style/logo.module.css";

export default function Logo() {
  return (
    <div className={style.logo}>
      <span className={style.logo_text}>Ademola</span>
      <span className={style.logo_dot}>.</span>
    </div>
  );
}