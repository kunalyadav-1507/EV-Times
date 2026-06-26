import { Link }
from "react-router-dom";

import {

  FaRegBookmark, FaBookmark, FaShareAlt

}

from "react-icons/fa";

import { toast } from "react-hot-toast"


function NewsCard({

  article,

  handleSave,

  isSaved, 

  relatedArticles

}) {
const handleShare = async () => {

  const shareData = {

    title: article.title,

    text:

      article.description ||

      article.title,

    url:

      article.url ||

      article.articleUrl ||

      window.location.href,

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

  return (

    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 flex flex-col"
    >

      <img
        src={
          article.imageUrl ||

          article.urlToImage
        }
        alt="news"
        className="w-full h-56 object-cover hover:scale-105 transition duration-300"
      />


      <div
        className="p-5 flex flex-col flex-grow"
      >
        <p className="text-sm text-gray-500 mb-2">

  {

    new Date(

      article.publishedAt ||

      article.createdAt ||

      new Date()

    ).toLocaleDateString()

  }

</p>

        <h2
          className="text-xl font-bold text-gray-900 mb-3"
        >

          {article.title}

        </h2>


        <p
          className="text-gray-600 leading-relaxed"
        >

          {

            article.content ||

            article.description

          }

        </p>


        <div
          className="mt-auto flex justify-between items-center pt-5"
        >

          

          <Link

  to="/news-details"

  state={{

    article,

    relatedArticles

  }}

    onClick={() =>

    window.scrollTo(0, 0)

  }

  className="text-blue-600 font-semibold hover:underline"

>

  Read More →

</Link>


  {/* SHARE */}
<div className="flex items-center gap-4">
  <button

    onClick={handleShare}

    className="

      text-gray-500

      hover:text-black

      transition

      text-lg

    "

  >

    <FaShareAlt />

  </button>

<button

  onClick={() =>
    handleSave(article)
  }

  className={`

    text-xl transition

    ${

      isSaved

        ?

        "text-black"

        :

        "text-gray-500 hover:text-black"

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

      </div>

    </div>

  );

}


export default NewsCard;