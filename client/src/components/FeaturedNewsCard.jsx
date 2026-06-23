import { Link }
from "react-router-dom";

function FeaturedNewsCard({

  article

}) {

  return (

    <div
      className="relative rounded-3xl overflow-hidden shadow-xl h-[500px] group"
    >

      {/* IMAGE */}

      <img
        src={
          article.imageUrl ||

          article.urlToImage
        }

        alt="news"

        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />


      {/* DARK OVERLAY */}

      <div
        className="absolute inset-0 bg-black/40"
      ></div>


      {/* CONTENT */}

      <div
        className="absolute bottom-0 left-0 p-8 text-white"
      >

        <p
          className="uppercase tracking-widest text-sm mb-3 text-green-300"
        >

          Featured Story

        </p>


        <h1
          className="text-4xl font-bold leading-tight mb-4 max-w-3xl"
        >

          {article.title}

        </h1>
        


        <p
          className="text-gray-200 max-w-2xl mb-6"
        >

          {

            article.content ||

            article.description

          }

        </p>


        <Link
          to="/news-details"
          state={{ article }}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >

          Read Full Story

        </Link>

  


      </div>

    </div>

  );

}


export default FeaturedNewsCard;