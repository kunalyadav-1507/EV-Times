import { useEffect, useState } from "react";

import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  fetchNewsById,
  incrementViews
} from "../services/newsService";

import { FaBookmark, FaRegBookmark, FaShareAlt } from "react-icons/fa";

import { saveArticle, getSavedArticles, removeSavedArticle } from "../services/savedNewsService";

import { toast }

  from "react-hot-toast";


  import Footer from "../components/Footer";
  import SkeletonCard from "../components/SkeletonCard";


function NewsDetails() {

  const { id } = useParams();

const [article, setArticle] =
  useState(null);

const [
  relatedArticles,
  setRelatedArticles
] = useState([]);

const [
  loading,
  setLoading
] = useState(true);

const [
  isSaved,
  setIsSaved
] = useState(false);

const navigate =
  useNavigate();


  useEffect(() => {

  const loadArticle =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetchNewsById(id);

        setArticle(
          response.data.article
        );

        setRelatedArticles(
          response.data.relatedArticles
        );
        await incrementViews(id);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  loadArticle();

}, [id]);


  // CHECK SAVED STATUS

  useEffect(() => {

    const checkSaved =
      async () => {

        try {

          const response =
            await getSavedArticles();


          const alreadySaved =

            response.data.some(

              (saved) =>

                (

                  saved?.articleUrl ||

                  saved?.url

                )

                ===

                (

                  article?.url ||

                  article?.articleUrl

                )

            );


          setIsSaved(

            alreadySaved

          );

        }

        catch (error) {

          console.log(error);

        }

      };


    if (article) {

      checkSaved();

    }

  }, [article]);


  // SAVE / UNSAVE

  const handleSave =
    async () => {

      try {

        const response =
          await getSavedArticles();


        const existingArticle =

          response.data.find(

            (saved) =>

              (

                saved?.articleUrl ||

                saved?.url

              )

              ===

              (

                article.url ||

                article.articleUrl

              )

          );


        // REMOVE

        if (existingArticle) {

          await removeSavedArticle(

            existingArticle._id

          );


          setIsSaved(false);

        }


        // SAVE

        else {

          await saveArticle({

            title:
              article.title,

            description:

              article.description ||

              article.content ||

              article.summary,

            imageUrl:

              article.imageUrl ||

              article.urlToImage,

            articleUrl:

              article.url ||

              article.articleUrl

          });


          setIsSaved(true);

        }

      }

      catch (error) {

        console.log(error);

      }

    };

  const handleShare = async () => {

    const shareData = {

      title: article.title,

      text:

        article.description ||

        article.title,

      url: window.location.href,
    };

    try {

      if (navigator.share) {

        await navigator.share(

          shareData

        );

      }

      else {

        await navigator.clipboard.writeText(

          shareData.url

        );

        toast.success(

          "Link copied!"

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
      type="details"
    />
  );
}

if (!article) {

  return <h2>No Article Found</h2>;

}


  return (

    <>

      <Navbar />


      <div className="bg-[#f5f5f5] min-h-screen">


        {/* HERO SECTION */}

        <div
  className="
    relative
    h-[75vh]
    md:h-[75vh]
    lg:h-[90vh]
    w-full
    overflow-hidden
  "
>


          {/* HERO IMAGE */}

          <img

            src={

              article.imageUrl ||

              article.urlToImage

            }

            alt="news"

            className="w-full h-full object-cover"

          />


          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>


          {/* HERO CONTENT */}

          <div
  className="
    absolute
    bottom-0
    left-0
    w-full
    px-4
    md:px-14
    pb-6
    md:pb-14
    text-white
  "
>


            {/* TOP ROW */}

            <div className="flex items-center justify-between mb-6">


              <div className="flex items-center gap-4">

                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm tracking-wide border border-white/20">

                  EV TIMES

                </span>


                <p className="text-sm text-gray-200">

                  5 min read

                </p>

              </div>


              {/* BOOKMARK */}

              <div className="flex items-center gap-6">

                {/* SHARE */}

                <button

                  onClick={handleShare}

                  className="

      text-2xl md:text-3xl

      text-gray-300

      hover:text-white

      transition

    "

                >

                  <FaShareAlt />

                </button>

                {/* SAVE */}

                <button

                  onClick={handleSave}

                  className={`

      text-2xl md:text-3xl transition

      ${isSaved

                      ?

                      "text-white"

                      :

                      "text-gray-300 hover:text-white"

                    }

    `}

                >

                  {

                    isSaved

                      ?

                      <FaBookmark />

                      :

                      <FaRegBookmark />

                  }

                </button>

              </div>

            </div>


            {/* DATE */}

            <p className="text-sm text-gray-300 mb-4">

              {

                new Date(

                  article.publishedAt ||

                  article.createdAt ||

                  new Date()

                ).toLocaleDateString()

              }

            </p>


            {/* TITLE */}

            <div className=" flex
    flex-wrap
    items-center
    gap-2
    text-sm text-gray-300 mb-6">

              <span
                className="cursor-pointer hover:text-white"
                onClick={() => navigate("/")}
              >
                Home
              </span>

              <span>›</span>

              <span>

                News

              </span>

              <span>›</span>

              <span className="text-white truncate">

                {article.title}

              </span>

            </div>

            <h1
  className="
    text-2xl
    md:text-5xl
    lg:text-7xl
    font-bold
    leading-tight
    max-w-5xl
  "
>

              {article.title}

            </h1>


            {/* DESCRIPTION */}

            <p className="text-base md:text-xl lg:text-2xl text-gray-200 mt-6 max-w-4xl leading-relaxed">

              {

                article.description ||

                article.content ||

                article.summary

              }

            </p>

          </div>

        </div>


        {/* ARTICLE CONTENT */}

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* MAIN ARTICLE */}

            <div className="lg:col-span-8">

              <div className="w-24 h-[2px] bg-black mb-14"></div>

              <div className="flex items-center gap-4 mb-10">

                <img
                  src="https://ui-avatars.com/api/?name=EV+Times"
                  alt="author"
                  className="w-14 h-14 rounded-full"
                />

                <div>

                  <p className="font-semibold">

                    EV Times Editorial

                  </p>

                  <p className="text-gray-500 text-sm">

                    Published on{" "}

                    {

                      new Date(

                        article.publishedAt ||

                        article.createdAt ||

                        new Date()

                      ).toLocaleDateString()

                    }

                  </p>

                </div>

              </div>

              <div className="
  text-base
  md:text-[21px]
  text-gray-800
  leading-8
  md:leading-[2.1]
  space-y-10
  text-justify
">

                <p className="first-letter:text-5xl
md:first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-none">

                  {
                    (
                      article.content ||
                      article.description ||
                      "No additional content available."
                    )
                      .split("\n\n")
                      .filter(Boolean)
                      .map((paragraph, index) => (

                        <div key={index}>

                          <p
                            className={
                              index === 0
                                ? `
                first-letter:text-7xl
                first-letter:font-bold
                first-letter:mr-3
                first-letter:float-left
                first-letter:leading-none
                text-justify
              `
                                : "text-justify"
                            }
                          >
                            {paragraph}
                          </p>

                          {/* Ad After 3rd Paragraph */}

                          {
                            index === 2 && (

                              <div className="my-12">

                                <p
                                  className="
                  text-center
                  text-sm
                  text-gray-500
                  mb-2
                "
                                >
                                  Advertisement
                                </p>

                                <div
                                  className="
                  border
                  border-gray-200
                  rounded-xl
                  h-40
                  flex
                  items-center
                  justify-center
                  bg-gray-50
                "
                                >
                                  Google AdSense Slot
                                </div>

                              </div>

                            )
                          }

                          {/* Ad After 6th Paragraph */}

                          {
                            index === 5 && (

                              <div className="my-12">

                                <p
                                  className="
                  text-center
                  text-sm
                  text-gray-500
                  mb-2
                "
                                >
                                  Advertisement
                                </p>

                                <div
                                  className="
                  border
                  border-gray-200
                  rounded-xl
                  h-40
                  flex
                  items-center
                  justify-center
                  bg-gray-50
                "
                                >
                                  Google AdSense Slot
                                </div>

                              </div>

                            )
                          }

                        </div>

                      ))
                  }

                </p>

                <p>

                  Electric vehicle technology is rapidly evolving worldwide as manufacturers compete to deliver smarter, cleaner, and more efficient mobility solutions.

                </p>

                <p>

                  With growing investment in battery technology, charging infrastructure, and AI-powered mobility systems, the EV ecosystem continues to expand across global markets.

                </p>

                {/* AD SLOT 1 */}

                <div className="my-12">

                  <p className="text-center text-sm text-gray-500 mb-2">

                    Advertisement

                  </p>

                  <div className="border border-gray-200 rounded-xl h-40 flex items-center justify-center bg-gray-50">

                    Google AdSense Slot

                  </div>

                </div>

                <p>

                  Global EV adoption continues to rise as governments introduce stricter environmental regulations.

                </p>

                <p>

                  Automotive manufacturers are focusing heavily on innovation, software integration, and autonomous capabilities.

                </p>

                {/* AD SLOT 2 */}

                <div className="my-12">

                  <p className="text-center text-sm text-gray-500 mb-2">

                    Advertisement

                  </p>

                  <div className="border border-gray-200 rounded-xl h-40 flex items-center justify-center bg-gray-50">

                    Google AdSense Slot

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDEBAR */}

            <div className="lg:col-span-4">

              <div className="lg:sticky lg:top-32">

                <h3 className="text-2xl font-bold mb-6">

                  Most Popular

                </h3>

                {

                  [...relatedArticles]

                    .sort(() => Math.random() - 0.5)

                    .slice(0, 5)

                    .map((item, index) => (

                      <Link

  key={index}

  to={`/news/${item._id}`}

  className="block mb-6 group"
>

                        <div className="flex gap-4">

                          <img

                            src={

                              item.imageUrl ||

                              item.urlToImage

                            }

                            alt="news"

                            className="w-28 h-20 object-cover rounded-xl "

                          />

                          <p className="font-medium line-clamp-3 group-hover:underline">

                            {item.title}

                          </p>

                        </div>

                      </Link>

                    ))

                }

              </div>

            </div>

          </div>

          <div className="mt-16 border-t pt-8">

            <p className="text-sm text-gray-500 mb-2">

              Source Article

            </p>

            <a

              href={

                article.url ||

                article.articleUrl

              }

              target="_blank"

              rel="noreferrer"

              className="

      text-lg

      font-semibold

      hover:underline

    "

            >

              Read Full Story →

            </a>

          </div>



          {/* RELATED STORIES */}

          <div className="mt-24">

            <h2 className="text-3xl md:text-5xl font-light text-gray-600 mb-12">

              Related Stories
              <span className="text-cyan-500 ml-2">

                •

              </span>

            </h2>

            {

              relatedArticles

                .filter(item => {

                  if (

                    item.title === article.title

                  ) return false;

                  const currentWords =

                    article.title

                      ?.toLowerCase()

                      .split(" ");

                  return currentWords.some(

                    word =>

                      word.length > 3 &&

                      item.title

                        ?.toLowerCase()

                        .includes(word)

                  );

                })

                .slice(0, 6)

                .map((item, index) => (

                  <Link

  key={index}

  to={`/news/${item._id}`}

  onClick={() =>

    window.scrollTo({

      top:0,

      behavior:"smooth"

    })

  }

  className="block border-b py-8 group"
>

                    <div className="grid md:grid-cols-12 gap-6 items-center">

                      <div className="md:col-span-8">

                        <p className="text-sm text-gray-500 mb-2">

                          EV TIMES

                        </p>

                        <h3 className="text-2xl font-bold mb-3 group-hover:underline ">

                          {item.title}

                        </h3>

                        <p className="text-gray-600 line-clamp-3">

                          {

                            item.description ||

                            item.content

                          }

                        </p>

                      </div>

                      <div className="md:col-span-4">

                        <img

                          src={

                            item.imageUrl ||

                            item.urlToImage

                          }

                          alt="news"

                          className="w-full h-44 object-cover rounded-xl"

                        />

                      </div>

                    </div>

                  </Link>

                ))

            }

          </div>

        </div>



        <div
  className="
    max-w-7xl
    mx-auto
    mt-24
    px-4
    md:px-6
  "
>

          <h2 className="text-3xl md:text-5xl font-light text-gray-600 mb-12">

            MORE FROM NEWS

            <span className="text-cyan-500 ml-2">

              •

            </span>

          </h2>

          <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-x-8
    gap-y-8
  "
>

            {

              [...relatedArticles]

                .filter(

                  item =>

                    item.title !== article.title

                )

                .sort(

                  () => Math.random() - 0.5

                )

                .slice(0, 6)

                .map((item, index) => (

                  <Link

  key={index}

  to={`/news/${item._id}`}

  onClick={() =>

    window.scrollTo({

      top:0,

      behavior:"smooth"

    })

  }

>

                    <div
  className="
    flex
    flex-col
    md:flex-row
    gap-6
    items-center
  "
>

                      {/* TEXT */}

                     <div className="flex-1">
  <h3
    className="
      text-lg
      md:text-xl
      leading-tight
      font-normal
      group-hover:underline
    "
  >
    {item.title}
  </h3>
</div>

                      {/* IMAGE */}

                      <div
  className="
    w-full
    md:w-48
    flex-shrink-0
  "
>
  <img
    src={
      item.imageUrl ||
      item.urlToImage
    }
    alt="news"
    className="
      w-full
      h-40
      md:h-32
      object-cover
      rounded-2xl
    "
  />
</div>

                    </div>

                  </Link>

                ))

            }

          </div>

        </div>


      </div>
      <Footer/>

    </>

  );

}

export default NewsDetails;






