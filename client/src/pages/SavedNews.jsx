import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import SkeletonCard from "../components/SkeletonCard";

import {
  getSavedArticles,
  removeSavedArticle
} from "../services/savedNewsService";

import toast from "react-hot-toast";

function SavedNews() {

  const [articles, setArticles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchSavedNews =
      async () => {

        try {

          const response =
            await getSavedArticles();

          setArticles(
            response.data
          );

        }

        catch (error) {

          console.log(error);

        }

        finally {

          setLoading(false);

        }

      };

    fetchSavedNews();

  }, []);

  const handleSave =
    async (article) => {

      try {

        await removeSavedArticle(

          article._id

        );

        setArticles(

          prev =>

            prev.filter(

              item =>

                item._id !== article._id

            )

        );

        toast.success(

          "Article Removed"

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  if (loading) {
  return (
    <SkeletonCard
      type="saved"
    />
  );
}

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-[#f5f5f5]">

        {/* HERO */}

        <div className="bg-gradient-to-r from-black to-gray-900 text-white">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">

            <h1
              className="
                text-4xl
                md:text-5xl
                font-extrabold
                mb-4
              "
            >

              Saved Articles

            </h1>

            <p
              className="
                text-gray-300
                text-lg
                max-w-2xl
              "
            >

              Keep all your favourite EV news,
              battery technology stories and
              industry updates in one place.

            </p>

            <div
              className="
                mt-8
                inline-flex
                items-center
                bg-white/10
                backdrop-blur
                px-6
                py-3
                rounded-full
                text-lg
                font-semibold
              "
            >

              {articles.length}

              &nbsp;

              {articles.length === 1

                ? "Saved Article"

                : "Saved Articles"}

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-10
            py-12
          "
        >

          {

            articles.length === 0 ?

              (

                <div
                  className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    py-24
                    px-8
                    text-center
                  "
                >

                  <div
                    className="
                      text-7xl
                      mb-6
                    "
                  >

                    🔖

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-gray-900
                      mb-4
                    "
                  >

                    No Saved Articles

                  </h2>

                  <p
                    className="
                      text-gray-500
                      max-w-lg
                      mx-auto
                      leading-8
                    "
                  >

                    Start saving articles while
                    browsing EV Times.
                    Your bookmarked stories will
                    appear here for quick access.

                  </p>

                </div>

              )

              :

              (

                <div
                  className="
                    flex
                    flex-col
                    gap-10
                  "
                >

                  {

                    articles.map(

                      (article) => (

                        <NewsCard

                          key={article._id}

                          article={article}

                          handleSave={handleSave}

                        />

                      )

                    )

                  }

                </div>

              )

          }

        </div>

      </div>

    </>

  );

}

export default SavedNews;








