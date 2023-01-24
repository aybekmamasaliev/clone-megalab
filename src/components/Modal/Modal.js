import React, { useContext, useState } from "react";
import s from "../Modal/Modal.module.css";
import telegram from "../Media/telegram.svg";
import whatsapp from "../Media/whatsapp.svg";
import facebook from "../Media/facebook.svg";
import twitter from "../Media/twit.svg";
import copy from "../Media/copy.svg";
import close from "../Media/xclose.svg";
import { AuthContext } from "../../context";
import toast, { Toaster } from "react-hot-toast";

const Modal = (props) => {
  const [url, setUrl] = useState(props.url);
  let vis = props.vis;

  const hangleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('link copied')
  };

  const changeVisibility = () => {
    if (vis === "visible") {
      vis = "hidden";
    }
    props.onClick(vis);
  };

  return (
    <>
      <div className={s.opsity_modal} style={{ visibility: vis }}></div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={s.modal} style={{ visibility: vis }}>
        <img
          src={close}
          className={s.close}
          alt=""
          onClick={changeVisibility}
        />
        <div>
          <p className={s.share}>Поделиться</p>
        </div>
        <div className={s.icons}>
          <a href={`https://telegram.me/Aiibbbeeeek?text=${url}`}>
            <img src={telegram} className={s.pointer} alt="" />
          </a>
          <a href={`https://wa.me/+996772991457?text=${url}`}>
            <img src={whatsapp} className={s.pointer} alt="" />
          </a>
          <a href="https://m.facebook.com/">
            <img src={facebook} className={s.pointer} alt="" />
          </a>
          <a href={`http://www.twitter.com/share?url=${url}`}>
            <img src={twitter} className={s.pointer} alt="" />
          </a>
        </div>
        <p className={s.share}>Короткая ссылка</p>
        <div className={s.p_relative}>
          <img src={copy} alt="" className={s.copy} onClick={hangleCopy} />
          <input
            type="text"
            className={s.input_share}
            placeholder="Какой-то текст ссылки"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
