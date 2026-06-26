import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getSavedArticles, removeSavedArticle } from "../services/savedNewsService";
import NewsCard from "../components/NewsCard";

import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard";


function SavedNews() {

  const [articles, setArticles]
    = useState([]);

  const [loading, setLoading]
    = useState(true);


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


  if (loading) {
  return (
    <SkeletonCard
      type="saved"
    />
  );
}


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

      toast.success("Article Removed");

    }

    catch (error) {

      console.log(error);

    }

};

  return (

  <>

    <Navbar />

    <div className="bg-gray-100 min-h-screen px-8 py-8">

      <div className="max-w-7xl mx-auto">


        {/* PAGE TITLE */}

        <h1 className="text-5xl font-bold text-gray-900 mb-10">

          Saved Articles

        </h1>


        {/* NEWS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            articles.map((article, index) => (

              <NewsCard

                key={index}

                article={article}

                handleSave={handleSave}

                isSaved= {true}

              />

            ))

          }

        </div>

      </div>

    </div>

  </>

);

}


export default SavedNews;