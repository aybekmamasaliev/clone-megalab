import React, { useState, useContext , useRef } from "react";
import { useParams } from "react-router-dom";
import s from "./ChildComment.module.css";
import { AuthContext } from "../../context";

const ChildComment = (props) => {

  const thisid = useParams().id;
  const [childcomment, setChildcomment] = useState("");
  const [view, setView] = useState("hidden");
  const { likecontext, setLikeContext } = useContext(AuthContext);
  const myref=useRef()

  const showForm = () => {
    if( view === "hidden"){
      setView("visible")
      setTimeout(() => {
        myref.current.focus()
      }, 100);
    }else{
      setView("hidden")
    }
  };

  const saveChildcomment = (e) => {
    e.preventDefault();

    const form = { post: thisid, text: childcomment, parent:props.id };
    fetch(`https://megalab.pythonanywhere.com/comment/`,{
      method:"POST",
      mode:"cors",
      credentials:"same-origin",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Token ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(form)
    })
    .finally(()=>{
      showForm()
      likecontext===true? setLikeContext(false):setLikeContext(true) 
    })
    setChildcomment("");
  };

  return (
    <>
      <div className={s.reply_text}>
        <p className={s.post_reader}>
          {props.name} {props.last_name}
        </p>
        <p className={s.post}>{props.text}</p>
        <p className={s.date} style={{ display: "inline" }}>
          30.11.2022
        </p>
        <p className={s.reply_btn} onClick={showForm}>
          Ответить
        </p>
        <form
          className={s.reply_to_comment}
          style={{ visibility: view }}
          onSubmit={saveChildcomment}
        >
          <label>Вы</label>
          <input
            type="text"
            className={s.input_repl_comm}
            value={childcomment}
            ref={myref}
            onChange={(e) => setChildcomment(e.target.value)}
          />
          <button type="submit" className={s.btn_sm}>
            Ответить
          </button>
        </form>
      </div>
    </>
  );
};

export default ChildComment;
