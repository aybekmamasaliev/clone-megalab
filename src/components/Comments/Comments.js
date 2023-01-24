import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import ChildComment from "../ChildComment/ChildComment";
import s from "./Comments.module.css";
import { AuthContext } from "../../context";

const Comments = (props) => {
  const { likecontext, setLikeContext } = useContext(AuthContext);
  const curretnid = useParams().id;
  const [answercomment, setAnswercomment] = useState("hidden");
  const [childcomment, setChildcomment] = useState("");
  const myRef=useRef(null)

  const changeAnswerComment = () => {
    if(answercomment==="hidden"){
      setAnswercomment("visible")
      setTimeout(()=>{
        myRef.current.focus()
      }, 100)
      
    }else{
      setAnswercomment("hidden");
    }     
  };

  const saveChildcomment = (e) => {
    e.preventDefault();
    const form = { post: curretnid, text: childcomment, parent: props.id };
    fetch("https://megalab.pythonanywhere.com/comment/", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    }).finally(() => {
      changeAnswerComment();
      likecontext === true ? setLikeContext(false) : setLikeContext(true);
    });
    setChildcomment("");
  };

  return (
    <>
      <div>
        {/* className={s.disfcol} */}
        <p className={s.post_reader}>
          {props.user.name} {props.user.last_name}
        </p>
        <p className={s.post}>{props.text}</p>
        <div>
          <p className={s.date} style={{ display: "inline" }}>
            30.11.2022
          </p>
          <p className={s.reply_btn} onClick={changeAnswerComment}>
            Ответить
          </p>
          <form
            className={s.reply_to_comment}
            style={{ visibility: answercomment }}
            onSubmit={saveChildcomment}
          >
            <label>Вы</label>
            <input
              type="text"
              className={s.input_repl_comm}
              value={childcomment}
              ref={myRef}
              onChange={(e) => setChildcomment(e.target.value)}
            />
            <button type="submit" className={s.btn_sm}>
              Ответить
            </button>
          </form>
        </div>
        <div>
          <div className={s.disfcol}></div>
          {props.child?.map((com) => {
            return (
              <ChildComment
                key={com.id}
                name={com.user.name}
                last_name={com.user.last_name}
                text={com.text}
                curretnid={com.id}
                id={props.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comments;
