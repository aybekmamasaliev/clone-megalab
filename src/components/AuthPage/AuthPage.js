import React, { useContext, useEffect, useMemo, useState } from "react";
import s from "./Auth.module.css";
import logo from "../Media/logo.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import toast, { Toaster } from 'react-hot-toast';

const AuthPage = () => {
  const {
    setIsAuth,
    changeNick
  } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/news");
    }
  }, []);

  const getAuth = (e) => {
    e.preventDefault();
    const auth = { nickname, password };

    if (auth.nickname === "") {
      alert("please type your nickname");
      return;
    } else if (auth.password === "") {
      alert("please type your password");
      return;
    }
    fetch("https://megalab.pythonanywhere.com/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify(auth),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          const { token } = res;
          localStorage.setItem("token", token);
          if (localStorage.getItem("token")) {
            changeNick(nickname);
            setIsAuth(true);
            navigate("/news");
          }
        } else {
          toast.error("Неверный пароль или логин")
          return;
        }
      });
  };

  return (
    <div className={s.fullscreen}>
      <Toaster />
      <div className={s.auth}>
        <img src={logo} alt="logo" className={s.logo} />
        <form className={s.form} onSubmit={getAuth}>
          <div className={s.eachinput}>
            <label htmlFor="fnname">Никнейм</label>
            <input
              type="text"
              id="fnname"
              className={s.input}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className={s.eachinput}>
            <label htmlFor="psw">Пароль</label>
            <input
              type="password"
              id="psw"
              className={s.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={s.div_btn}>
            <button type="submit" className={s.btn}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
