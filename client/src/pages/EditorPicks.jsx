import { useEffect, useState, useRef } from "react";

import {

  useLocation

} from "react-router-dom";

import Navbar from "../components/Navbar";



import {
  fetchEditorPicks
}
  from "../services/newsService";


import {

  saveArticle,

  getSavedArticles,

  removeSavedArticle

}

  from "../services/savedNewsService";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import Footer from "../components/Footer";


function SearchResults() {

  




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


  // FETCH SEARCH NEWS

  useEffect(() => {

    const getTrendingNews =
      async () => {

        try {

          const response =
            await fetchEditorPicks();

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

    getTrendingNews();

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

      <h2>

        Searching EV News...

      </h2>

    );

  }
  const heroArticle = news[0];
  const topPicks = news.slice(1, 4);
  const trendingPicks = news.slice(0, 7);






  return (

    <>

      <Navbar />

      <div
        className="
    hidden xl:block
    fixed
    left-4
    top-52
    w-70
    z-10
  "
      >
        <div
          className="
      bg-white
      border
      rounded-xl
      h-[530px]
      shadow
      flex
      items-center
      justify-center
      text-gray-500
      font-semibold
    "
        >
          <img className="rounded-xl" src="ad.png" />
        </div>
      </div>
      <div
        className="
    hidden xl:block
    fixed
    right-4
    top-52
    w-60
    z-10
  "
      >
        <div
          className="
      bg-white
      border
      rounded-xl
      h-[697px]
      shadow
      flex
      items-center
      justify-center
      text-gray-500
      font-semibold
    "
        >
          <img className="rounded-xl" src="ad2.png" />
        </div>
      </div>


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

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="
    uppercase
    tracking-[3px] md:tracking-[8px]
    text-gray-500
    text-sm
    mb-4
  ">
              Editorial Selection
            </p>

            <h1 className="
    text-3xl md:text-5xl lg:text-6xl
    font-bold
    text-gray-900
    mb-5
  ">
              Editor Picks
            </h1>

          </div>

          <div
            className="
    bg-gray-50
    border-l-4
    border-black
   p-5 md:p-8
    mb-16
  "
          >

            <p className="
    uppercase
    text-sm
    tracking-widest
    text-gray-500
    mb-3
  ">
              Editor's Note
            </p>

            <p className="
    text-lg md:text-xl
    italic
    leading-relaxed
    text-gray-700
  ">
              Our editors selected these stories
              because they represent the most
              important developments shaping
              the future of electric mobility.
            </p>

          </div>

          {heroArticle && (

            <Link
              to="/news-details"
              state={{
                article: heroArticle,
                relatedArticles: news,
              }}
              className="block mb-20"
            >

              <div className="grid lg:grid-cols-2 gap-10 items-center">

                {/* Image */}

                <div>

                  <img
                    src={
                      heroArticle.imageUrl ||
                      heroArticle.urlToImage
                    }
                    alt={heroArticle.title}
                    className="
  w-full
  h-[250px]
  md:h-[400px]
  lg:h-[500px]
  object-cover
  rounded-xl
"
                  />

                </div>

                {/* Content */}

                <div>

                  <p className="
          uppercase
          tracking-widest
          text-gray-500
          text-sm
          mb-4
        ">
                    Editor's Choice
                  </p>

                  <h2 className="
          text-2xl md:text-4xl lg:text-5xl
          font-bold
          leading-tight
          mb-6
          hover:underline
        ">
                    {heroArticle.title}
                  </h2>

                  <p className="
          text-lg
          text-gray-600
          leading-relaxed
        ">
                    {
                      heroArticle.description ||
                      heroArticle.content
                    }
                  </p>

                </div>

              </div>

            </Link>

          )}

          <div className="mb-10">

            <div className="flex items-center my-16">

              <div className="flex-1 border-t border-gray-300"></div>

              <span
                className="
      px-4
      text-black-500
      uppercase
      text-2xl
      tracking-widest
    "
              >
                Top Picks
              </span>

              <div className="flex-1 border-t border-gray-300"></div>

            </div>



          </div>
          <div className="
  grid
  md:grid-cols-2
  lg:grid-cols-3
  gap-8
  mb-20
">

            {topPicks.map((article, index) => (

              <Link
                key={index}
                to="/news-details"
                state={{
                  article,
                  relatedArticles: news,
                }}
                className="
        block
        group
        hover:underline
      "
              >

                <img
                  src={
                    article.imageUrl ||
                    article.urlToImage
                  }
                  alt={article.title}
                  className="
          w-full
         h-52 md:h-56
          object-cover
          rounded-xl
          mb-4
        "
                />

                <p className="
        uppercase
        text-xs
        tracking-widest
        text-gray-500
        mb-2
      ">
                  Editor's Pick
                </p>

                <h3 className="
        text-xl md:text-2xl
        font-bold
        leading-snug
        group-hover:underline
      ">
                  {article.title}
                </h3>

              </Link>

            ))}

          </div>



          <div className="flex items-center my-16">

            <div className="flex-1 border-t border-gray-300"></div>

            <span className="px-4 text-black-500 uppercase text-2xl tracking-widest">
              Trending Picks
            </span>

            <div className="flex-1 border-t border-gray-300"></div>

          </div>
          <div className="
  flex
  gap-6
  overflow-x-auto
  pb-4
  hide-scrollbar
">
            {trendingPicks.map((article, index) => (

              <Link
                key={index}
                to="/news-details"
                state={{
                  article,
                  relatedArticles: news,
                }}
                className="
      min-w-[100px]
      flex-shrink-0
      hover:underline
    "
              >

                <img
                  src={
                    article.imageUrl ||
                    article.urlToImage
                  }
                  alt={article.title}
                  className="
  w-52
  h-52
  md:w-70
  md:h-70
  object-cover
  rounded-xl
"
                />

                <h3 className="
  mt-3
  w-52
  md:w-70
  font-bold
  text-base
  md:text-lg
">
                  {article.title}
                </h3>

              </Link>

            ))}
          </div>



          <div
            ref={latestNewsSectionRef}
            className="space-y-10">

            <div className="flex items-center my-12">

              <div className="flex-1 border-t border-gray-300"></div>

              <span
                className="
    ref={latestNewsRef}
      px-4
      text-black-500
      uppercase
      text-2xl
      tracking-widest
    "
              >
                Editor's Choice
              </span>

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
                block
        border-b
        border-gray-300
        pb-10
        mb-10
        cursor-pointer
        
      "
              >

                <div className="
        grid
        md:grid-cols-3
        gap-8
        items-center
      ">

                  {/* LEFT SIDE */}

                  <div className="md:col-span-2">

                    <p className="
            text-sm
            text-gray-500
            mb-3
          ">
                      {article.category} • {" "}
                      {new Date(
                        article.publishedAt
                      ).toLocaleDateString()}
                    </p>

                    <h3 className="
           text-xl md:text-3xl
            font-bold
            mb-4
            leading-tight
            hover:underline
          ">
                      {article.title}
                    </h3>

                    <p className="
            text-gray-600
            text-lg
            leading-relaxed
          ">
                      {
                        article.description ||
                        article.content
                      }
                    </p>

                  </div>

                  {/* RIGHT SIDE */}

                  <div>

                    <img
                      src={
                        article.imageUrl ||
                        article.urlToImage
                      }
                      alt={article.title}
                      className="
              w-full
              h-48 md:h-56
              object-cover
              rounded-lg
            "
                    />

                  </div>

                </div>

              </Link>

            ))}

          </div>

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
      px-4
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

export default SearchResults;





















