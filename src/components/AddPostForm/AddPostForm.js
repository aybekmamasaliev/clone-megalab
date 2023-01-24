import React, { useContext, useEffect, useMemo, useState } from "react";
import s from "./AddPostForm.module.css";
import x from "../Media/iks.svg";
import down_icon from "../Media/downloadd.svg";
import { AuthContext } from "../../context";
import { toast } from "react-hot-toast";

const AddPostForm = (props) => {
  let mod = props.mod;
  
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const [short_desc, setShort_desc] = useState("");
  const [options, setOptions] = useState([]);
  const [color, setColor]=useState("white")
  const [textcolor, setTextColor]=useState("white")
  const {bool, setBool}=useContext(AuthContext);

  const changeVisibility = () => {
    if (mod === "visible") {
      mod = "hidden";
    }
    props.onClick(mod);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setColor("white")
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("text", text);
    if(file){
      formdata.append("image", file);
    }
    formdata.append("tag", tag);

    if (title === "") {
      toast.error("please type title")
      return;
    } else if (short_desc === "") {
      toast.error("please type short description")
      return;
    } else if (text === "") {
      toast.error("please type a text")
      return;
    } else if (tag === "") {
      toast.error("please type a tag")
      return;
    }
    fetch("https://megalab.pythonanywhere.com/post/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: formdata,
    })
      .then((res) => {
        if(res.ok){
          bool === false ? setBool(true) : setBool(false)
          res.json()
          setFile("")
          setTitle("");
          setText("");
          setTag("");
          setShort_desc("");
          changeVisibility()
          toast.success("post is added")
          console.log(file)
        }
      })
      .catch((err) => {
        console.error("error", err);
      });
     
  };

  useEffect(() => {
    fetch("https://megalab.pythonanywhere.com/tag/", {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(file)
  };

  const changetoNull=(e)=>{
    e.target.value = null;
  }

  useMemo(()=>{
    if(file){
      setColor("#7e5bc2")
      setTextColor("white")
    }else{
      setColor("white")
      setTextColor("black")
    }
  },[file])



  return (
    <>
      <div className={s.relt} style={{ visibility: mod }}></div>
      <form
        className={s.form}
        style={{ visibility: mod }}
        onSubmit={handleSubmission}
      >
        <img src={x} alt="" className={s.close} onClick={changeVisibility} />
        <div className={s.relative}>
          <div className={s.div_download}>
            <p className={s.label}>Обложка новости</p>
            <label className={s.btn_dwnld} style={{background:color, color:textcolor}}>
              {file !=="" ? <span>Загружено</span>:<span>Загрузить</span>}
              <img src={down_icon} alt="" className={s.down_icon} />
              <input
                className={s.btn_dwnld}
                style={{ display: "none" }}
                type="file"
                name="file"
                onChange={(e) => handleFile(e)}
                onClick={changetoNull}
              />
            </label>
          </div>
          <div className={s.div_input}>
            <label htmlFor="title" className={s.label}>
              Заголовок
            </label>
            <input
              type="text"
              className={s.input}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={s.div_input}>
            <label htmlFor="desc" className={s.label}>
              Краткое описание
            </label>
            <input
              type="text"
              className={s.input}
              id="desc"
              value={short_desc}
              onChange={(e) => setShort_desc(e.target.value)}
            />
          </div>
          <div className={s.div_texarea}>
            <label
              htmlFor="text"
              className={s.label}
              style={{ marginTop: "8px" }}
            >
              Текст новости
            </label>
            <textarea
              className={s.textarea}
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className={s.div_input}>
            <label htmlFor="choose" className={s.label}>
              Выбрать категорию
            </label>
            <select
              className={s.option}
              // defaultValue="Не выбрано"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="Не выбрано">Не выбрано</option>
              {options.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className={s.create_sbmt}>
            Создать
          </button>
          <div style={{ position: "relative" }}>
            <p className={s.sharp}>#</p>
            <input
              type={text}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={s.result_news}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPostForm;
