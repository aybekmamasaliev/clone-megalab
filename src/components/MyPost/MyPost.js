import React, {useContext, useState} from "react";
import s from "./MyPost.module.css";
import like from "../Media/trash.svg";
import post_img from "../Media/post_img.svg";
import { NavLink } from "react-router-dom";
import share from "../Media/share.svg";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../context";
import toast from "react-hot-toast";

const MyPost = (props) => {
    const [vis, setVis] = useState("hidden");
    const {bool, setBool}=useContext(AuthContext);
    let url = "http://localhost:3000/favorit_news/" + props.id;

    const closeModal = (x) => {
      changeVis(x);
    };
    
      const changeVis = () => {
        vis === "hidden" ? setVis("visible") : setVis("hidden");
      };

      const deletePost=()=>{
        fetch(`https://megalab.pythonanywhere.com/post/${props.id}`,{
            method:"DELETE",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("token")}`,
            },
        })
        .then(res=>{
          if(res.ok){
            bool===false?setBool(true):setBool(false)
            toast.success("post is deleted")
          }
        })

        
      }

  return (
    <>
    <Modal vis={vis} onClick={closeModal} url={url}/>
      <div className={s.content}>
        <img src={like} alt="likes" className={s.likes} onClick={deletePost}/>
        <div className={s.imgdiv}>
          {
            props.image ?
            <img src={"https://megalab.pythonanywhere.com/"+props.image} alt="post_img" className={s.post_img} /> :
            <img src={post_img} alt="post_img" className={s.post_img} />
          }
        
        </div>
              <div className={s.info_news}>
          <p className={s.date}>29.11.2022</p>
          <p className={s.post_item}>{props.title}</p>
          <p className={s.post}>{props.text}</p>
          <NavLink to={`/favorit_news/${props.id}`}>
            <p className={s.mt_8}>Читать дальше </p>
          </NavLink>
          <img src={share} alt="share" className={s.block}  onClick={changeVis}/>
        </div>
      </div>
    </>
  );
};

export default MyPost;
