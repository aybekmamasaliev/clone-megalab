import React, { useEffect, useState } from "react";
import s from "./RegisterPage.module.css";
import logo from "../Media/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [last_name, setSname] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setConfpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/news");
    }
  }, []);

  const createUser = (e) => {
    e.preventDefault();
    const user = { last_name, name, nickname, password, password2 };

    if (user.last_name === "") {
      toast.error("please type your surename.");
      return;
    } else if (user.name === "") {
      toast.error("please type your name.");
      return;
    } else if (user.nickname === "") {
      toast.error("please type your nickmane.");
      return;
    } else if (user.password === "") {
      toast.error("please type your password.");
      return;
    } else if (user.password2 === "") {
      toast.error("please type confirmation.");
      return;
    } else if (user.password !== user.password2) {
      toast.error("confirmation does not match");
      return;
    }

    fetch("https://megalab.pythonanywhere.com/registration/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) {
        toast.error("не надежный пароль или уже такой никнейм занят");
        return;
      } else {
        toast.success("Аккаунт создан");
        localStorage.setItem(`${nickname}`, nickname);
        setTimeout(() => {
          navigate("/auth");
        }, 2500);
      }
    });
  };
  return (
    <div className={s.fullscreen}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={s.register}>
        <img src={logo} alt="logo" className={s.logo} />
        <form className={s.form} onSubmit={createUser}>
          <div className={s.eachinput}>
            <label htmlFor="fsname">Фамилия</label>
            <input
              type="text"
              id="fsname"
              className={s.input}
              value={last_name}
              onChange={(e) => setSname(e.target.value)}
            />
          </div>
          <div className={s.eachinput}>
            <label htmlFor="fname">Имя</label>
            <input
              type="text"
              id="fname"
              className={s.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={s.eachinput}>
            <label htmlFor="fnname">Никнейм</label>
            <input
              type="text"
              id="fnname"
              className={s.input}
              value={nickname}
              onChange={(e) => setNname(e.target.value)}
            />
          </div>
          <div className={s.eachinput} style={{ marginBottom: "40px" }}>
            <label htmlFor="fpassword">Пароль</label>
            <input
              type="password"
              id="fpassword"
              className={s.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={s.limit_for_psw}>Лимит на символы</p>
          </div>
          <div className={s.eachinput}>
            <label htmlFor="fcpassword">Подтверждение пароля</label>
            <input
              type="password"
              id="fcpassword"
              className={s.input}
              value={password2}
              onChange={(e) => setConfpassword(e.target.value)}
            />
          </div>
          <div className={s.div_btn}>
            <button type="submit" className={s.btn}>
              Регистрация
            </button>
          </div>
          <p className={s.enter}>
            Уже есть логин? <NavLink to="/auth"> Войти</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
