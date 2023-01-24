import React, { useContext, useState } from "react";
import s from "./GeneralHeader.module.css";
import logo from "../Media/logo_white.svg";
import search from "../Media/search_white.svg";
import man from "../Media/man.svg";
import menu_burger from "../Media/menu_burger_white.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

const GeneralHeader = (props) => {
  const navigate = useNavigate();
  const [searchtext, setSearchtext] = useState("");
  const [viss, setViss] = useState("hidden");
  const [visible, setVisible] = useState("hidden");
  const {nicknamecontext}=useContext(AuthContext)

  const goUrl = () => {
    navigate("/list_fav_news");
  };

  const goMyposts = () => {
    navigate("/my_posts");
  };

  const myProfi = () => {
    setViss("hidden");
    visible === "hidden" ? setVisible("visible") : setVisible("hidden");
  };

  const myNewsPath = () => {
    setVisible("hidden");
    viss === "hidden" ? setViss("visible") : setViss("hidden");
  };

  const exitSite = () => {
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
  };

  const myF = (e) => {
    setSearchtext(e.target.value);
    props.onChange(e.target.value);
  };

  const pushSearchQuery = (e) => {
    e.preventDefault();
    props.onClick(e.target.value);
  };

  return (
    <>
      <div className={s.header}>
        <div className={s.container}>
          <div className={s.inner_header}>
            <img src={logo} alt="logo" className={s.logo_img} />
            <h1 className={s.text_news}>Новости</h1>
            <div style={{ display: "flex" }}>
              <div className={s.all_menus}>
                <form className={s.form_s} onSubmit={pushSearchQuery}>
                  <input
                    type="search"
                    placeholder="search"
                    className={s.search_text}
                    value={searchtext}
                    onChange={myF}
                  />
                  <img
                    src={search}
                    alt=""
                    className={s.search_icon}
                    onClick={pushSearchQuery}
                  />
                </form>
              </div>
              <div className={s.all_menus}>
                <img src={man} alt="user_icon" onClick={myProfi} />
                <img src={menu_burger} alt="search" onClick={myNewsPath} />
                <div className={s.my_profil} style={{ visibility: visible }}>
                  <p className={s.my_profil_text} onClick={goMyposts}>
                    {" "}
                    Мой профиль
                  </p>
                  <hr />
                  <p className={s.my_profil_text} onClick={exitSite}>
                    Выйти
                  </p>
                </div>
                <div
                  className={s.choosen_news_path}
                  style={{ visibility: viss }}
                >
                  <p className={s.my_profil_text} onClick={goUrl}>
                    Избранные новости
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralHeader;
