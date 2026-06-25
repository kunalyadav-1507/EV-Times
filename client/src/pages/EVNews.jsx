import { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar";



  import {
  fetchNewsByCategory
}
from "../services/newsService";



import {

  saveArticle,

  getSavedArticles,

  removeSavedArticle

}

  from "../services/savedNewsService";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

import toast from "react-hot-toast";

import Footer from "../components/Footer";

import SkeletonCard from "../components/SkeletonCard";

import { Link } from "react-router-dom";


function EVNews() {

  const [news, setNews]
    = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const NEWS_PER_PAGE = 6;

  const [loading, setLoading]
    = useState(true);

  const [

    savedArticles,

    setSavedArticles

  ] = useState([]);

  const [

    visibleCount,

    setVisibleCount

  ] = useState(9);

  const [

    loadingMore,

    setLoadingMore

  ] = useState(false);

  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;

  const endIndex = startIndex + NEWS_PER_PAGE;

  const paginatedNews = news.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    news.length / NEWS_PER_PAGE
  );

  const getVisiblePages = () => {

  const pages = [];

  const windowSize = 5;

  let startPage =
    Math.max(
      1,
      currentPage - 2
    );

  let endPage =
    startPage + windowSize - 1;

  if (endPage > totalPages) {

    endPage = totalPages;

    startPage =
      Math.max(
        1,
        endPage - windowSize + 1
      );

  }

  for (
    let i = startPage;
    i <= endPage;
    i++
  ) {

    pages.push(i);

  }

  return pages;
};

  const latestNewsSectionRef = useRef(null);


  // FETCH EV NEWS

  useEffect(() => {

    const getNews = async () => {

      try {

        const response =
  await fetchNewsByCategory(
    "ev"
  );

        setNews(

          response.data.articles

        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

    getNews();

  }, []);


  // FETCH SAVED ARTICLES

  useEffect(() => {

    const fetchSaved = async () => {

      try {

        const response =

          await getSavedArticles();

        setSavedArticles(

          response.data

        );

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchSaved();

  }, []);


  // INFINITE SCROLL

  useEffect(() => {

    const handleScroll = () => {

      if (loadingMore) return;

      if (

        window.innerHeight +

        document.documentElement.scrollTop + 100

        >=

        document.documentElement.offsetHeight

      ) {

        setLoadingMore(true);

        setTimeout(() => {

          setVisibleCount(

            (prev) => prev + 6

          );

          setLoadingMore(false);

        }, 2000);

      }

    };

    window.addEventListener(

      "scroll",

      handleScroll

    );

    return () =>

      window.removeEventListener(

        "scroll",

        handleScroll

      );

  }, [loadingMore]);

  useEffect(() => {

    if (latestNewsSectionRef.current) {

      const y =
        latestNewsSectionRef.current.offsetTop - 200;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

    }

  }, [currentPage]);


  // SAVE / UNSAVE

  const handleSave = async (article) => {

    try {

      const currentArticleUrl =

        article.url ||

        article.articleUrl;


      const existingArticle =

        savedArticles.find(

          (saved) =>

            (

              saved?.articleUrl ||

              saved?.url

            ) === currentArticleUrl

        );


      // REMOVE

      if (existingArticle) {

        await removeSavedArticle(

          existingArticle._id

        );

        setSavedArticles(

          (prev) =>

            prev.filter(

              (item) =>

                (

                  item?.articleUrl ||

                  item?.url

                ) !== currentArticleUrl

            )

        );

        toast.success(

          "Article Removed"

        );

      }


      // SAVE

      else {

        const articleData = {

          title:
            article.title,

          description:

            article.content ||

            article.description ||

            article.summary,

          imageUrl:

            article.imageUrl ||

            article.urlToImage,

          articleUrl:

            article.url ||

            article.articleUrl ||

            ""

        };


        const response =

          await saveArticle(

            articleData

          );


        setSavedArticles(

          (prev) => [

            ...prev,

            response.data.savedNews

          ]

        );

        toast.success(

          "Article Saved"

        );

      }

    }

    catch (error) {

      console.log(error);

    }

  };


  if (loading) {
  return (
    <SkeletonCard
      type="evnews"
    />
  );
}


  return (

    <>

      <Navbar />


      <div
  className="
    bg-gray-100
    min-h-screen
    px-4
    md:px-6
    lg:px-8
    py-8
  "
>

        <div className="max-w-[1800px] px-6">

          {/* HERO SECTION */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">

            {/* LEFT EV NEWS COLUMN */}

            <div className="lg:col-span-3">

              <h2
                className="
      text-red-600
      font-bold
      uppercase
      text-xl
      mb-6
    "
              >
                EV NEWS
              </h2>

              {news.slice(0, 4).map((article, index) => (

                <Link
                  key={index}
                  to={`/news/${article._id}`}
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                  className="
        block
        border-b
        border-gray-300
        pb-5
        mb-5
      "
                >

                  <h3
                    className="
          text-lg md:text-xl
          font-serif
          font-bold
          hover:underline
        "
                  >
                    {article.title}
                  </h3>

                  <p
                    className="
          text-gray-500
          text-sm
          uppercase
          mt-3
        "
                  >
                    EV TIMES
                  </p>

                </Link>

              ))}

            </div>
            <div className="lg:col-span-6">

              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >

                {news.slice(4, 9).map((article, index) => (

                  <SwiperSlide key={index}>

                    <Link
                      to={`/news/${article._id}`}
                      state={{
                        article,
                        relatedArticles: news,
                      }}
                    >

                      <img
                        src={
                          article.imageUrl ||
                          article.urlToImage
                        }
                        alt="news"
                        className="
  w-full
  h-[250px]
  md:h-[350px]
  lg:h-[450px]
  object-cover
  rounded-xl
"
                      />

                      <h2
                        className="
        text-xl md:text-2xl lg:text-3xl
        font-serif
        font-bold
        mt-4
        hover:underline
        transition-all
      "
                      >

                        {article.title}

                      </h2>

                    </Link>

                  </SwiperSlide>

                ))}

              </Swiper>

            </div>
            <div className="lg:col-span-3 space-y-6">
              {news.slice(9, 11).map((article, index) => (

                <Link
                  key={index}
                 to={`/news/${article._id}`}
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                >

                  <img
                    src={
                      article.imageUrl ||
                      article.urlToImage
                    }
                    alt=""
                    className="
        w-full
        h-40 md:h-48
        object-cover
        rounded-xl
      "
                  />

                  <h3
                    className="
        text-lg md:text-xl
        font-serif
        mt-3
        hover:underline
      "
                  >

                    {article.title}

                  </h3>

                </Link>

              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {news.slice(11, 14).map((article, index) => (

              <Link
                key={index}
                to={`/news/${article._id}`}
                state={{
                  article,
                  relatedArticles: news,
                }}
              >

                <img
                  src={
                    article.imageUrl ||
                    article.urlToImage
                  }
                  alt=""
                  className="
        w-full
       h-40 md:h-48
        object-cover
        rounded-xl
      "
                />

                <h3
                  className="
        text-xl
        font-serif
        mt-3
        hover:underline
      "
                >

                  {article.title}

                </h3>

              </Link>

            ))}
          </div>

          {/* LATEST EV NEWS SECTION */}


          <div
            ref={latestNewsSectionRef}
            className="grid lg:grid-cols-12 gap-8 mt-16"
          >
            <div className="lg:col-span-8">
              <h2
                className="
                ref={latestNewsRef}
    text-2xl md:text-3xl
    font-bold
    mb-8
    border-l-4
    border-cyan-500
    pl-3
  "
              >
                Latest EV News
              </h2>
              {paginatedNews.map((article, index) => (

                <Link
                  key={index}
                  to={`/news/${article._id}`}
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                  className="
      grid
      grid-cols-1
lg:grid-cols-[1fr_300px]
      gap-6
      py-8
      border-b
      border-gray-200
    "
                >
                  <div>

                    <h2
                      className="
      text-xl md:text-3xl
      font-serif
      font-bold
      hover:underline
    "
                    >
                      {article.title}
                    </h2>

                    <p
                      className="
      text-gray-500
      text-sm
      mt-2
    "
                    >
                      EV TIMES
                    </p>

                    <p
                      className="
      text-gray-700
      mt-4
      leading-relaxed
    "
                    >
                      {(article.description || "").slice(0, 180)}...
                    </p>

                  </div>

                  <img
                    src={
                      article.imageUrl ||
                      article.urlToImage
                    }
                    alt=""
                    className="
    w-full
    h-56
    object-cover
    rounded-lg
  "
                  />
                </Link>

              ))}
            </div>
            <div className="lg:col-span-4">
              <h2
                className="
    text-2xl
    font-bold
    mb-6
    border-b
    pb-3
  "
              >
                More EV News
              </h2>
              {news.slice(17, 23).map((article, index) => (

                <Link
                  key={index}
                  to={`/news/${article._id}`}
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                  className="
      flex
      gap-4
      py-5
      border-b
      border-gray-300
    "
                >
                  <img
                    src={
                      article.imageUrl ||
                      article.urlToImage
                    }
                    alt=""
                    className="
    w-24 h-20 md:w-28 md:h-20
    object-cover
    rounded-lg
  "
                  />

                  <div>

                    <p
                      className="
      text-orange-500
      text-xs
      uppercase
      mb-1
    "
                    >
                      EV NEWS
                    </p>

                    <h3
                      className="
                      font-serif
      hover:underline
      leading-snug
    "
                    >
                      {article.title}
                    </h3>

                  </div>
                </Link>

              ))}
              {/* SIDEBAR AD */}
              <div
  className="
    hidden
    lg:block
    sticky
    top-24
    mt-8
  "
>
                <h2 className="uppercase text-sm font-semibold tracking-wide border-l-4 border-cyan-500 pl-2 mb-6">

                  Advertisement

                </h2>

                <div
                  className="
    mt-8
    border
    rounded-xl
    overflow-hidden
    bg-white
  "
                >



                  <img
                    src="ev_img1.jpg"
                    alt="Advertisement"
                    className="
      w-full
      h-[500px]
      object-cover
    "
                  />
                </div>

              </div>
            </div>

          </div>
          {/* PAGINATION */}

          <div
            className="
    flex
    justify-center
    items-center
    gap-1 md:gap-3
    mt-16
    mb-12
  "
          >

            {/* PREV */}

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="
      px-2 md:px-4
      py-2
      text-gray-500
      disabled:text-gray-300
    "
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}

            {getVisiblePages().map((page, index) => (

              page === "..." ? (

                <span
                  key={index}
                  className="
        px-2
        text-gray-500
      "
                >
                  ...
                </span>

              ) : (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`
        w-10
        h-10
        rounded

        ${currentPage === page
                      ? "bg-cyan-700 text-white"
                      : "hover:bg-gray-100"
                    }
      `}
                >
                  {page}
                </button>

              )

            ))}

            {/* NEXT */}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="
      px-2 md:px-4
      py-2
      text-red-700
      disabled:text-gray-300
    "
            >
              Next
            </button>

          </div>

          

        </div>

      </div>

      <Footer />

    </>

  );

}

export default EVNews;