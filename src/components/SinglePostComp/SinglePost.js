import React, { useContext, useEffect, useState } from "react";
import s from "./SinglePost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import like from "../Media/like.svg";
import like2 from "../Media/heartliked.svg";
import post_img from "../Media/post_img.svg";
import share from "../Media/share.svg";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../context";

const SinglePost = (props) => {
  const { likecontext, setLikeContext } = useContext(AuthContext);
  
  let url="http://localhost:3000/favorit_news/"+props.id;
  const [heart, setHeart] = useState(like);

  useEffect(() => {
    if (props.is_liked) {
      setHeart(like2);
    } else {
      setHeart(like);
    }
  }, []);

  let id = props.id;
  const makeFav = () => {
    if (heart === like2) {
      setHeart(like);
    } else {
      setHeart(like2);
    }

    likecontext === false ? setLikeContext(true) : setLikeContext(false);
    const token = localStorage.getItem("token");
    const form = { post: id };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(form),
    };

    fetch("https://megalab.pythonanywhere.com/like/", options).then((res) =>
      res.json()
    );
  };

  const [vis, setVis] = useState("hidden");
  const changeVis = () => {
    vis === "hidden" ? setVis("visible") : setVis("hidden");
  };
  const closeModal = (x) => {
    changeVis(x);
  };

  return (
    <>
      <div className={s.content}>
        <Modal vis={vis} onClick={closeModal} url={url}/>
        <div className={s.new}>
          {props.img ? (
            <img
              src={"https://megalab.pythonanywhere.com/" + props.img}
              alt="post_img"
              className={s.post_img}
            />
          ) : (
            <img src={post_img} alt="post_img" className={s.post_img} />
          )}

          <div className={s.news_text}>
            <img
              src={heart}
              alt="likes"
              className={s.likes}
              onClick={makeFav}
            />
            <p className={s.date}>29.11.2022</p>
            <p className={s.post_item}>{props.title}</p>
            <p className={s.post}>{props.short_desc}</p>
            <p>{props.id}</p>
            <NavLink to={`/favorit_news/${props.id}`} className={s.mt_8}>
              Читать дальше{" "}
            </NavLink>
            <img
              src={share}
              alt="share"
              className={s.block}
              onClick={changeVis}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
