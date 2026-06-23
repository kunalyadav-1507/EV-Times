import { Link }
from "react-router-dom";
import { FaRegBookmark }
from "react-icons/fa";


function MediumNewsCard({

  article,

  handleSave

}) {

  return (

    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex h-56"
    >

      {/* IMAGE */}

      <img
        src={
          article.imageUrl ||

          article.urlToImage
        }

        alt="news"

        className="w-48 h-48 object-cover"
      />


      {/* CONTENT */}

      <div
        className="p-5 flex flex-col flex-grow"
      >
        <p className="text-xs text-gray-400 mt-2">

  {

    new Date(

      article.publishedAt ||

      article.createdAt ||

      Date.now()

    ).toLocaleDateString()

  }

</p>

        <h2
  className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
>
          {article.title}

        </h2>


        <p
  className="text-gray-600 text-sm leading-relaxed line-clamp-3"
>
          {

            article.content ||

            article.description

          }

        </p>


        <div
          className="mt-auto flex justify-between items-center pt-4"
        >

          <Link
            to="/news-details"
            state={{ article }}
            className="text-blue-600 font-semibold hover:underline"
          >

            Read More →

          </Link>


          <button

  onClick={() =>
    handleSave(article)
  }

  className="text-gray-700 hover:text-black transition text-xl"

>

  <FaRegBookmark />

</button>
        </div>

      </div>

    </div>

  );

}


export default MediumNewsCard;