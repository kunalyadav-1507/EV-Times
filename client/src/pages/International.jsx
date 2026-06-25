import { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar";



import { fetchNewsByCategory } from "../services/newsService";

import NewsCard
  from "../components/NewsCard";

import {

  saveArticle,

  getSavedArticles,

  removeSavedArticle

}

  from "../services/savedNewsService";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import Footer from "../components/Footer";

import SkeletonCard from "../components/SkeletonCard";


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
            "international"
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
      type="international"
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

        <div className="max-w-[1800px] mx-auto">

          {/* INTERNATIONAL HERO */}

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            {/* LEFT COLUMN */}

            <div className="lg:col-span-3">
              {news.slice(0, 3).map((article, index) => (

                <Link
                  key={index}
                  to={`/news/${article._id}`}
                  
                  className="
      block
      border-b
      border-gray-300
      pb-6
      mb-6
    "
                >

                  <p
                    className="
        text-orange-600
        font-bold
        uppercase
        text-sm
        mb-3
      "
                  >
                    WORLD
                  </p>

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
        text-xs
        uppercase
        mt-4
      "
                  >
                    EV TIMES
                  </p>

                </Link>

              ))}
              <Link
                to={`/news/${news[3]?._id}`}
                
              >

                <img
                  src={
                    news[3]?.imageUrl ||
                    news[3]?.urlToImage
                  }
                  alt=""
                  className="
  w-full
  h-48
  md:h-56
  object-cover
  mt-6
"
                />

                <p
                  className="
      text-orange-600
      font-bold
      uppercase
      text-sm
      mt-4
      mb-2
    "
                >
                  WORLD
                </p>

                <h3
                  className="
      text-xl
      font-serif
      font-bold
      hover:underline
    "
                >
                  {news[3]?.title}
                </h3>

              </Link>

            </div>

            {/* CENTER HERO */}

            <div className="lg:col-span-6">
              <Link
                to={`/news/${news[4]?._id}`}
                
              >
                <h2
                  className="
    text-2xl md:text-3xl lg:text-4xl
    font-serif
    font-bold
    leading-tight
    hover:underline
  "
                >
                  {news[4]?.title}
                </h2>

                <div
                  className="
    grid
    md:grid-cols-12
    gap-5
    mt-6
  "
                >
                  <div className="md:col-span-7">

                    <img
                      src={
                        news[4]?.imageUrl ||
                        news[4]?.urlToImage
                      }
                      alt=""
                      className="
  w-full
  h-[220px]
  md:h-[320px]
  object-cover
  rounded-lg
"
                    />

                  </div>
                  <div className="md:col-span-5">

                    <p
                      className="
      text-xl
      text-gray-700
      leading-relaxed
    "
                    >
                      {
                        (
                          news[4]?.description ||
                          news[4]?.content ||
                          ""
                        ).slice(0, 280)
                      }...
                    </p>

                    <p
                      className="
      mt-6
      text-sm
      uppercase
      tracking-wide
      font-semibold
    "
                    >
                      EV TIMES BUREAU
                    </p>

                  </div>

                </div>
              </Link>

              {/* BOTTOM STORIES */}

              <div className="grid md:grid-cols-2 gap-6 mt-8 border-t border-gray-300 pt-8">
                <div>

                  {news.slice(5, 7).map((article, index) => (

                    <Link
                      key={index}
                      to={`/news/${article._id}`}
                      
                      className={`
        block
        ${index !== 0 ? "mt-8 pt-8 border-t border-gray-300" : ""}
      `}
                    >

                      <p
                        className="
          text-orange-600
          font-bold
          uppercase
          text-sm
          mb-2
        "
                      >
                        WORLD
                      </p>

                      <h3
                        className="
          text-xl md:text-2xl
          font-serif
          font-semibold
          leading-tight
          hover:underline
        "
                      >
                        {article.title}
                      </h3>

                    </Link>

                  ))}

                </div>

                <div>
                  <Link
                    to={`/news/${news[7]?._id}`}
                    
                  >

                    <h3
                      className="
      text-xl md:text-2xl
      font-serif
      font-bold
      leading-tight
      hover:underline
      mb-5
    "
                    >
                      {news[7]?.title}
                    </h3>

                    <img
                      src={
                        news[7]?.imageUrl ||
                        news[7]?.urlToImage
                      }
                      alt=""
                      className="
      w-full
      h-[250px]
      object-cover
      rounded
    "
                    />

                  </Link>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN */}

            <div className="lg:col-span-3">
              <div
                className="
    border
    border-gray-300
    rounded-lg
    overflow-hidden
    mb-8
    bg-white
  "
              >



                <div
                  className="
      h-[280px]
      flex
      items-center
      justify-center
      bg-gray-100
    "
                >
                  <img src="imgg.jpeg" />
                </div>

              </div>
              <h2
                className="
   text-2xl md:text-3xl
    font-bold
    mb-8
    border-l-4
    border-cyan-500
    pl-3
  "
              >
                Most Popular
              </h2>

              {news.slice(5, 10).map((article, index) => (

                <Link
                  key={index}
                  to={`/news/${article._id}`}
                  
                  className="
      flex
      gap-4
      py-4
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
        w-20
h-16
md:w-24
md:h-20
        object-cover
        rounded
      "
                  />

                  <p
                    className="
                    font-serif
        hover:underline
      "
                  >
                    {article.title}
                  </p>

                </Link>

              ))}
            </div>
          </div>

          {/* AROUND EV WORLD */}

          <div className="mt-16 mb-10">

            <div className="border-t border-gray-300 pt-4">

              <h2
                className="
        text-center
        text-2xl md:text-4xl
        font-bold
        text-cyan-700
        font-serif
      "
              >
                Around EV World
              </h2>
              <div className="border-t border-gray-300 pt-4"></div>
              <br />
              <br />



              <div className="grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4 gap-8 mb-16">
                <Link
                  to={`/news/${news[11]?._id}`}
                  
                >

                  <img
                    src={
                      news[11]?.imageUrl ||
                      news[11]?.urlToImage
                    }
                    alt=""
                    className="
      w-full
      h-56
      object-cover
    "
                  />

                  <h3
                    className="
      text-xl md:text-2xl
      font-serif
      font-bold
      mt-4
      hover:underline
    "
                  >
                    {news[11]?.title}
                  </h3>

                </Link>
                <div>
                  {news.slice(12, 14).map((article, index) => (

                    <Link
                      key={index}
                      to={`/news/${article._id}`}
                      
                      className={`
        block
        ${index !== 0 ? "mt-8 pt-8 border-t border-gray-300" : ""}
      `}
                    >

                      <p
                        className="
          text-orange-600
          font-bold
          uppercase
          text-sm
          mb-2
        "
                      >
                        WORLD
                      </p>

                      <h3
                        className="
          text-2xl
          font-serif
          font-semibold
          leading-tight
          hover:underline
        "
                      >
                        {article.title}
                      </h3>

                    </Link>

                  ))}
                </div>

                <Link
                  to={`/news/${news[14]?._id}`}
                  
                >

                  <img
                    src={
                      news[14]?.imageUrl ||
                      news[14]?.urlToImage
                    }
                    alt=""
                    className="
      w-full
      h-56
      object-cover
    "
                  />

                  <h3
                    className="
      text-2xl
      font-serif
      mt-4
      hover:underline
    "
                  >
                    {news[14]?.title}
                  </h3>



                </Link>
                <div>
                  {news.slice(15, 17).map((article, index) => (

                    <Link
                      key={index}
                      to={`/news/${article._id}`}
                      
                      className={`
        block
        ${index !== 0 ? "mt-8 pt-8 border-t border-gray-300" : ""}
      `}
                    >

                      <p
                        className="
          text-orange-600
          font-bold
          uppercase
          text-sm
          mb-2
        "
                      >
                        WORLD
                      </p>

                      <h3
                        className="
          text-2xl
          font-serif
          font-semibold
          leading-tight
          hover:underline
        "
                      >
                        {article.title}
                      </h3>

                    </Link>

                  ))}
                </div>

              </div>

              <div className="border-b border-gray-300 mt-4"></div>

            </div>

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
                Trending News
              </h2>
              {paginatedNews.map((article, index) => (

                <Link
                  key={index}
                  to={`/news/${article._id}`}
                  
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
              <div className="mb-6">

                <div className="flex items-center">

                  <div className="flex-1 border-t border-gray-300"></div>

                  <span
                    className="
        bg-cyan-700
        text-white
        px-5
        py-2
        font-bold
        uppercase
      "
                  >
                    In Case You MIssed It
                  </span>

                  <div className="flex-1 border-t border-gray-300"></div>

                </div>

              </div>
              <Link
                to={`/news/${news[20]?._id}`}
                
                className="block mb-6"
              >

                <div className="relative">

                  <img
                    src={
                      news[20]?.imageUrl ||
                      news[20]?.urlToImage
                    }
                    alt=""
                    className="
        w-full
        h-62
        object-cover
        rounded-2xl
      "
                  />

                  <div
                    className="
        absolute
        bottom-0
        left-0
        right-0
        bg-black/50
        text-white
        p-3
      "
                  >
                    <h3
                      className="
          text-xl
          font-serif
        "
                    >
                      {news[20]?.title}
                    </h3>
                  </div>

                </div>

              </Link>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {news.slice(1, 5).map((article, index) => (

                  <Link
                    key={index}
                    to={`/news/${article._id}`}
                    
                  >

                    <img
                      src={
                        article.imageUrl ||
                        article.urlToImage
                      }
                      alt=""
                      className="
        w-full
        h-28
        object-cover
        rounded-2xl
      "
                    />

                    <h4
                      className="
        text-sm
        mt-2
        hover:underline
        font-serif
      "
                    >
                      {article.title.slice(0, 50)}...
                    </h4>

                  </Link>

                ))}
              </div>
              {/* SIDEBAR AD */}
              <div
                className="
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
                    src="img.png"
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