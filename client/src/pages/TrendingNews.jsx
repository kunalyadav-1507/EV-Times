import { useEffect, useState, useRef } from "react";

import {

  useLocation

} from "react-router-dom";

import Navbar from "../components/Navbar";



import {
  fetchTrendingNews
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

  const location = useLocation();




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
            await fetchTrendingNews();

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
    <SkeletonCard
      fullPage={true}
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
        <div className="mb-8">

          <div className="flex items-center gap-3 mb-2">



            <h1
              className="
        text-3xl md:text-5xl
        font-bold
        text-gray-900
      "
            >
              ⚡Trending EV News
            </h1>

          </div>

          <p
            className="
      text-gray-500
      text-lg
      ml-5
    "
          >
            Latest electric vehicle, battery and charging stories making headlines today.
          </p>

        </div>

        {/* FEATURED SECTION */}

        <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-12
    gap-6
    mb-12
  "
>
          <div className="lg:col-span-5">

            {
              news[0] && (

                <Link
                  to="/news-details"
                  state={{
                    article: news[0],
                    relatedArticles: news,
                  }}
                  className="
          bg-white
          overflow-hidden
          h-full
          rounded-2xl
        "
                >

                  <img
                    src={
                      news[0].urlToImage ||
                      news[0].imageUrl
                    }
                    alt="hero"
                    className="
  w-full
  h-[250px]
  md:h-[350px]
  lg:h-[420px]
  object-cover
  rounded-xl
"
                  />

                  <div className="pt-4">

                    <h2
                      className="
              text-2xl md:text-3xl lg:text-4xl
              font-bold
              leading-tight
              mb-4
              hover:text-green-600
              transition
              cursor-pointer
            "
                    >
                      {news[0].title}
                    </h2>

                    <p
                      className="
              text-gray-600
              text-lg
              leading-relaxed
            "
                    >
                      {
                        news[0].description ||
                        news[0].content
                      }
                    </p>

                  </div>

                </Link>

              )
            }

          </div>
          <div className="lg:col-span-4">

            <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    gap-5
  "
>

              {
                news
                  .slice(1, 5)
                  .map((article, index) => (

                    <Link
                      key={index}
                      to="/news-details"
                      state={{
                        article,
                        relatedArticles: news,
                      }}
                      className="
              bg-white
              overflow-hidden
              cursor-pointer
              group
              rounded-xl
            "
                    >

                      <img
                        src={
                          article.urlToImage ||
                          article.imageUrl
                        }
                        alt="news"
                        className="
                w-full
                h-44
                object-cover
                rounded-xl
              "
                      />

                      <h3
                        className="
                mt-3
                text-xl
                font-bold
                leading-snug
                group-hover:text-green-600
                transition
              "
                      >
                        {article.title}
                      </h3>

                    </Link>

                  ))
              }

            </div>

          </div>
         <div
  className="
    hidden
    lg:block
    lg:col-span-3
    sticky
    top-24
    self-start
  "
>

            <div
              className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      h-full
      shadow-sm
      overflow-hidden
    "
            >

              <div
                className="
        bg-gray-100
        text-gray-500
        text-xs
        uppercase
        tracking-wider
        text-center
        py-2
        border-b
      "
              >
                Sponsored
              </div>

              <div
                className="
        h-[650px]
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-4
      "
              >

                <div
                  className="
          w-20
          h-20
          rounded-full
          bg-green-100
          flex
          items-center
          justify-center
          text-4xl
          mb-4
        "
                >
                  ⚡
                </div>

                <h3
                  className="
          text-xl
          font-bold
          mb-2
        "
                >
                  Advertisement
                </h3>

                <p
                  className="
          text-gray-500
          text-sm
        "
                >
                  Ad Space
                </p>

                <p
                  className="
          text-gray-400
          text-xs
          mt-2
        "
                >
                  300 × 600
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* LATEST TRENDING STORIES */}

        <div className="mt-16 ">




          <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-12
    gap-6
  "
>

            {/* News Area (same width as Hero + Small Stories) */}

            <div className="lg:col-span-9">
              <div className=" my-10 border-t border-gray-300"></div>
              <h2
                className="
      text-3xl
      font-bold
      mb-8
       border-l-4 border-cyan-500 pl-4
    "
              >
                Latest Trending Stories
              </h2>

              <div
                className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
              >

                {/* Column 1 */}
                <div>

                  <Link
                    to="/news-details"
                    state={{
                      article: news[5],
                      relatedArticles: news,
                    }}
                    className="block"
                  >

                    <img
                      src={news[5]?.imageUrl}
                      alt="news"
                      className="
              w-full
              h-52
              object-cover
              rounded-xl
              mb-4
            "
                    />

                    <h3
                      className="
              text-2xl
              font-bold
              mb-2
            "
                    >
                      {news[5]?.title}
                    </h3>
                  </Link>

                  <p
                    className="
              text-gray-500
              text-sm
              mb-4
            "
                  >
                    June 2026
                  </p>


                  <hr className="mb-4" />

                  <Link
                    to="/news-details"
                    state={{
                      article: news[6],
                      relatedArticles: news
                    }}
                    className="block"
                  >

                    <h4
                      className="
              text-xl
              font-semibold
              leading-relaxed
            "
                    >
                      {news[6]?.title}
                    </h4>
                  </Link>


                </div>

                {/* Column 2 */}
                <div>
                  <Link
                    to="/news-details"
                    state={{
                      article: news[7],
                      relatedArticles: news,
                    }}
                    className="block"
                  >

                    <img
                      src={news[7]?.imageUrl}
                      alt="news"
                      className="
              w-full
              h-52
              object-cover
              rounded-xl
              mb-4
            "
                    />

                    <h3
                      className="
              text-2xl
              font-bold
              mb-2
            "
                    >
                      {news[7]?.title}
                    </h3>
                  </Link>

                  <p
                    className="
              text-gray-500
              text-sm
              mb-4
            "
                  >
                    June 2026
                  </p>

                  <hr className="mb-4" />

                  <Link
                    to="/news-details"
                    state={{
                      article: news[8],
                      relatedArticles: news
                    }}
                    className="block"
                  >

                    <h4
                      className="
              text-xl
              font-semibold
              leading-relaxed
            "
                    >
                      {news[8]?.title}
                    </h4>
                  </Link>

                </div>

                {/* Column 3 */}
                <div>

                  <Link
                    to="/news-details"
                    state={{
                      article: news[9],
                      relatedArticles: news,
                    }}
                    className="block"
                  >

                    <img
                      src={news[9]?.imageUrl}
                      alt="news"
                      className="
              w-full
              h-52
              object-cover
              rounded-xl
              mb-4
            "
                    />

                    <h3
                      className="
              text-2xl
              font-bold
              mb-2
            "
                    >
                      {news[9]?.title}
                    </h3>
                  </Link>

                  <p
                    className="
              text-gray-500
              text-sm
              mb-4
            "
                  >
                    June 2026
                  </p>

                  <hr className="mb-4" />
                  <Link
                    to="/news-details"
                    state={{
                      article: news[10],
                      relatedArticles: news
                    }}
                    className="block"
                  >

                    <h4
                      className="
              text-xl
              font-semibold
              leading-relaxed
            "
                    >
                      {news[10]?.title}
                    </h4>

                  </Link>
                </div>

                {/* Column 4 */}
                <div>

                  <Link
                    to="/news-details"
                    state={{
                      article: news[11],
                      relatedArticles: news,
                    }}
                    className="block"
                  >

                    <img
                      src={news[11]?.imageUrl}
                      alt="news"
                      className="
              w-full
              h-52
              object-cover
              rounded-xl
              mb-4
            "
                    />

                    <h3
                      className="
              text-2xl
              font-bold
              mb-2
            "
                    >
                      {news[11]?.title}
                    </h3>
                  </Link>

                  <p
                    className="
              text-gray-500
              text-sm
              mb-4
            "
                  >
                    June 2026
                  </p>

                  <hr className="mb-4" />
                  <Link
                    to="/news-details"
                    state={{
                      article: news[12],
                      relatedArticles: news
                    }}
                    className="block"
                  >

                    <h4
                      className="
              text-xl
              font-semibold
              leading-relaxed
            "
                    >
                      {news[12]?.title}
                    </h4>

                  </Link>
                </div>

              </div>

            </div>

            {/* Empty Space Reserved For Sticky Ad */}

            <div
              className="
        col-span-2
      "
            />

          </div>

        </div>



        <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-12
    gap-6
  "
>

          <div className="lg:col-span-9">
            <div className="my-10">

              <div
                className="
      border-t
      border-gray-300
    "
              />

            </div>

            <div
              ref={latestNewsSectionRef}
              className="space-y-10">

              <h2 className="
            ref={latestNewsRef}
  text-2xl md:text-4xl
  font-bold
  mb-10
   border-l-4 border-cyan-500 pl-4
">
                More Stories
              </h2>

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
            text-3xl
            font-bold
            mb-4
            leading-tight
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
  h-48
  md:h-56
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
    gap-3
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
      px-4
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


      </div >
      <Footer />

    </>

  );

}

export default SearchResults;
























