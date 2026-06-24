import { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar";



  import { fetchNewsByCategory } from "../services/newsService";


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
    "bms"
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
      type="bms"
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

          {/* BMS HERO */}

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8">

              <Link
                to="/news-details"
                state={{
                  article: news[0],
                  relatedArticles: news,
                }}
              >

                <img
                  src={
                    news[0]?.imageUrl ||
                    news[0]?.urlToImage
                  }
                  alt=""
                  className="
  w-full
  h-[250px]
  md:h-[400px]
  lg:h-[500px]
  object-cover
  rounded-xl
"
                />

                <h2
                  className="
        text-xl md:text-2xl lg:text-3xl
        font-serif
        font-bold
        mt-6
        hover:underline
      "
                >
                  {news[0]?.title}
                </h2>

                <p
                  className="
        text-lg
        text-gray-600
        mt-4
      "
                >
                  {
                    (
                      news[0]?.description ||
                      news[0]?.content ||
                      ""
                    ).slice(0, 220)
                  }...
                </p>

              </Link>

            </div>
            <div className="lg:col-span-4">

              <h3
                className="
      text-2xl md:text-3xl
      font-bold
      border-l-4
      border-cyan-500
      pl-3
      mb-6
    "
              >
                Battery Insights
              </h3>

              {news.slice(1, 5).map((article, index) => (

                <Link
                  key={index}
                  to="/news-details"
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                  className="
        flex
        gap-4
        pb-5
        mb-5
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
         w-24
h-20
md:w-28
md:h-24
          object-cover
          rounded
        "
                  />

                  <h4
                    className="
          font-semibold
          font-serif
          hover:underline
        "
                  >
                    {article.title}
                  </h4>

                </Link>

              ))}

            </div>
          </div>

          <div className="mb-16">
            {/* BATTERY INSIGHTS */}

            <div className="my-16">

              {/* HEADING */}

              <div className="flex items-center mb-10">

                <div className="flex-1 border-t border-gray-300"></div>

                <h2
                  className="
        px-6
        text-4xl
        font-bold
        text-cyan-700
        whitespace-nowrap
      "
                >
                  Battery Insights
                </h2>

                <div className="flex-1 border-t border-gray-300"></div>

              </div>

              {/* CARDS */}

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {news.slice(5, 9).map((article, index) => (

                  <Link
                    key={index}
                    to="/news-details"
                    state={{
                      article,
                      relatedArticles: news,
                    }}
                    className="
          bg-white
          rounded-xl
          overflow-hidden
          shadow-sm
          hover:shadow-lg
          transition
          duration-300
        "
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
          "
                    />

                    <div className="p-4">

                      <span
                        className="
              text-cyan-600
              text-xs
              uppercase
              font-bold
            "
                      >
                        Battery Tech
                      </span>

                      <h3
                        className="
              mt-2
              font-serif
              font-semibold
              text-lg
              hover:underline
            "
                      >
                        {article.title}
                      </h3>

                    </div>

                  </Link>

                ))}

              </div>

            </div>
          </div>

          {/* LATEST BMS NEWS SECTION */}

          <div
          ref={latestNewsSectionRef}
           className=" grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8">
              <div className="flex items-center mb-8">

                <div className="flex-1 border-t border-gray-300"></div>

                <h2
                  className="
           ref={latestNewsRef}
      px-6
      text-2xl md:text-4xl
      font-bold
      text-cyan-700
    "
                >
                  Latest BMS News
                </h2>

                <div className="flex-1 border-t border-gray-300"></div>

              </div>
              {paginatedNews.map((article, index) => (

                <Link
                  key={index}
                  to="/news-details"
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                  className="
  flex
  flex-col
  md:flex-row
  gap-5
  py-6
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
  w-full
  md:w-52
  h-48
  md:h-32
  object-cover
  rounded-lg
"
                  />

                  <div>

                    <h3
                      className="
          text-xl md:text-2xl
          font-serif
          font-bold
          hover:underline
        "
                    >
                      {article.title}
                    </h3>

                    <p
                      className="
          text-gray-600
          mt-3
        "
                    >
                      {
                        (
                          article.description ||
                          ""
                        ).slice(0, 140)
                      }...
                    </p>

                  </div>

                </Link>

              ))}
            </div>
            <div className="lg:col-span-4">
              <h2
                className="
    text-3xl
    font-bold
    mb-6
    border-l-4
    border-cyan-600
    pl-3
  "
              >
                Battery Focus
              </h2>
              {news.slice(15, 20).map((article, index) => (

                <Link
                  key={index}
                  to="/news-details"
                  state={{
                    article,
                    relatedArticles: news,
                  }}
                  className="
      flex
      gap-4
      mb-5
      pb-5
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

                  <h4
                    className="
        font-medium
        font-serif
        hover:underline
      "
                  >
                    {article.title}
                  </h4>

                </Link>

              ))}

              <div
  className="
    hidden
    lg:block
    sticky
    top-24
    mt-8
  "
>

                <div
                  className="
      bg-white
      rounded-xl
      shadow
      overflow-hidden
    "
                >

                  <div
                    className="
        text-center
        py-2
        text-xs
        bg-gray-100
      "
                  >
                    ADVERTISEMENT
                  </div>

                  <div
                    className="
        h-[350px]
        flex
        items-center
        justify-center
        bg-gray-50
      "
                  >
                    Ad Space
                  </div>

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