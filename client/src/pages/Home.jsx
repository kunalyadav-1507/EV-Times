import { useEffect, useState } from "react";

import {
  fetchHomeNews
}
from "../services/newsService";

import Navbar from "../components/Navbar";

import { Link, useNavigate } from "react-router-dom";

import { getApprovedNews } from "../services/publicNewsService";

import {

  saveArticle,

  getSavedArticles,

  removeSavedArticle

}

  from "../services/savedNewsService";

import NewsCard from "../components/NewsCard";


import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";


import "swiper/css";

import "swiper/css/navigation";

import toast
  from "react-hot-toast";

import Footer from "../components/Footer";

import SkeletonCard from "../components/SkeletonCard";



function Home() {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [approvedNews, setApprovedNews] = useState([]);

  const [savedArticles, setSavedArticles] = useState([]);

  const [visibleCount, setVisibleCount] = useState(9);

  const [

    loadingMore,

    setLoadingMore

  ] = useState(false);

  const navigate = useNavigate();




  // BOOKMARK TOGGLE

  const handleSave = async (article) => {

    try {

      const articleUrl =

        article.url ||

        article.articleUrl;


      // CHECK IF ARTICLE ALREADY SAVED

      const existingArticle =

        savedArticles.find(

          (saved) =>

            (

              saved?.articleUrl ||

              saved?.url

            ) === articleUrl

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

                ) !== articleUrl

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


        // NORMALIZED SAVED ARTICLE

        const newSavedArticle = {

          ...response.data,

          articleUrl:

            response.data.articleUrl ||

            articleData.articleUrl

        };


        setSavedArticles(

          (prev) => [

            ...prev,

            // newSavedArticle
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


  // FETCH NEWS

  useEffect(() => {

    const getNews = async () => {

      try {

        const response =
  await fetchHomeNews();

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


  // FETCH APPROVED NEWS

  useEffect(() => {

    const fetchApprovedNews = async () => {

      try {

        const response =

          await getApprovedNews();

        setApprovedNews(

          response.data

        );

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchApprovedNews();

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

  useEffect(() => {

    const handleScroll = () => {

      // STOP MULTIPLE LOADS

      // if (loadingMore) return;


      // CHECK IF USER REACHED BOTTOM

      // if (

      //   window.innerHeight +

      //   document.documentElement.scrollTop + 100

      //   >=

      //   document.documentElement.offsetHeight

      // ) 
      {

        // START LOADING

        setLoadingMore(true);


        // LOAD AFTER 2 SEC

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


  if (loading) {
  return (
    <SkeletonCard
      type="home"
    />
  );
}


  const combinedNews = [

    ...approvedNews,

    ...news

  ];

  const evNews = combinedNews.filter((article) => {
    const text = `
    ${article.title || ""}
    ${article.description || ""}
  `.toLowerCase();

    return (
      text.includes("ev") ||
      text.includes("electric vehicle") ||
      text.includes("tesla") ||
      text.includes("byd") ||
      text.includes("battery") ||
      text.includes("charging") ||
      text.includes("tata") ||
      text.includes("mg") ||
      text.includes("vinfast") ||
      text.includes("hyundai")
    );
  });

  const newsChunks = [];

  for (let i = 15; i < evNews.length; i += 6) {
    newsChunks.push(evNews.slice(i, i + 6));
  }


  return (

    <>

      <Navbar />
      




      <div
  className="
    bg-gray-100
    min-h-screen
    px-4
    md:px-8
    py-8
  "
>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-10">


          {/* MAIN CONTENT */}


         <div className="lg:col-span-3 pr-0 xl:pr-2">


            {/* FEATURED HERO */}


            <div className="grid grid-cols-1 xl:grid-cols-15 gap-6 mb-12">

              {/* LEFT COLUMN */}

              <div className="xl:col-span-6">

                <Link
                  to={`/news/${combinedNews[4]?._id}`}
                  state={{
                    article: combinedNews[4],
                    relatedArticles: combinedNews
                  }}
                >

                  <img
                    src={
                      combinedNews[4]?.imageUrl ||
                      combinedNews[4]?.urlToImage
                    }
                    alt="news"
                    className="
  w-full
  h-[250px]
  md:h-[350px]
  xl:h-[450px]
  object-cover
  rounded-xl
"
                  />

                  <div className="bg-white text-black p-6 rounded-b-xl">

                    <h1
  className="
    text-2xl
    md:text-3xl
    xl:text-4xl
    font-bold
    mb-4
  "
>

                      {combinedNews[4]?.title}

                    </h1>

                    <p className="text-black-300">

                      {

                        combinedNews[4]?.description ||

                        combinedNews[4]?.content

                      }

                    </p>

                  </div>

                </Link>

                {/* RELATED NEWS */}

                <div className="mt-6 border-t border-gray-300 pt-4">

                  <h3 className="font-bold text-lg mb-4">

                    Related News

                  </h3>

                  {

                    combinedNews

                      .slice(2, 6)

                      .map((article, index) => (

                        <Link

                          key={index}

                          to={`/news/${article._id}`}

                          state={{
                            article,
                            relatedArticles: combinedNews
                          }}

                          className="
                block
                py-2
                hover:underline
              "

                        >

                          • {article.title}

                        </Link>

                      ))

                  }

                </div>

              </div>
              {/* CENTER + RIGHT COLUMN */}

              <div className="xl:col-span-3">

                {/* FEATURED */}

                <Link
                  to={`/news/${combinedNews[1]?._id}`}
                  state={{
                    article: combinedNews[1],
                    relatedArticles: combinedNews
                  }}
                >

                  <img
                    src={
                      combinedNews[1]?.imageUrl ||
                      combinedNews[1]?.urlToImage
                    }
                    alt="news"
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />

                  <h2 className=" text-xl
    md:text-2xl
    font-semibold mb-6 hover:underline">

                    {combinedNews[1]?.title}

                  </h2>

                </Link>

                {/* HEADLINES */}

                {

                  combinedNews

                    .slice(6, 11)

                    .map((article, index) => (

                      <Link

                        key={index}

                        to={`/news/${article._id}`}

                        state={{
                          article,
                          relatedArticles: combinedNews
                        }}

                        className="
              flex
              gap-3
              border-t
              border-gray-300
              py-4
            "

                      >

                        <img

                          src={
                            article.imageUrl ||
                            article.urlToImage
                          }

                          alt="news"

                          className="
                w-24
                h-20
                object-cover
                rounded-lg
              "

                        />

                        <p className="hover:underline">

                          {article.title}

                        </p>

                      </Link>

                    ))

                }

              </div>


              {/* COLUMN 3 */}

              <div className="xl:col-span-3 space-y-8">

                {/* MUST READ */}

                <div>

                  <h3 className="uppercase text-gray-500 text-sm font-semibold border-l-4 border-cyan-500 pl-2 mb-4">

                    Must Read

                  </h3>

                  <Link
                    to={`/news/${combinedNews[11]?._id}`}
                    state={{
                      article: combinedNews[11],
                      relatedArticles: combinedNews
                    }}
                  >

                    <img
                      src={
                        combinedNews[11]?.imageUrl ||
                        combinedNews[11]?.urlToImage
                      }
                      alt="news"
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />

                    <h4 className="font-semibold text-lg hover:underline">

                      {combinedNews[11]?.title}

                    </h4>

                  </Link>

                  {

                    combinedNews
                      .slice(12, 15)
                      .map((article, index) => (

                        <Link
                          key={index}
                          to={`/news/${article._id}`}
                          state={{
                            article,
                            relatedArticles: combinedNews
                          }}
                          className="block py-3 border-b border-gray-300 hover:underline"
                        >

                          {article.title}

                        </Link>

                      ))

                  }

                </div>

                {/* MORE HEADLINES */}

                <div>

                  <h3 className="uppercase text-gray-500 text-sm font-semibold border-l-4 border-cyan-500 pl-2 mb-4">

                    More Headlines

                  </h3>

                  <Link
                    to={`/news/${combinedNews[15]?._id}`}
                    state={{
                      article: combinedNews[15],
                      relatedArticles: combinedNews
                    }}
                  >

                    <img
                      src={
                        combinedNews[15]?.imageUrl ||
                        combinedNews[15]?.urlToImage
                      }
                      alt="news"
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />

                    <h4 className="font-semibold text-lg hover:underline">

                      {combinedNews[15]?.title}

                    </h4>

                  </Link>

                  {

                    combinedNews
                      .slice(16, 19)
                      .map((article, index) => (

                        <Link
                          key={index}
                          to={`/news/${article._id}`}
                          state={{
                            article,
                            relatedArticles: combinedNews
                          }}
                          className="block py-3 border-b border-gray-300 hover:underline"
                        >

                          {article.title}

                        </Link>

                      ))

                  }

                </div>

              </div>

              {/* ADVERTISEMENT COLUMN */}

              <div className="hidden xl:block">

                <div className="sticky top-32">

                  <p className="text-center text-xs text-gray-500 uppercase mb-2">

                    Advertisement

                  </p>

                  <div
                    className="
        w-[300px]
        h-[450px]
        bg-white
        border
        rounded-xl
        shadow-sm
        flex
        items-center
        justify-center
      "
                  >

                    <img src="ev.png"/>

                  </div>

                </div>

              </div>

            </div>

            {/* TRENDING STORIES */}

            <div className="mb-16">

              <h2 className="uppercase text-2xl md:text-3xl font-semibold tracking-wide border-l-4 border-cyan-500 pl-2 mb-6">

                Trending Stories

              </h2>

              <Swiper
                className="trending-swiper"
                modules={[Autoplay]}
                loop={true}
                speed={5000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                spaceBetween={20}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 6,
                  },
                }}
              >

                {combinedNews.slice(20, 30).map((article, index) => (

                  <SwiperSlide key={index}>

                    <Link
                      to={`/news/${article._id}`}
                      state={{
                        article,
                        relatedArticles: combinedNews,
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
  h-40
  md:h-56
  lg:h-64
  object-cover
  rounded-xl
              transition-transform
    duration-300
    hover:scale-105
            "
                      />

                      <p
                        className="
             mt-3
  text-xs
  md:text-sm
  font-medium
              line-clamp-3
              hover:underline
            "
                      >

                        {article.title}

                      </p>

                    </Link>

                  </SwiperSlide>

                ))}

              </Swiper>

            </div>

            {/* FEATURED NEWS */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

              {/* LEFT SIDE */}

              <div className="lg:col-span-8">

                <div className="flex items-center  mb-6">

                  <h2 className="uppercase text-3xl font-semibold tracking-wide border-l-4 border-cyan-500 pl-2">

                    Featured News

                  </h2>



                </div>
                <div
                  className="
    grid
    md:grid-cols-[1.2fr_1fr]
    gap-6
    items-start
  "
                >

                  {/* LEFT IMAGE */}

                  <Link
                    to={`/news/${combinedNews[2]?._id}`}
                    state={{
                      article: combinedNews[2],
                      relatedArticles: combinedNews,
                    }}>

                    <img
                      src={
                        combinedNews[2]?.imageUrl ||
                        combinedNews[2]?.urlToImage
                      }
                      alt="news"
                      className="
  w-full
  h-[220px]
  md:h-[300px]
  object-cover
  rounded-xl
"
                    />
                    <h3
                      className="
      text-xl
  md:text-2xl
  font-medium
  mt-4
      hover:underline
      
    "
                    >

                      {combinedNews[2]?.title}

                    </h3>

                    <p
                      className="text-gray-600 mt-3 "
                    >

                      {
                        (
                          combinedNews[2]?.description ||
                          combinedNews[2]?.content ||
                          ""
                        ).slice(0, 140)
                      }...

                    </p>

                  </Link>

                  {/* RIGHT STORIES */}

                  <div>

                    {combinedNews.slice(3, 7).map((article, index) => (

                      <Link
                        key={index}
                        to={`/news/${article._id}`}
                        state={{
                          article,
                          relatedArticles: combinedNews,
                        }}
                        className="
  flex
  gap-3
  md:gap-4
  mb-5
"
                      >

                        <img
                          src={
                            article.imageUrl ||
                            article.urlToImage
                          }
                          alt="news"
                          className="
            w-24 h-20 md:w-28 md:h-20
            object-cover
            rounded-lg
          "
                        />

                        <p className="hover:underline">

                          {article.title}

                        </p>

                      </Link>

                    ))}

                  </div>

                </div>
                <Link
                  to={`/news/${combinedNews[1]?._id}`}
                  state={{
                    article: combinedNews[1],
                    relatedArticles: combinedNews,
                  }}
                >



                  <div className="text-right mt-4">

                    <Link
                      to="/featured"
                      className="text-sm hover:underline"
                    >
                      See Full Coverage →
                    </Link>

                  </div>

                </Link>

                <hr className="my-8 border-gray-300" />
                {combinedNews.slice(6, 8).map((article, index) => (

                  <div key={index}>

                    <hr className="my-8 border-gray-300" />

                    <Link
                      to={`/news/${article._id}`}
                      state={{
                        article,
                        relatedArticles: combinedNews,
                      }}
                      className="
        grid
        md:grid-cols-[1fr_220px]
        gap-6
        items-center
      "
                    >

                      <div>

                        <h4 className="text-2xl hover:underline">

                          {article.title}

                        </h4>

                        <p className="text-gray-600 mt-3">

                          {
                            (
                              article.description ||
                              article.content ||
                              ""
                            ).slice(0, 140)
                          }...

                        </p>

                      </div>

                      <img
                        src={
                          article.imageUrl ||
                          article.urlToImage
                        }
                        alt="news"
                        className="
          w-full
          h-48 md:h-32
          object-cover
          rounded-xl
        "
                      />

                    </Link>

                  </div>

                ))}


              </div>

              {/* RIGHT SIDE */}


              <div className="lg:col-span-4">

                <h2 className="uppercase text-3xl font-semibold tracking-wide border-l-4 border-cyan-500 pl-2 mb-6">

                  Most Popular

                </h2>

                {combinedNews
                  .slice(5, 15)
                  .map((article, index) => (

                    <Link
                      key={index}
                      to={`/news/${article._id}`}
                      state={{
                        article,
                        relatedArticles: combinedNews,
                      }}
                      className="
          flex
          gap-4
          py-5
          border-b
          border-gray-200
        "
                    >

                      <span
                        className="
            text-3xl md:text-5xl
            text-gray-300
            font-light
            leading-none
            min-w-[50px]
          "
                      >

                        {index + 1}

                      </span>

                      <p
                        className="
            text-base
            hover:underline
            leading-relaxed
          "
                      >

                        {article.title}

                      </p>

                    </Link>

                  ))}
              </div>

            </div>






            {/* Editor's pick */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

              {/* LEFT SIDE */}

              <div className="lg:col-span-8">

                <div className="flex items-center  mb-6">

                  <h2 className="uppercase text-2xl md:text-3xl font-semibold tracking-wide border-l-4 border-cyan-500 pl-2">

                    Editor's Pick

                  </h2>



                </div>
                <div
                  className="
    grid
    md:grid-cols-[1.2fr_1fr]
    gap-6
    items-start
  "
                >

                  {/* LEFT IMAGE */}

                  <Link
                    to={`/news/${combinedNews[8]?._id}`}
                    state={{
                      article: combinedNews[8],
                      relatedArticles: combinedNews,
                    }}>

                    <img
                      src={
                        combinedNews[8]?.imageUrl ||
                        combinedNews[8]?.urlToImage
                      }
                      alt="news"
                     className="
  w-full
  h-[220px]
  md:h-[300px]
  object-cover
  rounded-xl
"
                    />
                    <h3
                      className="
       text-xl
  md:text-2xl
  font-medium
      hover:underline
      
    "
                    >

                      {combinedNews[8]?.title}

                    </h3>

                    <p
                      className="text-gray-600 mt-3 "
                    >

                      {
                        (
                          combinedNews[8]?.description ||
                          combinedNews[8]?.content ||
                          ""
                        ).slice(0, 140)
                      }...

                    </p>

                  </Link>

                  {/* RIGHT STORIES */}

                  <div>

                    {combinedNews.slice(9, 13).map((article, index) => (

                      <Link
                        key={index}
                        to={`/news/${article._id}`}
                        state={{
                          article,
                          relatedArticles: combinedNews,
                        }}
                        className="
          flex
          gap-4
          mb-5
        "
                      >

                        <img
                          src={
                            article.imageUrl ||
                            article.urlToImage
                          }
                          alt="news"
                          className="
           w-24 h-20 md:w-28 md:h-20
            object-cover
            rounded-lg
          "
                        />

                        <p className="hover:underline">

                          {article.title}

                        </p>

                      </Link>

                    ))}

                  </div>

                </div>
                <Link
                  to={`/news/${combinedNews[1]?._id}`}
                  state={{
                    article: combinedNews[1],
                    relatedArticles: combinedNews,
                  }}
                >



                  <div className="text-right mt-4">

                    <Link
                      to="/editor-picks"
                      className="text-sm hover:underline"
                    >
                      See Full Coverage →
                    </Link>

                  </div>

                </Link>

                <hr className="my-8 border-gray-300" />
                {combinedNews.slice(13, 15).map((article, index) => (

                  <div key={index}>

                    <hr className="my-8 border-gray-300" />

                    <Link
                      to={`/news/${article._id}`}
                      state={{
                        article,
                        relatedArticles: combinedNews,
                      }}
                      className="
        grid
        md:grid-cols-[1fr_220px]
        gap-6
        items-center
      "
                    >

                      <div>

                        <h4 className="text-2xl hover:underline">

                          {article.title}

                        </h4>

                        <p className="text-gray-600 mt-3">

                          {
                            (
                              article.description ||
                              article.content ||
                              ""
                            ).slice(0, 140)
                          }...

                        </p>

                      </div>

                      <img
                        src={
                          article.imageUrl ||
                          article.urlToImage
                        }
                        alt="news"
                        className="
          w-full
          h-32
          object-cover
          rounded-xl
        "
                      />

                    </Link>

                  </div>

                ))}


              </div>

              {/* RIGHT SIDE */}


              <div className="lg:col-span-4">

                <h2 className="uppercase text-sm font-semibold tracking-wide border-l-4 border-cyan-500 pl-2 mb-6">

                  Advertisement

                </h2>

                <div
                  className="
                   hidden
    lg:flex
      sticky
      top-24
      border
      rounded-xl
      bg-white
      h-[600px]
      flex
      items-center
      justify-center
      text-gray-500
    "
                >

                  <img src="/ev_image.jpg"/>

                </div>

              </div>

            </div>



            {/* LATEST EV NEWS */}

            <div className="mt-16 mb-20">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* LEFT CONTENT */}

                <div className="lg:col-span-8">

                  {/* BANNER */}

                  <div className="relative">

                    <img
                      src="/img.png"
                      alt="news"
                      className="
             w-full
    md:w-[86%]
    mx-auto
    h-[220px]
    md:h-[450px]
    object-cover
    rounded-xl
          "
                    />

                    <div
                      className="
              absolute
    bottom-6
    md:bottom-24
    left-4
    md:left-[8%]
            flex
            items-center
            gap-3
          "
                    >

                      <div className="w-2 h-10 bg-orange-500 rounded"></div>

                      <h2
  className="
    text-black
    text-2xl
    md:text-4xl
    font-bold
  "
>
                        Latest EV News
                      </h2>

                    </div>

                  </div>

                  {/* FLOATING CARD */}

                  <div
  className="
    bg-white
    rounded-2xl
    p-4
    md:p-8
    w-full
    md:w-[78%]
    mx-auto
    mt-4
    md:-mt-16
    relative
    z-10
    shadow-xl
  "
>

                    <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">

                      {/* FEATURED STORY */}

                      <Link
                        to={`/news/${evNews[16]?._id}`}
                        state={{
                          article: evNews[16],
                          relatedArticles: evNews,
                        }}
                      >

                        <img
                          src={
                            evNews[16]?.imageUrl ||
                            evNews[16]?.urlToImage
                          }
                          alt="news"
                          className="
      w-full
      h-72
      object-cover
      rounded-xl
    "
                        />

                        <h3
                          className="
      text-2xl
      font-semibold
      mt-4
      hover:underline
    "
                        >
                          {evNews[16]?.title}
                        </h3>

                        <p
                          className="
      text-gray-600
      mt-3
      leading-relaxed
    "
                        >
                          {
                            (
                              evNews[16]?.description ||
                              evNews[16]?.content ||
                              ""
                            ).slice(0, 160)
                          }...
                        </p>

                      </Link>
                      {/* SIDE STORIES */}

                      <div className="space-y-5">

                        {evNews
                          .slice(17, 21)
                          .map((article, index) => (

                            <Link
                              key={index}
                              to={`/news/${article._id}`}
                              state={{
                                article,
                                relatedArticles: evNews,
                              }}
                              className="
                    flex
                    gap-3
                    items-start
                    border-b
                    border-gray-300
                    pb-4
                  "
                            >

                              <img
                                src={
                                  article.imageUrl ||
                                  article.urlToImage
                                }
                                alt="news"
                                className="
                      w-28
                      h-20
                      object-cover
                      rounded-lg
                      flex-shrink-0
                    "
                              />

                              <p
                                className="
                      text-sm
                      leading-5
                      hover:underline
                      line-clamp-3
                    "
                              >
                                {article.title}
                              </p>

                            </Link>

                          ))}

                      </div>

                    </div>

                  </div>

                  {/* COVERAGE BUTTON */}

                  <div className="text-right mt-8 pr-[11%]">

                    <Link
                      to="/ev-news"
                      className="hover:underline"
                    >
                      See Full Coverage →
                    </Link>

                  </div>

                  <div className="space-y-16 mt-12">
                    {newsChunks.map((chunk, blockIndex) => (

                      <div key={blockIndex}>
                        <div className="space-y-8">

                          {chunk.slice(0, 5).map((article, index) => (

                            <Link
                              key={index}
                              to={`/news/${article._id}`}
                              state={{
                                article,
                                relatedArticles: combinedNews,
                              }}
                              className="
         flex
  flex-col
  md:flex-row
  justify-between
  gap-6
        border-b
        border-gray-300
        pb-8
      "
                            >

                              <div>

                                <h3 className="text-2xl hover:underline">

                                  {article.title}

                                </h3>

                                <p className="text-gray-500 mt-3">

                                  {(article.description || "").slice(0, 140)}...

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
  md:w-44
  h-48
  md:h-28
          object-cover
          rounded-xl
        "
                              />

                            </Link>

                          ))}

                        </div>
                        {chunk[5] && (

                          <Link
                            to={`/news/${chunk[5]?._id}`}
                            state={{
                              article: chunk[5],
                              relatedArticles: combinedNews,
                            }}
                            className="block mt-12"
                          >

                            <img
                              src={
                                chunk[5].imageUrl ||
                                chunk[5].urlToImage
                              }
                              alt=""
                              className="
        w-full
  h-[220px]
  md:h-[420px]
        object-cover
        rounded-xl
      "
                            />

                            <h2
                              className="
        text-4xl
        font-semibold
        mt-5
        hover:underline
      "
                            >

                              {chunk[5].title}

                            </h2>

                            <p className="text-gray-600 mt-3">

                              {(chunk[5].description || "").slice(0, 180)}...

                            </p>

                          </Link>

                        )}

                      </div>

                    ))}

                  </div>

                </div>

                {/* RIGHT SIDE AD */}

                <div className="lg:col-span-4">

                  <h3
                    className="
          text-center
          text-sm
          text-gray-500
          mb-3
        "
                  >
                    Advertisement
                  </h3>

                  <div
                    className="
          border
          rounded-xl
          h-[360px]
          flex
          items-center
          justify-center
          bg-white
          sticky
          top-24
        "
                  >
                    <img src="/ev_img.webp"/>
                  </div>

                </div>

              </div>

            </div>




            {/* LOAD MORE */}

            <div className="flex justify-center mt-10">

              {

                visibleCount < combinedNews.length && (

                  <button

                    onClick={() =>

                      setVisibleCount(

                        (prev) => prev + 6

                      )

                    }

                    className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition duration-300 font-medium tracking-wide"

                  >

                    Load More

                  </button>

                )

              }

            </div>

          </div>






          {/* SIDEBAR */}




        </div>

      </div>


      <Footer />

    </>

  );

}

export default Home;



