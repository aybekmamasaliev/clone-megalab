import React, {useState, useContext} from "react";
import s from "./SpecificHeader.module.css";
import logo from "../Media/logo.svg";
import search from "../Media/search2.svg";
import man from "../Media/man2.svg";
import menu_burger from "../Media/menu2.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";


const SpecificHeader = (props) => {
  const navigate=useNavigate()
  const [visible, setVisible] = useState("hidden");
  const [viss, setViss] = useState("hidden");
  const [searchquery, setSearchquery] = useState("");
  const {nicknamecontext}=useContext(AuthContext)

  const goUrl=()=>{
    navigate("/list_fav_news")
  }

  const goMyposts = ()=>{
    navigate("/my_posts")
  }

  const myProfi = () => {
    setViss("hidden")
    visible === "hidden" ? setVisible("visible") : setVisible("hidden");
  };

  const myNewsPath = () => {
    setVisible("hidden");
    viss === "hidden" ? setViss("visible") : setViss("hidden");
  };

  const forSearch=(e)=>{
    props.onChange(e.target.value)
    setSearchquery(e.target.value)
  }

  const exitSite=()=>{
    fetch("https://megalab.pythonanywhere.com/logout/",{
      method:"GET",
      headers: {"Authorization": `Token ${localStorage.getItem("token")}`}
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("token");
          navigate("/");
        }else{
          console.log(nicknamecontext)
        }
      })
  }

  return (
    <>
      <div className={s.header}>
        <img src={logo} alt="logo" className={s.logo_img} onClick={()=>{navigate("/news")}} />

        <div style={{ display: "flex" }}>
          <div className={s.all_menus}>
            <form className={s.form_s}>
              <input
                type="search"
                placeholder="search"
                value={searchquery}
                className={s.search_text}
                onChange={forSearch}
              />
              <img src={search} alt="" className={s.search_icon} />
            </form>
          </div>
          <div className={s.all_menus}>
            <img src={man} alt="user_icon" onClick={myProfi} />
            <img src={menu_burger} alt="search" onClick={myNewsPath} />
            <div className={s.my_profil} style={{ visibility: visible }}>
              <p className={s.my_profil_text} onClick={goMyposts}>Мой профиль</p>
              <hr />
              <p className={s.my_profil_text} onClick={exitSite}>Выйти</p>
            </div>
            <div className={s.choosen_news_path} style={{ visibility: viss }}>
              <p className={s.my_profil_text} onClick={goUrl}>Избранные новости</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificHeader;
