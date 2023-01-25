import React, { useContext, useEffect, useMemo, useState } from "react";
import s from "./MainPage.module.css";
import logo from "../Media/logo_white.svg";
import { NavLink, useNavigate } from "react-router-dom";
import SinglePost from "../SinglePostComp/SinglePost";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import { AuthContext } from "../../context";

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [applysearch, setApplySearch] = useState("");
  const [tags, setTags] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [confirmtags, setConfirmTags] = useState(false);
  const [ispostloading, setPostLoading] = useState(true)
  const { postscontext, setPostsContaxt } = useContext(AuthContext);
  const navigate = useNavigate()

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://megalab.pythonanywhere.com/tag/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
      credentials: "same-origin",
      mode: "cors",
    })
      .then((res) => {
        if(res.ok){
          res.json()
        }else{
          localStorage.removeItem("token")
          navigate("/")
        }      
      })
      .then((data) => setTags(data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);
    setPostLoading(true)
    
    fetch(
      `https://megalab.pythonanywhere.com/post/?search=${search}&tag=${filterTags}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          localStorage.removeItem("token")
          alert("something is wrong" + res.status);
          navigate("/")
        }
      })
      .then((data) => setPostsContaxt(data))
      .finally(()=>setPostLoading(false));
  }, [search, confirmtags]);

  const forSearch = (a) => {
    setApplySearch(a);
  };

  const getRresuSearch = () => {
    setSearch(applysearch);
  };

  // const listSearchedposts = useMemo(() => {
  // if (search === "" && filterTags.length > 0) {
  //   return [...posts].filter((item) => filterTags.includes(item.tag));
  // } else if (search !== "" && filterTags.length === 0) {
  //   return [...posts].filter((item) =>
  //     item.title.toLowerCase().includes(search.toLocaleLowerCase().trim())
  //   );
  // } else if (search !== "" && filterTags.length > 0) {
  //   return [...posts].filter(
  //     (item) =>
  //       item.title.toLowerCase().includes(search.toLowerCase().trim()) &&
  //       filterTags.includes(item.tag)
  //   );
  // } else if (filterTags.length === 0 && search === "") {
  //   return [...posts];
  // } else {
  //   return [];
  // }
  //   return [...postscontext];
  // }, [search, confirmtags, postscontext]);

  const handleTag = (e) => {
    if (e.target.checked) {
      setFilterTags([...filterTags, encodeURIComponent(e.target.value)]);
    } else {
      setFilterTags(
        filterTags.filter(
          (filterTag) => filterTag !== encodeURIComponent(e.target.value)
        )
      );
    }
  };

  const handleAllTags = (e) => {
    e.preventDefault();
    confirmtags === false ? setConfirmTags(true) : setConfirmTags(false);
  };

  return (
    <>
      <div className={s.full}>
        <GeneralHeader onChange={forSearch} onClick={getRresuSearch} />
        <div className={s.full}>
          <div className={s.container}>
            <div className={s.main_content}>
              <div className={s.radios} >
                <p className={s.font_s_15}>Фильтрация</p>
                <form onSubmit={handleAllTags}>
                  {/* <div className={s.mt14}>
                    <input type="checkbox" id="sport" />
                    <label htmlFor="sport" className={s.label_style}>
                      Спорт
                    </label>
                  </div>
                  <div className={s.mt14}>
                    <input type="checkbox" id="policy" />
                    <label htmlFor="policy" className={s.label_style}>
                      Политика
                    </label>
                  </div>
                  <div className={s.mt14}>
                    <input type="checkbox" id="starts" />
                    <label htmlFor="starts" className={s.label_style}>
                      Звезды
                    </label>
                  </div>
                  <div className={s.mt14}>
                    <input type="checkbox" id="art" />
                    <label htmlFor="art" className={s.label_style}>
                      Искусство
                    </label>
                  </div>

                  <div className={s.mt14}>
                    <input type="checkbox" id="fasion" />
                    <label htmlFor="fasion" className={s.label_style}>
                      Мода
                    </label>style="overflow-y: scroll; height:400px;"
                  </div> */}
                  <div className={s.scroll}>
                  {tags.map((item) => (
                    <div className={s.mt14} key={item.id} >
                      <input
                        type="checkbox"
                        id={item.name}
                        onChange={handleTag}
                        value={item.name}
                      />
                      <label htmlFor={item.name} className={s.label_style}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                  </div>
                 
                  <div className={s.mt14}>
                    <button type="submit" className={s.btn}>
                      Применить
                    </button>
                  </div>
                </form>
              </div>
              {ispostloading?
              <p className={s.no_liked_news}>Идет загрузка новостей ...</p>
              :
              <div>
              {postscontext.length > 0 ? (
                <div className={s.flex_colum}>
                  {postscontext.map((post) => (
                    <SinglePost
                      key={post.id}
                      short_desc={post.short_desc}
                      title={post.title}
                      id={post.id}
                      img={post.image}
                      is_liked={post.is_liked}
                    />
                  ))}
                </div>
              ) : (
                <p className={s.no_liked_news}>Постов не найдено</p>
              )}
            </div>

              }
             
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <img src={logo} alt="logo" className={s.logo_img_footer} />

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

export default MainPage;
