import React, { useState } from "react";
import s from "./LikedPost.module.css";
import post_img from "../Media/post_img.svg";
import like2 from "../Media/heartliked.svg";
import like from "../Media/like.svg";
import { NavLink } from "react-router-dom";
import share from "../Media/share.svg";
import Modal from "../Modal/Modal";

const LikedNews = (props) => {
  const id = props.id;
  let url ="https://celebrated-griffin-fa300b.netlify.app/favorit_news/"+props.id;
  const [heart, setHeart] = useState(like2);
  const setLike = () => {
    heart === like ? setHeart(like2) : setHeart(like);
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

    fetch("https://megalab.pythonanywhere.com/like/", options)
      .then((res) => res.json())
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
      <Modal vis={vis} onClick={closeModal} url={url}/>
      <div className={s.content}>
        <img src={heart} alt="likes" className={s.likes} onClick={setLike} />
        <div className={s.divimg}>
          {
            props.image ? 
            <img
            src={"https://megalab.pythonanywhere.com/" + props.image}
            alt="post_img"
            className={s.post_img}
          /> : 
          <img src={post_img} alt="post_img"  className={s.post_img} />
          }
          
        </div>
        <div className={s.info_news}>
          <p className={s.date}>29.11.2022</p>
          <p className={s.post_item}>{props.title}</p>
          <p className={s.post}>{props.text}</p>
          {/* <p>{props.id}</p> */}
          <NavLink to={`/favorit_news/${id}`}>
            <p className={s.mt_8}>Читать дальше </p>
          </NavLink>
          <img
            src={share}
            alt="share"
            className={s.block}
            onClick={changeVis}
          />
        </div>
      </div>
    </>
  );
};

export default LikedNews;
