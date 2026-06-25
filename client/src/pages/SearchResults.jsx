import { useEffect, useState } from "react";



import Navbar from "../components/Navbar";



import {
  searchNews
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

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SkeletonCard from "../components/SkeletonCard";


function SearchResults() {



  const query =

    new URLSearchParams(

      location.search

    ).get("q");


  const [news, setNews]

    = useState([]);

  const [loading, setLoading]

    = useState(true);

  const [

    savedArticles,

    setSavedArticles

  ] = useState([]);

  const [

    visibleCount,

    setVisibleCount

  ] = useState(7);

  const [

    loadingMore,

    setLoadingMore

  ] = useState(false);


  // FETCH SEARCH NEWS

  useEffect(() => {

    const getSearchNews = async () => {

      try {

        const response =

          await searchNews(
            query
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


    if (query) {

      getSearchNews();

    }

  }, [query]);


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

      // STOP MULTIPLE CALLS

      if (loadingMore) return;


      // CHECK IF USER REACHED BOTTOM

      if (

        window.innerHeight +

        document.documentElement.scrollTop + 100

        >=

        document.documentElement.offsetHeight

      ) {

        // STOP REPEATED LOADS

        setLoadingMore(true);


        // LOAD MORE AFTER 2 SEC

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


      // REMOVE ARTICLE

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



      // SAVE ARTICLE

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
          "Article saved"
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
      type="search"
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

        <div
  className="
    max-w-[2000px]
    mx-auto
    grid
    grid-cols-1
    lg:grid-cols-12
    gap-6
  "
>
          {/* LEFT AD */}

          <div
  className="
    hidden
    lg:block
    lg:col-span-2
    sticky
    top-32
    self-start
  "
>

            <div
              className="
      bg-white
      rounded-2xl
      h-[650px]
      border
      border-gray-200
      flex
      items-center
      justify-center
    "
            >
              <img className="rounded-2xl " src="awe.png"/>
            </div>

          </div>

          {/* PAGE TITLE */}


          <div
  className="
    lg:col-span-8
  "
>
            <div className="mb-10">

              <h1
                className="
      text-3xl md:text-5xl
      font-bold
      text-gray-900
      mb-3
    "
              >
                Search Results
              </h1>

              <p
                className="
      text-xl
      text-gray-600
    "
              >
                Showing results for
                <span className="font-semibold">
                  {" "} "{query}"
                </span>
              </p>

            </div>
            <div className="
  inline-flex
  items-center
  bg-cyan-700
  text-white
  px-4
  py-2
  rounded-3xl
  border
  border-gray-200
  mt-0
">
              {news.length} Articles Found
            </div>

            {
              news[0] && (

                <div
                  className="
        bg-white
        rounded-2xl
        overflow-hidden
        mb-10
        shadow-sm
      "
                >

                  <img
                    src={
                      news[0].imageUrl ||
                      news[0].urlToImage
                    }
                    alt={news[0].title}
                    className="
  w-full
  h-[220px]
  md:h-[350px]
  lg:h-[450px]
  object-cover
"
                  />

                  <div className="p-8">

                    <h2
                      className="
            text-2xl md:text-4xl
            font-bold
            mb-4
          "
                    >
                      {news[0].title}
                    </h2>

                    <p
                      className="
            text-lg
            text-gray-600
            leading-relaxed
          "
                    >
                      {
                        news[0].description ||
                        news[0].content
                      }
                    </p>

                  </div>

                </div>

              )
            }

            <div className="space-y-8">

              {
                news
                  .slice(1, visibleCount)
                  .map((article, index) => (

                    <Link
                      key={index}
                      to={`/news/${article._id}`}
                      
                      className="
                      block
    border-b
    border-gray-300
    pb-8
    mb-8
  "
                    >

                      <div
                        className="
              grid
grid-cols-1
md:grid-cols-4
              gap-6
              items-center
            "
                      >

                        {/* IMAGE */}

                        <div>

                          <img
                            src={
                              article.imageUrl ||
                              article.urlToImage
                            }
                            alt={article.title}
                            className="
  w-full
  h-52
  md:h-48
  object-cover
  rounded-xl
"
                          />

                        </div>

                        {/* CONTENT */}

                        <div className="md:col-span-3">
                          <div
                            className="
    flex
    items-center
    gap-3
    mb-3
  "
                          >

                            <span
                              className="
      text-xs
      uppercase
      tracking-wider
      text-cyan-700
      font-semibold
    "
                            >
                              {article.category || "EV"}
                            </span>

                            <span
                              className="
      text-sm
      text-gray-500
    "
                            >
                              {
                                article.publishedAt
                                  ? new Date(
                                    article.publishedAt
                                  ).toLocaleDateString()
                                  : ""
                              }
                            </span>

                          </div>
                          <h3
                            className="
                  text-xl md:text-2xl
                  font-bold
                  mb-3
                "
                          >
                            {article.title}
                          </h3>

                          <p
                            className="
                  text-gray-600
                  leading-relaxed
                "
                          >
                            {
                              article.description ||
                              article.content
                            }
                          </p>

                        </div>

                      </div>

                    </Link>

                  ))
              }

            </div>
            {
              visibleCount < news.length && (

                <div
                  className="
        flex
        justify-center
        mt-12
      "
                >

                  <button
                    onClick={() =>
                      setVisibleCount(
                        prev => prev + 6
                      )
                    }
                    className="
    text-cyan-700
    text-base md:text-lg
    font-semibold
    hover:text-cyan-900
    transition
    flex
    items-center
    gap-2
  "
                  >
                    Load More

                    <span
                      className="
      text-xl
      transition-transform
      group-hover:translate-x-1
    "
                    >
                      →
                    </span>

                  </button>

                </div>

              )
            }


            {/* NEWS GRID */}



          </div>

          {/* RIGHT AD */}

          <div
  className="
    hidden
    lg:block
    lg:col-span-2
    sticky
    top-32
    self-start
  "
>

            <div
              className="
      bg-white
      rounded-2xl
      h-[650px]
      border
      border-gray-200
      flex
      items-center
      justify-center
    "
            >
              <img className="rounded-2xl" src="awd.png"/>
            </div>

          </div>
        </div>


      </div>
      <Footer />

    </>

  );

}

export default SearchResults;



















