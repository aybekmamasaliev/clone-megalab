import React, { useContext, useEffect, useMemo, useState } from "react";
import s from "./MyPosts.module.css";
import logo from "../Media/logo_white.svg";
import { NavLink } from "react-router-dom";
import image from "../Media/image.svg";
import download from "../Media/downloadd.svg";
import trash_mini from "../Media/trash_mini.svg";
import edit from "../Media/edite.svg";
import AddPostForm from "../AddPostForm/AddPostForm";
import SpecificHeader from "../SpecificHeader/SpecificHeader";
import MyPost from "../MyPost/MyPost";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../context";
import {toast} from 'react-hot-toast';

const ListFavNews = () => {
  const [searchquery, setSearchquery] = useState("");
  const [filename, setFileName] = useState("");
  const [allposts, setAlposts] = useState([]);
  const [last_name, setLast_name] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile_image, setProfile_image] = useState(null);
  const [ispostloading, setIsPostLoading] = useState(true);
  const { nicknamecontext, changeNick } = useContext(AuthContext);
  const [foruserchanges, setForuserChanges]=useState(false)
  const {bool, setBool}=useContext(AuthContext)


  const [vis, setVis] = useState("hidden");

  const changeVis = () => {
    vis === "hidden" ? setVis("visible") : setVis("hidden");
  };
  const closeModal = (x) => {
    changeVis(x);
  };

  const [mod, setMod] = useState("hidden");
  const addPost = () => {
    mod === "hidden" ? setMod("visible") : setMod("hidden");
  };
  const closeAddPost = (adds) => {
    setMod(adds);
  };

  useEffect(() => {
    fetch("https://megalab.pythonanywhere.com/user/", {
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
        setLast_name(data.last_name);
        setName(data.name);
        setNickname(data.nickname);
        changeNick(data.nickname);
        setProfile_image(data.profile_image);
        bool === false ? setBool(true) : setBool(false);
      });
  }, [foruserchanges]);

  const saveData = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (profile_image !== null && filename !== "") {
      formdata.append("profile_image", profile_image, filename);
    }
    formdata.append("nickname", nickname);
    formdata.append("name", name);
    formdata.append("last_name", last_name);

    fetch("https://megalab.pythonanywhere.com/user/", {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: formdata,
    }).then((res) => {
      if (res.status === 400) {
        toast.error("Existing nickname")
        return
      } else if (res.ok) {
        changeNick(nickname);
        toast.success('Изменения сохранены')
        foruserchanges === false ? setForuserChanges(true) : setForuserChanges(false);
      }
    });
  };

  useEffect(() => {
    if(nicknamecontext){
      setIsPostLoading(true)
      fetch(
        `https://megalab.pythonanywhere.com/post/?search=${searchquery}&author=${nicknamecontext}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAlposts(data)
        })
        .finally(()=>setIsPostLoading(false));
    }
  }, [searchquery, bool, nicknamecontext]);

  const searchRes = (rs) => {
    setSearchquery(rs);
  };

  const handleFile = (e) => {
    setProfile_image(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <div className={s.full}>
        <div className={s.container}>
          <SpecificHeader onChange={searchRes} />
          <div className={s.edit_my_profil}>
            <div className={s.my_img}>
              <div className={s.ellipse}>
                {profile_image ? (
                  <img
                    src={"https://megalab.pythonanywhere.com/" + profile_image}
                    className={s.profile_image}
                    alt=""
                  />
                ) : (
                  <img src={image} alt="" />
                )}
              </div>
              <div className={s.dispf}>
                <label style={{ display: "block" }}>
                  <div className={s.addphoto}>
                    <p className={s.fonts_m}>Добавить фото</p>
                    <img src={download} alt="" className={s.pointer} />
                  </div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="file"
                    onChange={(e) => handleFile(e)}
                  />
                </label>
                <div className={s.delete_btn}>
                  <p className={s.fonts_m}>Удалить</p>
                  <img src={trash_mini} alt="" className={s.pointer} />
                </div>
              </div>
            </div>

            <div className={s.edit_my_pro}>
              <form className={s.form_my_pro} onSubmit={saveData}>
                <div className={s.div_input}>
                  <img src={edit} alt="" className={s.edit_icon} />
                  <label className={s.s_name} htmlFor="sname">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    className={s.input_my_pro}
                    id="sname"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value.trim())}
                  />
                </div>
                <div className={s.div_input}>
                  <img src={edit} alt="" className={s.edit_icon} />
                  <label className={s.s_name} htmlFor="name">
                    Имя
                  </label>
                  <input
                    type="text"
                    className={s.input_my_pro}
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                    id="name"
                  />
                </div>
                <div className={s.div_input}>
                  <img src={edit} alt="" className={s.edit_icon} />
                  <label className={s.s_name} htmlFor="nname">
                    Никнейм
                  </label>
                  <input
                    type="text"
                    className={s.input_my_pro}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value.trim())}
                    id="nname"
                  />
                </div>
                <button className={s.btn}>Сохранить</button>
              </form>
            </div>
          </div>
          <div className={s.pos_rel}>
            <p className={s.news_title}>Мои публикации </p>
            <button className={s.new_publish} onClick={addPost}>
              Новая публикация
            </button>
          </div>
          {
            ispostloading === true ?
            <h1 style={{ textAlign: "center" }}>Загрузка новостей ... </h1>
            :
            <div>
                {allposts.length > 0 ? (
                  allposts.map(item=>{
                    return (
                      <MyPost
                        key={item.id}
                        text={item.text}
                        title={item.title}
                        image={item.image}
                        id={item.id}
                       />
                    )
                  })
                ): <h1 style={{ textAlign: "center" }}>Постов не найдено</h1>
                }
            </div>
          }
          {/* {allposts.length > 0 ? (
            allposts.map((item) => {
              return (
                <MyPost
                  key={item.id}
                  text={item.text}
                  title={item.title}
                  image={item.image}
                  id={item.id}
                />
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>Загрузка новостей ... </h1>
          )} */}
          <AddPostForm mod={mod} onClick={closeAddPost} />
          <Modal vis={vis} onClick={closeModal} />
        </div>
        <div className={s.full}>
          <div className={s.container}></div>
        </div>

        <div className={s.footer}>
          <NavLink to="/">
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

export default ListFavNews;
