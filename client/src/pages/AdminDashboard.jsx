import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {

  getPendingNews,

  approveNews,

  deleteNews,

  getAllExternalNews,

  markFeatured,

  markEditorPick,

  deleteExternalNews


}

  from "../services/adminService";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

import {
  FaHome,
  FaStar,
  FaUserEdit,
  FaClock,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

function AdminDashboard() {

  const [news, setNews] = useState([]);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [
    externalNews,
    setExternalNews
  ] = useState([]);

  const [filter, setFilter] =
    useState("all");

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalArticles, setTotalArticles] =
    useState(0);

  const [totalNewsCount, setTotalNewsCount] =
    useState(0);

  const [featuredCount, setFeaturedCount] =
    useState(0);

  const [editorPickCount, setEditorPickCount] =
    useState(0);

  const [articlesPerPage, setArticlesPerPage] =
    useState(50);

  const [pendingAI, setPendingAI] =
    useState([]);

  const [showPendingMenu,
    setShowPendingMenu] =
    useState(false);

  const [
    selectedAIArticle,
    setSelectedAIArticle
  ] = useState(null);

  const [
    selectedPendingNews,
    setSelectedPendingNews
  ] = useState(null);

  const [showPendingBottom, setShowPendingBottom] =
  useState(false);
  // FETCH PENDING NEWS
  const fetchPendingNews = async () => {

    try {

      const response =
        await getPendingNews();

      setNews(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchExternalNews =
    async () => {

      try {

        const response =
          await getAllExternalNews(
            currentPage,
            articlesPerPage,
            selectedFilter
          );

        setExternalNews(
          response.data.articles
        );

        setTotalArticles(
          response.data.totalArticles
        );
        setTotalNewsCount(
          response.data.totalNewsCount
        );
        setTotalPages(
          response.data.totalPages
        );

        setFeaturedCount(
          response.data.featuredCount
        );

        setEditorPickCount(
          response.data.editorPickCount
        );

      }

      catch (error) {

        console.log(error);

      }

    };


  useEffect(() => {

    fetchPendingNews();
    fetchPendingAI();


  }, []);

  useEffect(() => {

    fetchExternalNews();

  }, [
    currentPage,
    articlesPerPage,
    selectedFilter
  ]);


  // APPROVE NEWS
  const handleApprove = async (id) => {

    try {

      await approveNews(id);

      toast.success(
        "News Approved"
      );

      fetchPendingNews();

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE NEWS
  const handleDelete = async (id) => {

    try {

      await deleteNews(id);

      toast.success(
        "News Deleted"
      );

      fetchPendingNews();

    } catch (error) {

      console.log(error);

    }

  };


  const handleFeature =
    async (id) => {

      try {

        await markFeatured(id);

        fetchExternalNews();

        toast.success(
          "Featured Updated"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const handleEditorPick =
    async (id) => {

      try {

        await markEditorPick(id);

        fetchExternalNews();

        toast.success(
          "Editor Pick Updated"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const handleDeleteExternal =
    async (id) => {

      try {

        await deleteExternalNews(id);

        fetchExternalNews();

        toast.success(
          "External News Deleted"
        );

      }

      catch (error) {

        console.log(error);
        toast.error(
          "Something went wrong")
      }

    };
  const filteredNews =
    externalNews.filter(
      (article) => {

        return (

          article.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          article.category
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )

        );

      }
    );

  const fetchPendingAI =
    async () => {

      try {

        const response = await fetch(
  `${API}/external-news/pending`
);

        const data =
          await response.json();

        setPendingAI(data);

      }

      catch (error) {

        console.log(error);

      }

    };

  const handleApproveAI =
    async (id) => {

      try {

        const response =
          await fetch(

            `${API}/external-news/approve/${id}`,

            {
              method: "POST"
            }

          );

        const data =
          await response.json();

        toast.success(
          "AI News Approved"
        );

        setSelectedAIArticle(
          null
        );

        fetchPendingAI();

        fetchExternalNews();

      }

      catch (error) {

        console.log(error);

        toast.error(
          "Approval Failed"
        );

      }

    };

  const handleRejectAI =
    async (id) => {

      try {

        const response =
          await fetch(

            `${API}/external-news/reject/${id}`,

            {
              method: "POST"
            }

          );

        const data =
          await response.json();

        toast.success(
          "AI News Rejected"
        );

        setSelectedAIArticle(
          null
        );

        fetchPendingAI();

      }

      catch (error) {

        console.log(error);

        toast.error(
          "Reject Failed"
        );

      }

    };
  const firstIndex =
    (currentPage - 1) *
    articlesPerPage;

  const lastIndex =
    firstIndex +
    externalNews.length;




  return (

    <>

      <Navbar />

      <div className="flex bg-gray-100 min-h-screen">

        {/* Sidebar */}

        <div
          className="
          hidden
    lg:block
    w-72
    bg-gradient-to-b
    from-zinc-950
    to-emerald-950
    text-white
    p-6
    min-h-screen
    border-r
    border-emerald-900/50
    fixed
    top-35
  "
        >

          {/* Logo */}

          <div className="mb-12">

            <div className="flex items-center gap-3">

              <div
                className="
          w-12
          h-12
          rounded-xl
          bg-gradient-to-br
          from-emerald-400
          to-green-600
          flex
          items-center
          justify-center
          text-2xl
        "
              >
                ⚡
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  EV News
                </h2>

                <p className="text-sm text-zinc-400">
                  Admin Control Center
                </p>

              </div>

            </div>

          </div>


          {/* Navigation */}

          <div className="space-y-3">

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all

        ${activeTab === "dashboard"
                  ? "bg-white/10 border border-white/10"
                  : "hover:bg-white/5"
                }
      `}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>




            <div
              onMouseEnter={() =>
                setShowPendingMenu(true)
              }
              onMouseLeave={() =>
                setShowPendingMenu(false)
              }
            >

              <button
                onClick={() =>
                  setShowPendingMenu(
                    !showPendingMenu
                  )
                }
                className="
      w-full
      flex
      items-center
      justify-between
      px-4
      py-3
      rounded-xl
      transition-all
      hover:bg-white/5
    "
              >

                <div className="flex items-center gap-3">

                  <span>⏳</span>

                  <span>Pending News</span>

                </div>

                <span
                  className={`
    transition-transform
    duration-300
    text-lg
    ${showPendingMenu ? "rotate-180" : ""}
  `}
                >
                  ▾
                </span>

              </button>

              {

                showPendingMenu && (

                  <div
                    className="
          ml-10
          mt-2
          flex
          flex-col
          gap-2
        "
                  >

                    <button
                      onClick={() =>
                        setActiveTab("pending")
                      }
                      className="
  text-left
  text-base
  font-medium
  text-gray-300
  hover:text-white
  border-l-2
  border-transparent
  hover:border-emerald-400
  pl-3
  transition-all
"
                    >
                      Pending Reviews
                    </button>

                    <button
                      onClick={() =>
                        setActiveTab("pendingAI")
                      }
                      className="
  text-left
  text-base
  font-medium
  text-gray-300
  hover:text-white
  border-l-2
  border-transparent
  hover:border-emerald-400
  pl-3
  transition-all
"
                    >
                      Pending AI News
                    </button>

                  </div>

                )

              }

            </div>


            <button
              onClick={() => {
                setActiveTab("external");
                setFilter("all");
                setSelectedFilter("all");
                setCurrentPage(1);
              }}
              className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all

        ${activeTab === "external" &&
                  filter === "all"
                  ? "bg-white/10 border border-white/10"
                  : "hover:bg-white/5"
                }
      `}
            >
              <span>📰</span>
              <span>External News</span>
            </button>


            <button
              onClick={() => {
                setActiveTab("external");
                setFilter("featured");
                setSelectedFilter("featured");
                setCurrentPage(1);
              }}
              className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all

        ${activeTab === "external" &&
                  filter === "featured"
                  ? "bg-white/10 border border-white/10"
                  : "hover:bg-white/5"
                }
      `}
            >
              <span>⭐</span>
              <span>Featured News</span>
            </button>


            <button
              onClick={() => {
                setActiveTab("external");
                setFilter("editor");
                setSelectedFilter("editor");
                setCurrentPage(1);
              }}
              className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all

        ${activeTab === "external" &&
                  filter === "editor"
                  ? "bg-white/10 border border-white/10"
                  : "hover:bg-white/5"
                }
      `}
            >
              <span>✍️</span>
              <span>Editor Picks</span>
            </button>

          </div>


          {/* Divider */}

          <div className="my-8 border-t border-white/10"></div>


          {/* Quick Stats */}

          <div className="space-y-4">

            <div className="
      bg-white/5
      rounded-xl
      p-4
    ">
              <p className="text-zinc-400 text-sm">
                Total Articles
              </p>

              <p className="text-2xl font-bold">
                {totalNewsCount}
              </p>
            </div>

            <div className="
      bg-white/5
      rounded-xl
      p-4
    ">
              <p className="text-zinc-400 text-sm">
                Featured
              </p>

              <p className="text-2xl font-bold">
                {featuredCount}
              </p>
            </div>

          </div>


          {/* Admin Card */}

          <div className="mt-10">

            <div
              className="
        bg-white/5
        rounded-xl
        p-4
      "
            >

              <p className="font-semibold">
                Administrator
              </p>

              <p className="text-sm text-zinc-400">
                EV News Platform
              </p>

            </div>

          </div>

        </div>

        {/* Main Content */}

        <div
  className="
    flex-1
    p-4
    md:p-6
    lg:p-8
    ml-0
    lg:ml-70
    pb-24
    lg:pb-8
  "
>

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-900">

              Welcome Admin 👦🏼

            </h1>

            <p className="text-gray-500 mt-2">

              Manage news articles, featured stories,
              editor picks and content moderation.

            </p>

          </div>


          {
            activeTab === "dashboard" && (

              <div>

                <h2 className="text-2xl font-bold mb-6">
                  Dashboard Overview
                </h2>

                <div
  className="
    grid
    grid-cols-2
    md:grid-cols-4
    gap-4
    lg:gap-6
  "
>

                  <div className="bg-white p-6 rounded-xl shadow">

                    <p className="text-gray-500">
                      Total News
                    </p>

                    <h3 className="text-4xl font-bold">
                      {totalNewsCount}
                    </h3>

                  </div>

                  <div className="bg-white p-6 rounded-xl shadow">

                    <p className="text-gray-500">
                      Featured News
                    </p>

                    <h3 className="text-4xl font-bold">
                      {featuredCount}
                    </h3>

                  </div>

                  <div className="bg-white p-6 rounded-xl shadow">

                    <p className="text-gray-500">
                      Editor Picks
                    </p>

                    <h3 className="text-4xl font-bold">
                      {editorPickCount}
                    </h3>

                  </div>

                </div>
                {/* Latest News + Pending Reviews */}

                <div
  className="
    flex
    flex-col
    gap-6
    mt-10
    md:grid
    md:grid-cols-2
  "
>

                  {/* Latest News */}

                  <div
                    className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-gray-100
      p-6
    "
                  >

                    <div className="flex items-center justify-between mb-8">

                      <div className="flex items-center gap-3">

                        <div
                          className="
            w-10
            h-10
            rounded-xl
            bg-emerald-100
            flex
            items-center
            justify-center
            text-xl
          "
                        >
                          📰
                        </div>

                        <div>

                          <h2 className="text-xl font-bold">
                            Latest News
                          </h2>

                          <p className="text-sm text-gray-500">
                            Recently published articles
                          </p>

                        </div>

                      </div>

                      <button
                       onClick={() => {
  setActiveTab("external");
  setFilter("all");
  setSelectedFilter("all");
  setCurrentPage(1);
}}
                        className="
          px-4
          py-2
          rounded-xl
          border
          text-sm
          hover:bg-gray-50
        "
                      >
                        See All
                      </button>

                    </div>

                    <div className="space-y-4">

                      {externalNews
                        .slice(0, 4)
                        .map((article, index) => (

                          <Link
                            key={index}
                            to={`/news/${article._id}`}
                            
                            className="
  flex
  flex-col
  sm:flex-row
  justify-between
  items-start
  gap-4
  p-4
  rounded-2xl
  hover:bg-gray-50
  hover:shadow-md
  hover:-translate-y-1
  transition-all
  duration-200
"
                          >

                            <div
                              className="
                flex-1
                border-l-4
                border-emerald-500
                pl-4
              "
                            >

                              <h3
  className="
text-base
md:text-lg
font-semibold
hover:underline
line-clamp-2
md:line-clamp-3
lg:line-clamp-none
"
>
                                {article.title}
                              </h3>

                              <span
                                className="
                  inline-block
                  mt-3
                  px-3
                  py-1
                  rounded-full
                  bg-emerald-100
                  text-emerald-700
                  text-xs
                "
                              >
                                {article.category}
                              </span>

                            </div>

                            <span
                              className="
  self-start
  sm:self-auto
  px-3
  py-1
  bg-gray-100
  rounded-full
  text-xs
"
                            >
                              {
                                article.publishedAt
                                  ? new Date(
                                    article.publishedAt
                                  ).toLocaleDateString()
                                  : "Recent"
                              }
                            </span>

                          </Link>

                        ))}

                    </div>

                  </div>


                  {/* Pending Reviews */}
                  <div className="flex flex-col gap-6">
                    <div
                      className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-gray-100
      p-6
    "
                    >

                      <div className="flex items-center justify-between mb-8">

                        <div className="flex items-center gap-3">

                          <div
                            className="
            w-10
            h-10
            rounded-xl
            bg-orange-100
            flex
            items-center
            justify-center
            text-xl
          "
                          >
                            ⏳
                          </div>

                          <div>

                            <h2 className="text-xl font-bold">
                              Pending Reviews
                            </h2>

                            <p className="text-sm text-gray-500">
                              Articles waiting approval
                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() => setActiveTab("pending")}
                          className="
          px-4
          py-2
          rounded-xl
          border
          text-sm
          hover:bg-gray-50
        "
                        >
                          See All
                        </button>

                      </div>

                      <div className="space-y-4">

                        {news
                          .slice(0, 2)
                          .map((article, index) => (

                            <Link
                              key={index}
                              onClick={() =>
                                setSelectedPendingNews(article)
                              }
                              className="
  flex
  flex-col
  sm:flex-row
  justify-between
  items-start
  gap-4
  p-4
  rounded-2xl
  hover:bg-gray-50
  hover:shadow-md
  hover:-translate-y-1
  transition-all
  duration-200
"
                            >

                              {/* Left Side */}

                              <div
                                className="
      border-l-4
      border-orange-500
      pl-4
      flex-1
    "
                              >

                                <h3
  className="
    font-semibold
    text-gray-800
    leading-relaxed
    hover:underline
    line-clamp-2
    md:line-clamp-3
    lg:line-clamp-none
  "
>
                                  {article.title}
                                </h3>

                                <span
                                  className="
        inline-block
        mt-3
        px-3
        py-1
        rounded-full
        bg-orange-100
        text-orange-700
        text-xs
        font-medium
        uppercase
      "
                                >
                                  {article.category}
                                </span>

                              </div>

                              {/* Status */}

                              <span
                               className="
  self-start
  sm:self-auto
  px-3
  py-1
  bg-yellow-100
  text-yellow-700
  rounded-full
  text-xs
  font-medium
  whitespace-nowrap
"
                              >
                                Pending
                              </span>

                            </Link>

                          ))}

                      </div>

                    </div>

                    <div
                      className="
    bg-white
    rounded-3xl
    shadow-lg
    border
    border-gray-100
    p-6
  "
                    >

                      <div className="flex items-center justify-between mb-6">

                        <div>

                          <h2 className="text-xl font-bold">
                            Pending AI News
                          </h2>

                          <p className="text-sm text-gray-500">
                            AI drafts waiting approval
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            setActiveTab("pendingAI")
                          }
                          className="
    px-4
    py-2
    rounded-xl
    border
    text-sm
  "
                        >
                          See All
                        </button>

                      </div>

                      <div className="space-y-4">

                        {
                          pendingAI
                            .slice(0, 2)
                            .map((article) => (

                              <div
                                key={article._id}
                                onClick={() =>
                                   setSelectedAIArticle(article)
                                }
                                className="
  flex
  flex-col
  sm:flex-row
  justify-between
  items-start
  gap-4
  p-4
  rounded-2xl
  hover:bg-gray-50
"
                              >

                                <div
                                  className="
                border-l-4
                border-blue-500
                pl-4
                flex-1
              "
                                >

                                  <h3
  className="
    font-semibold
    line-clamp-2
    md:line-clamp-3
    lg:line-clamp-none
  "
>

                                    {article.aiTitle}

                                  </h3>

                                  <span
                                    className="
                  inline-block
                  mt-3
                  px-3
                  py-1
                  rounded-full
                  bg-blue-100
                  text-blue-700
                  text-xs
                "
                                  >

                                    {article.category}

                                  </span>

                                </div>

                                <span
                                  className="
  self-start
  sm:self-auto
  px-3
  py-1
  bg-purple-100
  text-purple-700
  rounded-full
  text-xs
"
                                >

                                  AI

                                </span>

                              </div>

                            ))
                        }

                      </div>

                    </div>
                  </div>

                </div>

                <div className="mt-10">

                  <div
                    className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-gray-100
      p-8
    "
                  >

                    <h2 className="text-2xl font-bold mb-8">
                      Platform Summary
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                      {/* Left Side */}

                      <div className="space-y-6">

                        <div>

                          <div className="flex justify-between mb-2">

                            <span>Total Articles</span>

                            <span className="font-bold">
                              {totalNewsCount}
                            </span>

                          </div>

                          <div className="w-full h-3 bg-gray-200 rounded-full">

                            <div
                              className="
                h-3
                bg-blue-500
                rounded-full
                w-full
              "
                            ></div>

                          </div>

                        </div>


                        <div>

                          <div className="flex justify-between mb-2">

                            <span>Featured News</span>

                            <span className="font-bold">
                              {featuredCount}
                            </span>

                          </div>

                          <div className="w-full h-3 bg-gray-200 rounded-full">

                            <div
                              className="
                h-3
                bg-yellow-500
                rounded-full
              "
                              style={{
                                width: `${(featuredCount / totalNewsCount) * 100}%`
                              }}
                            ></div>

                          </div>

                        </div>


                        <div>

                          <div className="flex justify-between mb-2">

                            <span>Editor Picks</span>

                            <span className="font-bold">
                              {editorPickCount}
                            </span>

                          </div>

                          <div className="w-full h-3 bg-gray-200 rounded-full">

                            <div
                              className="
                h-3
                bg-green-500
                rounded-full
              "
                              style={{
                                width: `${(editorPickCount / totalNewsCount) * 100}%`
                              }}
                            ></div>

                          </div>

                        </div>

                      </div>


                      {/* Right Side */}

                      <div className="grid grid-cols-2 gap-4">

                        <div className="bg-blue-50 p-5 rounded-2xl">

                          <p className="text-gray-500">
                            Total News
                          </p>

                          <h3 className="text-3xl font-bold mt-2">
                            {totalNewsCount}
                          </h3>

                        </div>

                        <div className="bg-yellow-50 p-5 rounded-2xl">

                          <p className="text-gray-500">
                            Featured
                          </p>

                          <h3 className="text-3xl font-bold mt-2">
                            {featuredCount}
                          </h3>

                        </div>

                        <div className="bg-green-50 p-5 rounded-2xl">

                          <p className="text-gray-500">
                            Editor Picks
                          </p>

                          <h3 className="text-3xl font-bold mt-2">
                            {editorPickCount}
                          </h3>

                        </div>

                        <div className="bg-orange-50 p-5 rounded-2xl">

                          <p className="text-gray-500">
                            Pending
                          </p>

                          <h3 className="text-3xl font-bold mt-2">
                            {news.length}
                          </h3>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>



            )
          }


          {
            activeTab === "pending" && (


              news.length === 0 ? (

                <h3>No Pending News</h3>

              ) : (

                <div
                  style={{
                    display: "grid",
                    gap: "20px"
                  }}
                >

                  {news.map((article) => (


                    <div
                      key={article._id}
                      onClick={() =>
                        setSelectedPendingNews(
                          article
                        )
                      }

                      className="
    block
    bg-white
    rounded-2xl
    shadow-md
    p-5
    hover:shadow-lg
    hover:-translate-y-1
    transition-all
    duration-200
  "
                    >

                      <div
  className="
    flex
    flex-col
    md:flex-row
    gap-5
  "
>

                        <img
                          src={article.imageUrl}
                          alt="news"
                          className="
w-full
h-56
md:w-52
md:h-36
object-cover
rounded-xl
"
                        />

                        <div className="flex-1">

                          <h2
                            className="
text-lg
md:text-xl
font-bold
text-gray-800
mb-3
line-clamp-2
lg:line-clamp-none
"
                          >
                            {article.title}
                          </h2>

                          <div
  className="
    flex
    flex-wrap
    gap-2
    mb-4
  "
>

                            <span
                              className="
            px-3
            py-1
            bg-emerald-100
            text-emerald-700
            rounded-full
            text-sm
          "
                            >
                              {article.category}
                            </span>

                            <span
                              className="
            px-3
            py-1
            bg-yellow-100
            text-yellow-700
            rounded-full
            text-sm
          "
                            >
                              Pending Review
                            </span>

                          </div>

                          <p
  className="
    text-sm
    md:text-base
    text-gray-500
    line-clamp-3
    lg:line-clamp-none
  "
>

                            {
                              article.content
                                ?.slice(0, 120)
                            }...

                          </p>

                          <div
  className="
    flex
    flex-col
    sm:flex-row
    gap-3
    mt-5
  "
>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(
                                  article._id
                                )
                              }}
                              className="
bg-green-500
hover:bg-green-600
text-white
w-full
sm:w-auto
px-5
py-2
rounded-xl
transition
"
                            >
                              ✓ Approve
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(
                                  article._id
                                )
                              }}
                              className="
bg-red-500
hover:bg-red-600
text-white
w-full
sm:w-auto
px-5
py-2
rounded-xl
transition
"
                            >
                              ✕ Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )

            )
          }

          {
            activeTab === "pendingAI" && (

              <div>

                <h1
                  className="
          text-3xl
          font-bold
          mb-6
        "
                >
                  Pending AI News
                </h1>

                {

                  pendingAI.length === 0

                    ? (

                      <h3>
                        No Pending AI News
                      </h3>

                    )

                    : (

                      <div
                        className="
                grid
                gap-5
              "
                      >

                        {

                          pendingAI.map(
                            (article) => (

                              <div
                                key={article._id}
                                className="
    bg-white
    rounded-3xl
    shadow-lg
    border
    border-gray-100
    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:shadow-xl
  "
                              >

                                <div
  className="
    flex
    flex-col
    md:flex-row
    gap-5
  "
>

                                  <img
                                    src={article.imageUrl}
                                    alt="news"
                                    className="
w-full
h-56
md:w-52
md:h-36
object-cover
rounded-xl
"
                                  />

                                  <div className="flex-1">

                                    <h2
                                      className="
text-lg
md:text-2xl
font-bold
text-gray-800
mb-3
line-clamp-2
lg:line-clamp-none
"
                                    >
                                      {article.aiTitle}
                                    </h2>

                                    <div
  className="
    flex
    flex-wrap
    gap-2
    mb-4
  "
>

                                      <span
                                        className="
                px-3
                py-1
                bg-blue-100
                text-blue-700
                rounded-full
                text-sm
              "
                                      >
                                        {article.category}
                                      </span>

                                      <span
                                        className="
                px-3
                py-1
                bg-purple-100
                text-purple-700
                rounded-full
                text-sm
              "
                                      >
                                        Pending AI Review
                                      </span>

                                    </div>

                                    <p
  className="
    text-sm
    md:text-base
    text-gray-500
    line-clamp-3
    lg:line-clamp-none
  "
>

                                      {article.aiSummary}

                                    </p>

                                    <div
  className="
    flex
    flex-col
    sm:flex-row
    flex-wrap
    gap-3
    mt-5
  "
>

                                      <button
                                        onClick={() =>
                                          setSelectedAIArticle(
                                            article
                                          )
                                        }
                                        className="
bg-blue-500
hover:bg-blue-600
text-white
w-full
sm:w-auto
px-5
py-2
rounded-xl
transition
"
                                      >
                                        👁 View Draft
                                      </button>

                                      <button
                                        className="
bg-green-500
hover:bg-green-600
text-white
w-full
sm:w-auto
px-5
py-2
rounded-xl
transition
"
                                      >
                                        ✓ Approve
                                      </button>

                                      <button
                                        className="
bg-red-500
hover:bg-red-600
text-white
w-full
sm:w-auto
px-5
py-2
rounded-xl
transition
"
                                      >
                                        ✕ Reject
                                      </button>

                                    </div>

                                  </div>

                                </div>

                              </div>

                            )
                          )

                        }

                      </div>

                    )

                }

              </div>

            )
          }

          {
            activeTab === "external" && (

              <div>


                <div className="flex justify-end mb-5">


                  {/* Right Side */}
                  <div
  className="
    flex
    flex-col
    lg:flex-row
    items-stretch
    lg:items-center
    gap-4
    w-full
    lg:w-auto
  "
>

                    {/* Pagination */}
                    <div
  className="
    flex
    items-center
    justify-end
    gap-2
    w-full
    lg:w-auto
    whitespace-nowrap
  "
>

                      <select
                        value={articlesPerPage}
                        onChange={(e) => {
                          setArticlesPerPage(
                            Number(e.target.value)
                          );
                          setCurrentPage(1);
                        }}
                        className="
border
rounded
px-2
py-1
text-xs
md:text-sm
w-16
"
                      >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={75}>75</option>
                        <option value={100}>100</option>
                      </select>

                      <span
  className="
    text-xs
    md:text-sm
    whitespace-nowrap
  "
>
                        {firstIndex + 1}
                        -
                        {lastIndex}
                        {" "}of{" "}
                        {totalArticles}
                      </span>

                      <button
  disabled={currentPage === 1}
  onClick={() =>
    setCurrentPage(prev => prev - 1)
  }
  className="
    w-7
    h-7
    md:w-8
    md:h-8
    flex
    items-center
    justify-center
    rounded-md
    hover:bg-gray-100
    disabled:opacity-40
  "
>
  ◀
</button>

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage(prev => prev + 1)
                        }
                        className="
    w-7
    h-7
    md:w-8
    md:h-8
    flex
    items-center
    justify-center
    rounded-md
    hover:bg-gray-100
    disabled:opacity-40
  "
                      >
                        ▶
                      </button>

                    </div>

                    {/* Search */}
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="
w-full
lg:w-80
px-4
py-2
border
border-gray-300
rounded-3xl
focus:outline-none
focus:ring-2
focus:ring-black
"
                    />

                  </div>

                </div>

                {

                  filteredNews.map((article) => (

                    <Link
                      key={article._id}
                      to={`/news/${article._id}`}
                      
                      className="
    block
    bg-white
    rounded-2xl
    shadow-md
    p-5
    mb-5
    hover:shadow-lg
    hover:-translate-y-1
    transition-all
    duration-200
  "
                    >

                      <div
  className="
    flex
    flex-col
    md:flex-row
    gap-5
  "
>

                        {/* Image */}

                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="
w-full
h-56
md:w-56
md:h-36
object-cover
rounded-xl
"
                        />

                        {/* Content */}

                        <div className="flex-1">

                          <h2
                            className="
            text-lg
md:text-xl
            font-bold
            text-gray-800
            hover:underline
            mb-3
            line-clamp-2
lg:line-clamp-none
          "
                          >
                            {article.title}
                          </h2>

                          <div className="flex flex-wrap gap-3 mb-4">

                            <span
                              className="
              bg-blue-100
              text-blue-700
              px-3
              py-1
              rounded-full
              text-sm
            "
                            >
                              {article.category}
                            </span>

                            <span
                              className="
              bg-gray-100
              text-gray-700
              px-3
              py-1
              rounded-full
              text-sm
            "
                            >
                              {
                                new Date(
                                  article.publishedAt
                                ).toLocaleDateString()
                              }
                            </span>

                            {article.featured && (

                              <span
                                className="
                bg-yellow-100
                text-yellow-700
                px-3
                py-1
                rounded-full
                text-sm
              "
                              >
                                ⭐ Featured
                              </span>

                            )}

                            {article.editorPick && (

                              <span
                                className="
                bg-green-100
                text-green-700
                px-3
                py-1
                rounded-full
                text-sm
              "
                              >
                                ✍️ Editor Pick
                              </span>

                            )}

                          </div>

                          <div
  className="
    flex
    flex-col
    sm:flex-row
    flex-wrap
    gap-3
    mt-5
  "
>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleFeature(article._id)
                              }}
                              className="
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              w-full
sm:w-auto
px-4
py-2
rounded-xl
transition
            "
                            >
                              {
                                article.featured
                                  ? "Remove Featured"
                                  : "⭐ Feature"
                              }
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleEditorPick(article._id)
                              }}
                              className="
              bg-green-500
              hover:bg-green-600
              text-white
              w-full
sm:w-auto
px-4
py-2
rounded-xl
transition
            "
                            >
                              {
                                article.editorPick
                                  ? "Remove Editor Pick"
                                  : "✍️ Editor Pick"
                              }
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteExternal(article._id)
                              }}
                              className="
              bg-red-500
              hover:bg-red-600
              text-white
              w-full
sm:w-auto
px-4
py-2
rounded-xl
transition
            "
                            >
                              🗑 Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    </Link>

                  ))

                }

              </div>

            )
          }

          {
            selectedPendingNews && (

              <div
                onClick={() =>
                  setSelectedPendingNews(null)
                }
                className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-6
      "
              >

                <div
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  className="
bg-white
rounded-2xl
lg:rounded-3xl
w-full
max-w-5xl
max-h-[95vh]
overflow-y-auto
p-4
md:p-6
lg:p-8
 pb-20
 md:pb-20
    lg:pb-8
"
                >

                  <button
                    onClick={() =>
                      setSelectedPendingNews(null)
                    }
                    className="
            float-right
            text-2xl
            font-bold
          "
                  >
                    ×
                  </button>

                  <div
  className="
    flex
    flex-col
    md:flex-row
    gap-6
    lg:gap-8
  "
>

                    <img
                      src={
                        selectedPendingNews.imageUrl
                      }
                      alt="news"
                      className="
w-full
h-56
md:w-80
md:h-52
object-cover
rounded-2xl
"
                    />

                    <div className="flex-1">

                      <h1
                        className="
text-xl
md:text-2xl
lg:text-3xl
font-bold
leading-tight
"
                      >
                        {
                          selectedPendingNews.title
                        }
                      </h1>

                      <p
                        className="
mt-3
text-sm
md:text-base
text-gray-600
"
                      >
                        Category:
                        {" "}
                        {
                          selectedPendingNews.category
                        }
                      </p>

                    </div>

                  </div>

                  <hr className="my-8" />

                  <div
                    className="
whitespace-pre-wrap
leading-7
md:leading-8
text-sm
md:text-base
text-gray-700
"
                  >

                    {
                      selectedPendingNews.content
                    }

                  </div>

                  <div
  className="
    flex
    flex-col
    sm:flex-row
    justify-end
    gap-3
    mt-8
  "
>

                    <button
                      onClick={() =>
                        setSelectedPendingNews(null)
                      }
                      className="
              w-full
sm:w-auto
px-6
py-3              rounded-xl
              bg-gray-200
            "
                    >
                      Close
                    </button>

                    <button
                      onClick={() => {

                        handleDelete(
                          selectedPendingNews._id
                        );

                        setSelectedPendingNews(
                          null
                        );

                      }}
                      className="
              w-full
sm:w-auto
px-6
py-3              rounded-xl
              bg-red-500
              text-white
            "
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {

                        handleApprove(
                          selectedPendingNews._id
                        );

                        setSelectedPendingNews(
                          null
                        );

                      }}
                      className="
              w-full
sm:w-auto
px-6
py-3              rounded-xl
              bg-green-500
              text-white
            "
                    >
                      Approve
                    </button>

                  </div>

                </div>

              </div>

            )
          }


          {
            selectedAIArticle && (

              <div
                onClick={() =>
                  setSelectedAIArticle(null)
                }
                className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-6
      "
              >

                <div
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  className="
bg-white
rounded-2xl
lg:rounded-3xl
w-full
max-w-5xl
max-h-[95vh]
overflow-y-auto
p-4
md:p-6
lg:p-8
pb-20
md:pb-20
lg:pb-8
"
                >

                  <button
                    onClick={() =>
                      setSelectedAIArticle(null)
                    }
                    className="
            float-right
            text-2xl
            font-bold
          "
                  >
                    ×
                  </button>

                  <div
  className="
    flex
    flex-col
    md:flex-row
    gap-6
    lg:gap-8
  "
>

                    <img
                      src={
                        selectedAIArticle.imageUrl
                      }
                      alt="news"
                      className="
w-full
h-56
md:w-80
md:h-52
object-cover
rounded-2xl
"
                    />

                    <div className="flex-1">

                      <h1
                        className="
text-xl
md:text-2xl
lg:text-3xl
font-bold
leading-tight
line-clamp-2
lg:line-clamp-none

              "
                      >
                        {
                          selectedAIArticle.aiTitle
                        }
                      </h1>

                      <p
                        className="
mt-3
text-sm
md:text-base
text-gray-600
line-clamp-3
lg:line-clamp-none
"
                      >
                        {
                          selectedAIArticle.aiSummary
                        }
                      </p>

                      <div
  className="
    flex
    flex-wrap
    gap-2
    mt-5
  "
>

                        <span
                          className="
                  px-3
                  py-1
                  bg-blue-100
                  text-blue-700
                  rounded-full
                "
                        >
                          {
                            selectedAIArticle.category
                          }
                        </span>

                        <span
                          className="
                  px-3
                  py-1
                  bg-purple-100
                  text-purple-700
                  rounded-full
                "
                        >
                          AI Draft
                        </span>

                      </div>

                    </div>

                  </div>

                  <hr className="my-8" />

                  <div
                    className="
whitespace-pre-wrap
leading-7
md:leading-8
text-sm
md:text-base
text-gray-700
"
                  >

                    {
                      selectedAIArticle.aiContent
                    }

                  </div>

                  <div
  className="
    flex
    flex-col
    sm:flex-row
    justify-end
    gap-3
    mt-8
  "
>

                    <button
                      onClick={() =>
                        setSelectedAIArticle(null)
                      }
                      className="
              w-full
sm:w-auto
px-6
py-3              rounded-xl
              bg-gray-200
            "
                    >
                      Close
                    </button>

                    <button
                      onClick={() =>
                        handleRejectAI(
                          selectedAIArticle._id
                        )
                      }
                      className="
    w-full
sm:w-auto
px-6
py-3    rounded-xl
    bg-red-500
    text-white
  "
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        handleApproveAI(
                          selectedAIArticle._id
                        )
                      }
                      className="
    w-full
sm:w-auto
px-6
py-3    rounded-xl
    bg-green-500
    text-white
  "
                    >
                      Approve
                    </button>

                  </div>

                </div>

              </div>

            )
          }

        </div>
      </div>

      {/* MOBILE & TABLET BOTTOM NAVIGATION */}

<div
  className="
fixed
bottom-0
left-0
right-0
lg:hidden
bg-white/95
backdrop-blur-md
border-t
border-gray-100
rounded-t-3xl
shadow-[0_-8px_30px_rgba(0,0,0,0.12)]
z-50
pb-safe
"
>

  <div
    className="
      grid
      grid-cols-4
      h-18
      relative
    "
  >

    {/* Dashboard */}

    <button

      onClick={() => {

        setActiveTab("dashboard");
         setShowPendingBottom(false);

      }}

      className={`
  flex
  flex-col
  justify-center
  items-center
  transition-all
  rounded-xl
  py-2
  ${
    activeTab === "dashboard"
      ? "text-emerald-600 bg-emerald-50"
      : "text-gray-500"
  }
`}
    >

      <FaHome className="text-xl" />

      <span className="text-[11px]
font-medium">

        Dashboard

      </span>

    </button>

    {/* Featured */}

    <button

      onClick={() => {

        setActiveTab("external");

        setFilter("featured");

        setSelectedFilter("featured");

        setCurrentPage(1);
         setShowPendingBottom(false);

      }}

      className={`
  flex
  flex-col
  justify-center
  items-center
  transition-all
  rounded-xl
  py-2
  ${
    activeTab === "external" &&
    filter === "featured"
      ? "text-emerald-600 bg-emerald-50"
      : "text-gray-500"
  }
`}
    >

      <FaStar className="text-xl" />

      <span className="text-[11px]
font-medium">

        Featured

      </span>

    </button>

    {/* Editor */}

    <button

      onClick={() => {

        setActiveTab("external");

        setFilter("editor");

        setSelectedFilter("editor");

        setCurrentPage(1);
         setShowPendingBottom(false);

      }}

      className={`
  flex
  flex-col
  justify-center
  items-center
  transition-all
  rounded-xl
  py-2
  ${
    activeTab === "external" &&
    filter === "editor"
      ? "text-emerald-600 bg-emerald-50"
      : "text-gray-500"
  }
`}
    >

      <FaUserEdit className="text-xl" />

      <span className="text-[11px]
font-medium">

        Editor

      </span>

    </button>

    {/* Pending */}

    <button

      onClick={() =>
        setShowPendingBottom(
          !showPendingBottom
        )
      }

      className={`
  flex
  flex-col
  justify-center
  items-center
  transition-all
  rounded-xl
  py-2
  ${
    activeTab === "pending" ||
    activeTab === "pendingAI"
      ? "text-emerald-600 bg-emerald-50"
      : "text-gray-500"
  }
`}
    >

      <FaClock className="text-xl" />

      <span className="text-[11px]
font-medium">

        Pending

      </span>

    </button>

  </div>

  {

    showPendingBottom && (

      <div
        className="
absolute
bottom-20
right-4
w-56
bg-white
rounded-2xl
shadow-2xl
border
border-gray-100
overflow-hidden
animate-in
fade-in
slide-in-from-bottom-2
duration-200
"
      >

        <button

          onClick={() => {

            setActiveTab("pending");

            setShowPendingBottom(false);

          }}

          className="
            w-full
            text-left
            px-5
            py-4
            hover:bg-gray-50
            border-b
          "
        >

          Pending Reviews

        </button>

        <button

          onClick={() => {

            setActiveTab("pendingAI");

            setShowPendingBottom(false);

          }}

          className="
            w-full
            text-left
            px-5
            py-4
            hover:bg-gray-50
          "
        >

          Pending AI News

        </button>

      </div>

    )

  }

</div>

    </>

  );

}





export default AdminDashboard;