import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  fetchStateNews,
  fetchNewsByCategory
}
from "../services/newsService";

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

  const { stateName } = useParams();

  const [news, setNews]
    = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

  const NEWS_PER_PAGE = 6;

  const [trendingNews, setTrendingNews] = useState([]);

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

    setNews([]);

    setVisibleCount(9);

    setLoading(true);

    window.scrollTo(0, 0);



    const getNews = async () => {

      try {

        const response =
  await fetchStateNews(
    stateName
  );

        setNews(

          response.data.articles

        );

        const trendingResponse =
  await fetchNewsByCategory(
    "ev"
  );

        setTrendingNews(
          trendingResponse.data.articles
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

  }, [stateName]);


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
      type="state"
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

          {/* STATE HERO */}

          {news.length > 0 && (

            <div className="grid lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-8">
                <Link
                  to={`/news/${news[0]?._id}`}
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

                  <h1
                    className="
      text-xl
      font-semibold
      mt-6
    "
                  >
                    {stateName} EV News
                  </h1>

                  <h2
                    className="
      text-xl md:text-2xl lg:text-3xl
      font-semibold
      mt-4
      hover:underline
    "
                  >
                    {news[0]?.title}
                  </h2>

                </Link>

              </div>

              <div className="lg:col-span-4">

                <h3
                  className="
      text-2xl md:text-3xl
      font-bold
      mb-6
      border-l-4
      border-cyan-600
      pl-3
    "
                >
                  Trending EV News
                </h3>

                {trendingNews.slice(0, 5).map((article, index) => (

                  <Link
                    key={index}
                    to={`/news/${article._id}`}
                    state={{
                      article,
                      relatedArticles: trendingNews,
                    }}
                    className="block"
                  >

                    <div
                      className="
        pb-5
        mb-5
        border-b
        border-gray-300
      "
                    >

                      <h4
                        className="
          font-semibold
          hover:underline
          cursor-pointer
        "
                      >
                        {article.title}
                      </h4>

                    </div>

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
        bg-gray-100
        text-xs
      "
                    >
                      ADVERTISEMENT
                    </div>

                    <div
                      className="
        h-[300px]
        flex
        items-center
        justify-center
      "
                    >
                      Ad Space
                    </div>

                  </div>

                </div>
              </div>
            </div>
          )}
          {/* LATEST STATE NEWS */}
          {news.length > 1 && (
            <div 
            ref={latestNewsSectionRef}
            className="mb-12">

              <div className="flex items-center mb-10">

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
                  Latest {stateName} EV News
                </h2>

                <div className="flex-1 border-t border-gray-300"></div>

              </div>
              <div className="space-y-8">
                {paginatedNews.map((article, index) => (

                  <Link
                    key={index}
                    to={`/news/${article._id}`}
                    state={{
                      article,
                      relatedArticles: news,
                    }}
                    className="block"
                  >

                    <div
                      className="
        bg-white
        rounded-xl
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition
      "
                    >

                      <div
  className="
    grid
    grid-cols-1
    md:grid-cols-12
  "
>

                        {/* IMAGE */}

                        <div className="md:col-span-4">

                          <img
                            src={
                              article.imageUrl ||
                              article.urlToImage
                            }
                            alt=""
                            className="
  w-full
  h-52
  md:h-full
  object-cover
"
                          />

                        </div>

                        {/* CONTENT */}

                        <div
                          className="
            md:col-span-8
            p-6
          "
                        >

                          <h3
                            className="
              text-xl md:text-2xl
              font-bold
              hover:underline
            "
                          >
                            {article.title}
                          </h3>

                          <p
                            className="
              text-gray-600
              mt-4
            "
                          >
                            {
                              (
                                article.description ||
                                ""
                              ).slice(0, 150)
                            }...
                          </p>

                        </div>

                      </div>

                    </div>

                  </Link>

                ))}
              </div>
            </div>
          )}
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