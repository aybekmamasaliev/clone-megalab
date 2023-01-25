import React, { useEffect, useState, useContext } from "react";
import s from "./SpecificNews.module.css";
import logo from "../Media/logo_white.svg";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import share from "../Media/share.svg";
import like from "../Media/like.svg";
import like2 from "../Media/heartliked.svg";
import Modal from "../Modal/Modal";
import arrow from "../Media/arrow.svg";
import post_img from "../Media/post_img_big.svg";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import Comments from "../Comments/Comments";
import { AuthContext } from "../../context";

const MainPage = () => {
  const { likecontext, setLikeContext } = useContext(AuthContext);

  let curretnid = useParams().id;
  let url="https://celebrated-griffin-fa300b.netlify.app/favorit_news/"+curretnid;
  const [comment, setComment] = useState("");

  const history = useNavigate();
  const [detailedpost, setDetailedpost] = useState({});

  const [heart, setHeart] = useState(like);

  const addComment = (e) => {
    e.preventDefault();
    const form = { post: curretnid, text: comment };
    fetch("https://megalab.pythonanywhere.com/comment/", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    })
    .finally(()=>{ likecontext === true ? setLikeContext(false) : setLikeContext(true)});
    setComment("");
  };

  const setLike = () => {
    heart === like ? setHeart(like2) : setHeart(like);
    const token = localStorage.getItem("token");
    const form = { post: curretnid };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(form),
    };

    fetch("https://megalab.pythonanywhere.com/like/", options)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const [vis, setVis] = useState("hidden");
  const changeVis = () => {
    vis === "hidden" ? setVis("visible") : setVis("hidden");
  };

  const closeModal = (x) => {
    changeVis(x);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);
    fetch(`https://megalab.pythonanywhere.com/post/${curretnid}/`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setDetailedpost(data);
        if (data.is_liked) {
          setHeart(like2);
        }
      });
  }, [likecontext]);

  const myF = (x) => {
    alert("here is nothing to search " + x);
  };

  return (
    <>
      <div className={s.full}>
        <Modal vis={vis} onClick={closeModal} url={url}/>
        <GeneralHeader onChange={myF} />
        <div className={s.full}>
          <div className={s.container}>
            <div className={s.main_content}>
              <img
                src={heart}
                alt="likes"
                className={s.likes}
                onClick={setLike}
              />
              <div className={s.flex_colum}>
                <div className={s.content}>
                  <img src={arrow} alt="" onClick={() => history(-1)} />
                  <p className={s.date}>29.11.2022</p>
                  <p className={s.post_title}>{detailedpost.title}</p>
                  <p className={s.post}>{detailedpost.short_desc}</p>
                  {detailedpost.image ? (
                    <img
                      src={
                        "https://megalab.pythonanywhere.com/" +
                        detailedpost.image
                      }
                      alt=""
                      className={s.mt20}
                    />
                  ) : (
                    <img src={post_img} alt="" className={s.mt20} />
                  )}

                  <div className={s.post}>
                    <p className={s.indent}>{detailedpost.text}</p>
                    {/* <p className={s.indent}>{detailedpost.text}</p> */}

                    {/* <p className={s.indent}>{detailedpost.text}</p> */}
                  </div>
                  <img
                    src={share}
                    alt="share"
                    className={s.block}
                    onClick={changeVis}
                  />
                  <div>
                    <p
                      className={s.post_title}
                      style={{ marginTop: "50px", marginBottom: "40px" }}
                    >
                      Комментарии
                    </p>
                    <form
                      className={s.reply_to_comment}
                      style={{ visibility: "visible" }}
                      onSubmit={addComment}
                    >
                      <label>Вы</label>
                      <input
                        type="text"
                        className={s.input_repl_comm}
                        placeholder="Комментировать"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button type="submit" className={s.btn_sm}>
                        Ответить
                      </button>
                    </form>
                    <div className={s.disfcol}>
                      {detailedpost.comment?.map((item, i) => {
                        return (
                            <Comments key={i} {...item} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <NavLink to="/list_fav_news">
            <img src={logo} alt="logo" className={s.logo_img_footer} />
          </NavLink>
          <div className={s.flex}>
            <NavLink>
              <p className={s.footer_text}>Мой профиль</p>
            </NavLink>
            <NavLink>
              <p className={s.footer_text}>Избранные новости</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
