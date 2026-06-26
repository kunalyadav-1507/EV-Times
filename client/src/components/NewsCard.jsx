import { Link } from "react-router-dom";
import { FaBookmark, FaShareAlt, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

function SavedNewsCard({

  article,

  handleSave

}) {

  const handleShare = async () => {

    const shareData = {

      title: article.title,

      text:

        article.description ||

        article.title,

      url:

        `${window.location.origin}/news/${article._id}`

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

      className="

        bg-white

        rounded-3xl

        overflow-hidden

        shadow-md

        hover:shadow-2xl

        transition-all

        duration-300

        border

        border-gray-200

        group

      "

    >

      <div

        className="

          flex

          flex-col

          lg:flex-row

        "

      >

        {/* IMAGE */}

        <div

          className="

            lg:w-[340px]

            w-full

            h-[220px]

            sm:h-[260px]

            lg:h-auto

            overflow-hidden

            flex-shrink-0

          "

        >

          <img

            src={

              article.imageUrl ||

              article.urlToImage ||

              "https://placehold.co/600x400"

            }

            alt={article.title}

            className="

              w-full

              h-full

              object-cover

              group-hover:scale-105

              transition-transform

              duration-500

            "

          />

        </div>

        {/* CONTENT */}

        <div

          className="

            flex

            flex-col

            flex-1

            p-6

            sm:p-8

          "

        >

          {/* CATEGORY */}

          <span

            className="

              inline-flex

              w-fit

              px-3

              py-1

              rounded-full

              bg-blue-100

              text-blue-700

              text-xs

              font-semibold

              uppercase

              tracking-wide

              mb-4

            "

          >

            {article.category}

          </span>

          {/* TITLE */}

          <h2

            className="

              text-2xl

              font-bold

              text-gray-900

              leading-tight

              group-hover:text-blue-600

              transition

            "

          >

            {article.title}

          </h2>

          {/* DATE */}

          <p

            className="

              text-sm

              text-gray-500

              mt-3

            "

          >

            {

              new Date(

                article.publishedAt ||

                article.createdAt ||

                new Date()

              ).toLocaleDateString()

            }

          </p>

          {/* DESCRIPTION */}

          <p

            className="

              text-gray-600

              leading-8

              mt-5

              line-clamp-4

            "

          >

            {

              article.description ||

              article.summary ||

              article.content

            }

          </p>

          {/* BUTTONS */}

          <div

            className="

              mt-auto

              pt-8

              flex

              flex-wrap

              gap-4

              items-center

            "

          >

            <Link

              to={`/news/${article.articleId}`}

              className="

                inline-flex

                items-center

                gap-2

                bg-black

                text-white

                px-6

                py-3

                rounded-full

                font-medium

                hover:bg-blue-600

                transition

              "

            >

              Read More

              <FaArrowRight />

            </Link>

            <button

              onClick={handleShare}

              className="

                w-12

                h-12

                rounded-full

                border

                border-gray-300

                flex

                items-center

                justify-center

                hover:bg-gray-100

                transition

              "

            >

              <FaShareAlt />

            </button>

            <button

              onClick={() =>

                handleSave(article)

              }

              className="

                inline-flex

                items-center

                gap-2

                px-5

                py-3

                rounded-full

                bg-red-50

                text-red-600

                hover:bg-red-100

                transition

                font-medium

              "

            >

              <FaBookmark />

              Remove

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SavedNewsCard;


