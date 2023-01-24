import React, { useContext, useEffect, useMemo, useState } from "react";
import s from "./ListFavNews.module.css";
import Modal from "../Modal/Modal";
import logo from "../Media/logo_white.svg";
import { NavLink } from "react-router-dom";
import SpecificHeader from "../SpecificHeader/SpecificHeader";
import LikedPost from "../LikedPost/LikedPost";

const ListFavNews = () => {
  const [searchquery, setSearchquery] = useState("");
  const [posts, setPosts] = useState([]);
  const [vis, setVis] = useState("hidden");
  const [ispostloading, setIsPostLoading] = useState(true);
  const changeVis = () => {
    vis === "hidden" ? setVis("visible") : setVis("hidden");
  };

  const closeModal = (x) => {
    changeVis(x);
  };

  useEffect(() => {
      fetch("https://megalab.pythonanywhere.com/like/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(()=>setIsPostLoading(false));
  }, []);

  const searchedposts = useMemo(() => {
    return posts.filter((item) =>
      item.title.toLowerCase().includes(searchquery.toLowerCase().trim())
    );
  }, [searchquery, posts]);

  const forSearch = (rs) => {
    setSearchquery(rs);
  };

  return (
    <>
      <div className={s.full}>
        <div className={s.container}>
          <SpecificHeader onChange={forSearch} />
          <p className={s.news_title}>Избранные новости</p>
          {ispostloading === true ? (
            <p className={s.no_liked_news}>Идет загрузка новостей</p>
          ) : (
            <div>
              {searchedposts.length > 0 ? (
                searchedposts.map((item) => {
                  return (
                    <LikedPost
                      key={item.id}
                      title={item.title}
                      is_liked={item.is_liked}
                      text={item.text}
                      image={item.image}
                      id={item.id}
                    />
                  );
                })
              ) : (
                <p className={s.no_liked_news}>
                  Соответствующих новостей нет 
                </p>
              )}
            </div>
          )}
          {/* {searchedposts.length > 0 ? (
            searchedposts.map((item) => {
              return (
                <LikedPost
                  key={item.id}
                  title={item.title}
                  is_liked={item.is_liked}
                  text={item.text}
                  image={item.image}
                  id={item.id}
                />
              );
            })
          ) : (
            <div className={s.no_liked_news}>
              Избранных новостей пока еще нет
            </div>
          )} */}
          <Modal vis={vis} onClick={closeModal} />
        </div>
        <div className={s.footer}>
          <NavLink to="/my_posts">
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
