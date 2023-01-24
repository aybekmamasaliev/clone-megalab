import RegisterPage from "./components/RegisterPage/Registerpage.js";
import AuthPage from "./components/AuthPage/AuthPage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage.js";
import SpecificNewsPage from "./components/SpecificNewsPage/SpecificNewsPage";
import ListFavNews from "./components/LikedNews/LikedNews.js";
import MyPosts from "./components/MyPosts/MyPosts";
import LikedPost from "./components/MyPost/MyPost";
import { AuthContext } from "./context/index.js";
import { useMemo, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [nicknamecontext, changeNick] = useState("");
  const [bool, setBool] = useState("");
  const [postscontext, setPostsContaxt] = useState([]);
  const [likecontext, setLikeContext] = useState(true);

  let token = useMemo(() => {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    }
  }, [isAuth]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
          nicknamecontext,
          changeNick,
          bool,
          setBool,
          postscontext,
          setPostsContaxt,
          likecontext,
          setLikeContext
        }}
      >
        {token ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RegisterPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/news" element={<MainPage />} />
              <Route path="/favorit_news/:id" element={<SpecificNewsPage />} />
              <Route path="/list_fav_news" element={<ListFavNews />} />
              <Route path="/my_posts" element={<MyPosts />} />
              <Route path="/test" element={<LikedPost />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<RegisterPage />} />
            </Routes>
          </BrowserRouter>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
