import style from "./ui-style/getintouch.module.css"

export default function GetInTouch(){
    return (
            <form className={style.getintouch_container}>
                <input type="text" placeholder="Reach out to us" className={style.text_input} />
                <input type="submit" className={style.submit_input} value="Get In Touch"/>
            </form>
    )
}