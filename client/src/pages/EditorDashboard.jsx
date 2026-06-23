import Navbar from "../components/Navbar";

import { useState, useEffect } from "react";

import { createNews } from "../services/editorService";

import { FaFilter } from "react-icons/fa";

function EditorDashboard() {

  const [formData, setFormData] = useState({

    title: "",

    content: "",

    category: "",

    imageUrl: ""

  });

  const [topic, setTopic] = useState("");

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [rawNews, setRawNews] =
    useState([]);

  const [draftNews, setDraftNews] =
    useState([]);

  const [selectedDraft,
    setSelectedDraft] =
    useState(null);
  const [showDraftModal, setShowDraftModal] =
    useState(false);
  const [isEditing, setIsEditing] =
    useState(false);

  const [editingDraft, setEditingDraft] =
    useState(null);

  const [publishedCount,
    setPublishedCount] =
    useState(0);
  const [submittedCount,
    setSubmittedCount] =
    useState(0);
  const [pendingNews,
    setPendingNews] =
    useState([]);

  const [publishedNews,
    setPublishedNews] =
    useState([]);

  const [rawFilter,
    setRawFilter] =
    useState("all");

    const [showFilter,
  setShowFilter] =
  useState(false);


  const handleGenerateAI = async (fromDashboard = false) => {

    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/ai/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            topic
          })
        }
      );

      const data = await response.json();

      const aiData = JSON.parse(
        data.result
      );

      setFormData({

        title: aiData.title,

        content: aiData.content,

        category: aiData.category,

        imageUrl: ""

      });

      if (fromDashboard) {

        setShowDraftModal(true);

      }

    } catch (error) {

      console.log(error);

      alert("AI Generation Failed");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await createNews(formData);

      console.log(response.data);

      alert("News Created Successfully");
      setShowDraftModal(false);

      // CLEAR FORM
      setFormData({

        title: "",

        content: "",

        category: "",

        imageUrl: ""

      });
      setTopic("");

    } catch (error) {

      console.log(error);

      alert("Failed To Create News");

    }

  };

  const fetchRawNews = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/external-news/raw"
        );

      const data =
        await response.json();

      setRawNews(data.articles);

    }

    catch (error) {

      console.log(error);

    }

  };
  const fetchDraftNews = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/external-news/drafts"
        );

      const data =
        await response.json();

      setDraftNews(data);

    }

    catch (error) {

      console.log(error);

    }

  };
  const fetchPublishedCount =
    async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/external-news/published-count"
        );

        const data =
          await response.json();

        setPublishedCount(
          data.count
        );

      }

      catch (error) {

        console.log(error);

      }

    };
  const fetchSubmittedCount =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/external-news/submitted-count"
          );

        const data =
          await response.json();

        setSubmittedCount(
          data.count
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const fetchPendingNews =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/external-news/pending"
          );

        const data =
          await response.json();

        setPendingNews(data);

      }

      catch (error) {

        console.log(error);

      }

    };

  const fetchPublishedNews =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/external-news/published"
          );

        const data =
          await response.json();

        setPublishedNews(data);

      }

      catch (error) {

        console.log(error);

      }

    };
  useEffect(() => {

    fetchRawNews();

    fetchDraftNews();

    fetchPublishedCount();

    fetchSubmittedCount();

    fetchPendingNews();

    fetchPublishedNews();

  }, []);

  const handleGenerateDraft =
    async (id) => {

      try {

        const response =
          await fetch(

            `http://localhost:5000/api/ai/generate-draft/${id}`,

            {
              method: "POST"
            }

          );

        const data =
          await response.json();

        alert(
          "Draft Generated"
        );

        fetchRawNews();

        fetchDraftNews();

      }

      catch (error) {

        console.log(error);

        alert(
          "Draft Generation Failed"
        );

      }

    };

  const handleSubmitToAdmin =
    async (id) => {

      try {

        const response =
          await fetch(

            `http://localhost:5000/api/external-news/submit/${id}`,

            {
              method: "POST"
            }

          );

        const data =
          await response.json();

        alert(
          "Sent To Admin"
        );
        setSelectedDraft(null);
        fetchDraftNews();

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Submit"
        );

      }

    };

  const handleUpdateDraft = async () => {

    try {

      const response = await fetch(

        `http://localhost:5000/api/external-news/draft/${editingDraft._id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            aiTitle: editingDraft.aiTitle,

            aiSummary: editingDraft.aiSummary,

            aiContent: editingDraft.aiContent,

            category: editingDraft.category,

            imageUrl: editingDraft.imageUrl

          })

        }

      );

      const data = await response.json();

      alert("Draft Updated Successfully");

      setIsEditing(false);

      fetchDraftNews();

    }

    catch (error) {

      console.log(error);

      alert("Failed To Update Draft");

    }

  };

  const filteredRawNews =
    rawFilter === "all"

      ? rawNews

      : rawNews.filter(
        (article) =>
          article.category ===
          rawFilter
      );
  return (

    <>

      <Navbar />

      <div className="flex bg-gray-100 min-h-screen">
        <div
          className="
    w-64
    bg-slate-950
    text-white
    min-h-screen
    p-6
    flex
    flex-col
    border-r
    border-slate-800
  "
        >

          {/* Logo */}

          <div className="mb-10">

            <h1
              className="
        text-3xl
        font-bold
        tracking-wide
      "
            >
              EV TIMES
            </h1>

            <p
              className="
        text-slate-400
        text-sm
        mt-1
      "
            >
              Editor Workspace
            </p>

          </div>

          {/* Navigation */}

          <div className="flex flex-col gap-2">

            <button
              onClick={() =>
                setActiveTab("dashboard")
              }
              className={`
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-xl
    transition-all
    duration-200
    ${activeTab === "dashboard"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
  `}
            >
              📊
              <span>Dashboard</span>
            </button>

            <p
              className="
    text-lg
    uppercase
    tracking-wider
    text-slate-500
    mt-8
    mb-3
    px-2
  "
            >
              Content
            </p>
            <button
              onClick={() =>
                setActiveTab("raw")
              }
              className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        ${activeTab === "raw"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
      `}
            >
              📰
              <span>Raw Feed</span>
              <span
                className="
    ml-auto
    bg-slate-800
    text-white
    text-xs
    px-2
    py-1
    rounded-full
  "
              >
                {rawNews.length}
              </span>
            </button>

            <button
              onClick={() =>
                setActiveTab("draft")
              }
              className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        ${activeTab === "draft"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
      `}
            >
              📄
              <span>Draft Queue</span>
              <span
                className="
    ml-auto
    bg-slate-800
    text-white
    text-xs
    px-2
    py-1
    rounded-full
  "
              >
                {draftNews.length}
              </span>
            </button>

            <button
              onClick={() =>
                setActiveTab("submitted")
              }
              className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        ${activeTab === "submitted"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
      `}
            >
              📄
              <span>Submitted</span>
              <span
                className="
    ml-auto
    bg-slate-800
    text-white
    text-xs
    px-2
    py-1
    rounded-full
  "
              >
                {submittedCount}
              </span>
            </button>


            <button
              onClick={() =>
                setActiveTab("published")
              }
              className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        ${activeTab === "published"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
      `}
            >
              📄
              <span>Published</span>
              <span
                className="
    ml-auto
    bg-slate-800
    text-white
    text-xs
    px-2
    py-1
    rounded-full
  "
              >
                {publishedCount}
              </span>
            </button>

            <p
              className="
    text-lg
    uppercase
    tracking-wider
    text-slate-500
    mt-8
    mb-3
    px-2
  "
            >
              Tools
            </p>

            <button
              onClick={() =>
                setActiveTab("create")
              }
              className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        ${activeTab === "create"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
      `}
            >
              ✍
              <span>Create News</span>
            </button>

            <button
              onClick={() =>
                setActiveTab("ai")
              }
              className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        ${activeTab === "ai"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
                }
      `}
            >
              🤖
              <span>AI Generator</span>
            </button>



          </div>

          {/* Divider */}

          <div
            className="
      border-t
      border-slate-800
      my-8
    "
          />

          {/* Quick Stats */}

          <div
            className="
      bg-slate-900
      rounded-2xl
      p-5
      mb-4
    "
          >

            <p className="text-slate-400 text-sm">
              Raw News
            </p>

            <h2
              className="
        text-3xl
        font-bold
        mt-2
      "
            >
              {rawNews.length}
            </h2>

          </div>

          <div
            className="
      bg-slate-900
      rounded-2xl
      p-5
    "
          >

            <p className="text-slate-400 text-sm">
              Draft News
            </p>

            <h2
              className="
        text-3xl
        font-bold
        mt-2
      "
            >
              {draftNews.length}
            </h2>

          </div>

          {/* Footer */}

          <div className="mt-auto">

            <div
              className="
        bg-gradient-to-r
        from-emerald-500
        to-emerald-700
        rounded-2xl
        p-4
        mt-8
      "
            >

              <h3
                className="
          font-semibold
          mb-1
        "
              >
                Editorial Pipeline
              </h3>

              <p
                className="
          text-sm
          text-emerald-100
        "
              >
                Manage news creation,
                AI drafting and review.
              </p>

            </div>

          </div>

        </div>

        <div className="flex-1 p-8">
          <div
            style={{
              marginBottom: "35px"
            }}
          >



            <div className="mb-8">

              <h1 className="text-4xl font-bold text-gray-900">
                Welcome Back, Editor 👋
              </h1>

              <p className="text-gray-500 mt-2">
                Manage raw news, generate AI drafts and submit articles to admin.
              </p>

            </div>

            <div
              className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-5
    gap-6
    mb-8
  "
            >

              {/* Raw */}

              <div className="bg-white rounded-3xl p-6 shadow-sm border  border-gray-200 ">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-3xl bg-blue-100 flex items-center justify-center text-2xl">
                    📰
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold">
                      {rawNews.length}
                    </h3>

                    <p className="text-gray-500">
                      Raw News
                    </p>
                  </div>

                </div>

              </div>

              {/* Draft */}

              <div className="bg-white rounded-3xl p-6 shadow-sm border  border-gray-200">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-3xl bg-yellow-100 flex items-center justify-center text-2xl">
                    📄
                  </div>

                  <div>

                    <h3 className="text-3xl font-bold">
                      {draftNews.length}
                    </h3>

                    <p className="text-gray-500">
                      Draft News
                    </p>

                  </div>

                </div>

              </div>

              {/* Submitted */}

              <div className="bg-white rounded-3xl p-6 shadow-sm border  border-gray-200">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-3xl bg-purple-100 flex items-center justify-center text-2xl">
                    📤
                  </div>

                  <div>

                    <h3 className="text-3xl font-bold">
                      {submittedCount}
                    </h3>

                    <p className="text-gray-500">
                      Submitted
                    </p>

                  </div>

                </div>

              </div>

              {/* Published */}

              <div className="bg-white rounded-3xl p-6 shadow-sm border  border-gray-200">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-3xl bg-green-100 flex items-center justify-center text-2xl">
                    ✅
                  </div>

                  <div>

                    <h3 className="text-3xl font-bold">
                      {publishedCount}
                    </h3>

                    <p className="text-gray-500">
                      Published
                    </p>

                  </div>

                </div>

              </div>

              {/* Status */}

              <div className="bg-white rounded-3xl p-6 shadow-sm border  border-gray-200">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-3xl bg-emerald-100 flex items-center justify-center text-2xl">
                    🟢
                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-emerald-600">
                      Active
                    </h3>

                    <p className="text-gray-500">
                      Workspace
                    </p>

                  </div>

                </div>

              </div>



            </div>

          </div>

          {
            activeTab === "dashboard" && (

              <div
                className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      "
              >

                {/* RAW FEED */}

                <div className="bg-white rounded-3xl p-6 shadow-sm">

                  <div className="flex justify-between mb-5">

                    <h2 className="font-bold text-xl">
                      Raw News
                    </h2>

                    <button
                      onClick={() =>
                        setActiveTab("raw")
                      }
                      className="text-emerald-600 cursor-pointer"
                    >
                      View All →
                    </button>

                  </div>
                  <div
                    className="
    flex
    gap-3
    mb-5
  "
                  >

                    <select
                      className="
      border
      rounded-lg
      px-3
      py-2
      text-sm
    "
                    >
                      <option>
                        All Sources
                      </option>
                    </select>

                    <select
                      className="
      border
      rounded-lg
      px-3
      py-2
      text-sm
    "
                    >
                      <option>
                        All Categories
                      </option>
                    </select>

                  </div>

                  {
                    rawNews
                      .slice(0, 3)
                      .map((article) => (

                        <div
                          key={article._id}
                          className="
    py-3
    border-b
    border-gray-200
  "
                        >

                          <span
                            className="
      text-xs
      px-2
      py-1
      bg-blue-100
      text-blue-700
      rounded-full
    "
                          >
                            {article.category}
                          </span>

                          <p
                            className="
      mt-2
      font-medium
      line-clamp-2
    "
                          >
                            {article.title}
                          </p>
                          <button
                            onClick={() =>
                              handleGenerateDraft(article._id)
                            }
                            className="
    mt-3
    px-3
    py-2
    bg-cyan-700
    text-white
    text-sm
    rounded-lg
    hover:bg-cyan-800
    transition-all
    cursor-pointer
  "
                          >
                            🤖 Generate Draft
                          </button>

                        </div>

                      ))
                  }

                </div>

                {/* DRAFT FEED */}

                <div className="bg-white rounded-3xl p-6 shadow-sm">

                  <div className="flex justify-between mb-5">

                    <h2 className="font-bold text-xl">
                      Draft News
                    </h2>

                    <button
                      onClick={() =>
                        setActiveTab("draft")
                      }
                      className="text-emerald-600 cursor-pointer"
                    >
                      View All →
                    </button>

                  </div>

                  {
                    draftNews
                      .slice(0, 5)
                      .map((article) => (

                        <div
                          key={article._id}
                          onClick={() =>
                            setSelectedDraft(
                              article
                            )
                          }
                          className="
    flex
    gap-3
    py-3
    border-b
    border-gray-200
    cursor-pointer
  "
                        >

                          <img
                            src={article.imageUrl}
                            alt="news"
                            className="
      w-20
      h-16
      object-cover
      rounded-lg
      flex-shrink-0
    "
                          />

                          <div>

                            <p
                              className="
        font-medium
        line-clamp-2
      "
                            >
                              {article.aiTitle}
                            </p>

                            <div className="flex items-center gap-2 mt-1">

                              <span
                                className="
      text-xs
      text-gray-500
    "
                              >
                                {article.category || "EV"}
                              </span>

                              <span
                                className="
      px-2
      py-0.5
      text-xs
      rounded-full
      bg-yellow-100
      text-yellow-700
    "
                              >
                                Draft
                              </span>

                            </div>

                          </div>

                        </div>

                      ))
                  }

                </div>



                {/* submit to admin */}

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-2xl font-bold">
                      Submitted News
                    </h3>

                    <button
                      onClick={() =>
                        setActiveTab("submitted")
                      }
                      className="
    text-emerald-600
    text-sm
    cursor-pointer
  "
                    >
                      View All →
                    </button>

                  </div>

                  <div className="space-y-4">

                    {
                      pendingNews
                        .slice(0, 3)
                        .map((article) => (

                          <div
                            key={article._id}
                            onClick={() =>
                              setSelectedDraft(
                                article
                              )
                            }
                            className="
              flex
              gap-3
              pb-3
              border-b
              border-gray-200
              cursor-pointer
            "
                          >

                            <img
                              src={article.imageUrl}
                              alt="news"
                              className="
                w-16
                h-16
                rounded-xl
                object-cover
              "
                            />

                            <div>

                              <p
                                className="
                  text-sm
                  font-medium
                  line-clamp-2
                "
                              >
                                {article.aiTitle}
                              </p>

                              <span
                                className="
                  inline-block
                  mt-2
                  px-2
                  py-1
                  text-xs
                  rounded-full
                  bg-purple-100
                  text-purple-700
                "
                              >
                                Pending for Approval
                              </span>

                            </div>

                          </div>

                        ))
                    }

                  </div>

                </div>

                {/* AI Generator */}



                <div
                  className="
    bg-white
    rounded-3xl
    p-6
    shadow-sm
    hover:shadow-lg
    transition-all
  "
                >

                  <div className="flex justify-between mb-5">

                    <h2 className="font-bold text-xl">
                      AI Draft Generator
                    </h2>

                    <span
                      className="
        text-cyan-600
        text-sm
        font-medium
      "
                    >
                      AI Powered
                    </span>

                  </div>

                  <p
                    className="
      text-gray-500
      text-sm
      mb-4
    "
                  >
                    Generate a complete news draft from a topic.
                  </p>

                  <input
                    type="text"
                    placeholder="Enter topic..."
                    value={topic}
                    onChange={(e) =>
                      setTopic(e.target.value)
                    }
                    className="
      w-full
      border
      border-gray-200
      rounded-xl
      px-4
      py-3
      mb-4
      focus:outline-none
      focus:ring-2
      focus:ring-purple-500
    "
                  />

                  <button
                    onClick={() => {



                      handleGenerateAI(true);

                    }}
                    disabled={loading}
                    className="
      w-full
      bg-cyan-600
      hover:bg-cyan-900
      text-white
      py-3
      rounded-xl
      font-semibold
      transition-all
      cursor-pointer
    "
                  >
                    {
                      loading
                        ? "Generating..."
                        : " 🤖 Generate Draft"
                    }

                  </button>

                </div>



                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-2xl font-bold">
                      Published News
                    </h3>

                    <button
                      onClick={() =>
                        setActiveTab("published")
                      }
                      className="
    text-emerald-600
    text-sm
    cursor-pointer
  "
                    >
                      View All →
                    </button>

                  </div>

                  <div className="space-y-7">

                    {
                      publishedNews
                        .slice(0, 3)
                        .map((article) => (

                          <div
                            key={article._id}
                            onClick={() =>
                              setSelectedDraft(
                                article
                              )
                            }

                            className="
              flex
              gap-5
              pb-3
              border-b
              border-gray-200
              cursor-pointer
            "
                          >

                            <img
                              src={article.imageUrl}
                              alt="news"
                              className="
                w-16
                h-16
                rounded-xl
                object-cover
              "
                            />

                            <div>

                              <p
                                className="
                  text-sm
                  font-medium
                  line-clamp-2
                "
                              >
                                {article.title}
                              </p>

                              <span
                                className="
                  inline-block
                  mt-2
                  px-2
                  py-1
                  text-xs
                  rounded-full
                  bg-green-100
                  text-green-700
                "
                              >
                                Published
                              </span>

                            </div>

                          </div>

                        ))
                    }

                  </div>

                </div>

                {/* QUICK ACTIONS*/}

                <div className="bg-white rounded-3xl p-6 shadow-sm">

                  <h2 className="font-bold text-xl mb-5">
                    Quick Actions
                  </h2>

                  <div className="space-y-3 ">

                    <button
                      onClick={() =>
                        setActiveTab("create")
                      }
                      className="
              w-full
              bg-blue-50
              hover:bg-blue-100
              rounded-xl
              p-4
              text-left
              cursor-pointer
            "
                    >
                      ➕ Create News
                    </button>

                    <button
                      onClick={() =>
                        setActiveTab("ai")
                      }
                      className="
              w-full
              bg-purple-50
              hover:bg-purple-100
              rounded-xl
              p-4
              text-left
              cursor-pointer
            "
                    >
                      🤖 Generate Draft
                    </button>

                    <button
                      onClick={() =>
                        setActiveTab("draft")
                      }
                      className="
              w-full
              bg-green-50
              hover:bg-green-100
              rounded-xl
              p-4
              text-left
              cursor-pointer
            "
                    >
                      📤 Submit To Admin
                    </button>

                  </div>

                </div>


              </div>

            )
          }


          {
            activeTab === "ai" && (

              <div
                className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      "
              >

                {/* AI Generator */}

                <div className="xl:col-span-2">

                  <div
                    className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
          "
                  >

                    <h2
                      className="
              text-2xl
              font-bold
              mb-6
            "
                    >
                      🤖 AI News Generator
                    </h2>

                    <input
                      type="text"
                      placeholder="Enter Topic"
                      value={topic}
                      onChange={(e) =>
                        setTopic(e.target.value)
                      }
                      className="
              w-full
              p-4
              border
              border-gray-200
              rounded-xl
              mb-6
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500
            "
                    />

                    <button
                      type="button"
                      onClick={() => {



                        handleGenerateAI(false);

                      }}
                      disabled={loading}
                      className="
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition-all
            "
                    >
                      {
                        loading
                          ? "Generating..."
                          : "Generate With AI"
                      }
                    </button>

                  </div>

                  {
                    formData.title && (

                      <div
                        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        mt-6
      "
                      >

                        <h2
                          className="
          text-2xl
          font-bold
          mb-6
        "
                        >
                          📰 Generated News Preview
                        </h2>

                        {/* Header Section */}

                        <div
                          className="
          flex
          flex-col
          lg:flex-row
          gap-6
          mb-8
        "
                        >

                          <img
                            src={
                              formData.imageUrl ||
                              "https://placehold.co/600x400?text=EV+News"
                            }
                            alt="news"
                            className="
            w-full
            lg:w-72
            h-52
            object-cover
            rounded-2xl
            shadow
          "
                          />

                          <div className="flex-1">

                            <div
                              className="
              inline-block
              px-4
              py-1
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
              mb-4
            "
                            >
                              {formData.category || "EV"}
                            </div>

                            <h1
                              className="
              text-3xl
              font-bold
              text-gray-900
              mb-4
            "
                            >
                              {formData.title}
                            </h1>

                            <p
                              className="
              text-gray-500
              leading-relaxed
            "
                            >
                              {
                                formData.content
                                  ?.slice(0, 220)
                              }
                              ...
                            </p>

                          </div>

                        </div>

                        {/* Article Content */}

                        <div
                          className="
          border-t
          pt-6
        "
                        >

                          <h3
                            className="
            text-xl
            font-semibold
            mb-4
          "
                          >
                            Article Content
                          </h3>

                          <div
                            className="
            text-gray-700
            leading-8
            whitespace-pre-line
          "
                          >
                            {formData.content}
                          </div>

                        </div>

                        {/* Action Buttons */}

                        <div
                          className="
          flex
          gap-4
          mt-8
        "
                        >

                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className="
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            transition-all
          "
                          >
                            Save Draft
                          </button>

                          <button
                            onClick={() =>
                              setFormData({
                                title: "",
                                content: "",
                                category: "",
                                imageUrl: ""
                              })
                            }
                            className="
            bg-gray-200
            hover:bg-gray-300
            text-gray-700
            px-8
            py-3
            rounded-xl
            font-semibold
            transition-all
          "
                          >
                            Clear
                          </button>

                        </div>

                      </div>

                    )
                  }

                </div>

                {/* Right Panel */}

                <div
                  className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          h-fit
        "
                >

                  <h2
                    className="
            text-xl
            font-bold
            mb-5
          "
                  >
                    AI Assistant
                  </h2>

                  <div className="space-y-4">

                    <div>
                      <h4 className="font-semibold">
                        Suggested Topics
                      </h4>

                      <ul
                        className="
                text-sm
                text-gray-500
                mt-2
                space-y-2
              "
                      >
                        <li>⚡ EV Market</li>
                        <li>🔋 Battery Technology</li>
                        <li>🚗 Tesla</li>
                        <li>🏭 BYD</li>
                        <li>🌍 Global EV Market</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold">
                        Workflow
                      </h4>

                      <p
                        className="
                text-sm
                text-gray-500
                mt-1
              "
                      >
                        Generate → Review →
                        Save Draft → Submit To Admin
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            )
          }


          {/* CREATE NEWS FORM */}
          {
            activeTab === "create" && (

              <div
                className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      "
              >

                {/* Create News Form */}

                <div className="xl:col-span-2">

                  <form
                    onSubmit={handleSubmit}
                    className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
          "
                  >

                    <h2
                      className="
              text-2xl
              font-bold
              mb-6
            "
                    >
                      Create News
                    </h2>

                    <input
                      type="text"
                      name="title"
                      placeholder="News Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="
              w-full
              p-4
              border
              border-gray-200
              rounded-xl
              mb-5
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500
            "
                    />

                    <textarea
                      name="content"
                      placeholder="News Content"
                      rows="12"
                      value={formData.content}
                      onChange={handleChange}
                      className="
              w-full
              p-4
              border
              border-gray-200
              rounded-xl
              mb-5
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500
            "
                    />

                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={formData.category}
                      onChange={handleChange}
                      className="
              w-full
              p-4
              border
              border-gray-200
              rounded-xl
              mb-5
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500
            "
                    />

                    <input
                      type="text"
                      name="imageUrl"
                      placeholder="Image URL"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="
              w-full
              p-4
              border
              border-gray-200
              rounded-xl
              mb-6
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500
            "
                    />

                    <button
                      type="submit"
                      className="
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition-all
            "
                    >
                      Publish News
                    </button>

                  </form>

                </div>

                {/* Right Side Panel */}

                <div
                  className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          h-fit
        "
                >

                  <h2
                    className="
            text-xl
            font-bold
            mb-6
          "
                  >
                    Publishing Guide
                  </h2>

                  <div className="space-y-5">

                    <div>

                      <h4
                        className="
                font-semibold
                text-gray-800
              "
                      >
                        📰 Headline
                      </h4>

                      <p
                        className="
                text-sm
                text-gray-500
                mt-1
              "
                      >
                        Keep titles short, clear and engaging.
                      </p>

                    </div>

                    <div>

                      <h4
                        className="
                font-semibold
                text-gray-800
              "
                      >
                        ✍ Content
                      </h4>

                      <p
                        className="
                text-sm
                text-gray-500
                mt-1
              "
                      >
                        Write factual, neutral and informative news.
                      </p>

                    </div>

                    <div>

                      <h4
                        className="
                font-semibold
                text-gray-800
              "
                      >
                        🏷 Category
                      </h4>

                      <p
                        className="
                text-sm
                text-gray-500
                mt-1
              "
                      >
                        Use EV, Battery, BMS, State or International.
                      </p>

                    </div>

                    <div>

                      <h4
                        className="
                font-semibold
                text-gray-800
              "
                      >
                        🚀 Workflow
                      </h4>

                      <p
                        className="
                text-sm
                text-gray-500
                mt-1
              "
                      >
                        Create → Review → Publish.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )
          }

          {
            activeTab === "raw" && (

              <div>

                <div className="flex justify-between items-center mb-6">

                  <h1 className="text-3xl font-bold">
                    Raw News Feed
                  </h1>

                  <div className="flex items-center gap-3">

                    {/* Articles Count */}

                    <span
                      className="
        bg-blue-100
        text-blue-700
        px-4
        py-2
        rounded-xl
        font-medium
      "
                    >
                      {filteredRawNews.length} Articles
                    </span>

                    {/* Filter Dropdown */}

                    <div className="relative">

                      <button
                        onClick={() =>
                          setShowFilter(
                            !showFilter
                          )
                        }
                        className="
          p-3
          bg-white
          border
          border-gray-200
          rounded-xl
          shadow-sm
          hover:bg-gray-50
          transition
        "
                      >
                        <FaFilter
                          size={16}
                          className="
            text-gray-600
          "
                        />
                      </button>

                      {
                        showFilter && (

                          <div
                            className="
              absolute
              right-0
              mt-2
              w-48
              bg-white
              border
              border-gray-200
              rounded-2xl
              shadow-xl
              overflow-hidden
              z-50
            "
                          >

                            <button
                              onClick={() => {

                                setRawFilter(
                                  "all"
                                );

                                setShowFilter(
                                  false
                                );

                              }}

                              className="
                block
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
                            >
                              All News
                            </button>

                            <button
                              onClick={() => {

                                setRawFilter(
                                  "state"
                                );

                                setShowFilter(
                                  false
                                );

                              }}

                              className="
                block
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
                            >
                              State News
                            </button>

                            <button
                              onClick={() => {

                                setRawFilter(
                                  "international"
                                );

                                setShowFilter(
                                  false
                                );

                              }}

                              className="
                block
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
                            >
                              International News
                            </button>

                            <button
                              onClick={() => {

                                setRawFilter(
                                  "ev"
                                );

                                setShowFilter(
                                  false
                                );

                              }}

                              className="
                block
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
                            >
                              EV News
                            </button>

                            <button
                              onClick={() => {

                                setRawFilter(
                                  "bms"
                                );

                                setShowFilter(
                                  false
                                );

                              }}

                              className="
                block
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
                            >
                              BMS News
                            </button>

                          </div>

                        )
                      }

                    </div>

                  </div>

                </div>

                {

                  filteredRawNews.map(
                    (article) => (

                      <div
                        key={article._id}
                        className="
    bg-white
    rounded-3xl
    shadow-sm
    hover:shadow-lg
    transition-all
    p-6
    mb-5
    flex
    gap-6
  "
                      >

                        <img
                          src={article.imageUrl}
                          alt="news"
                          className="
      w-56
      h-40
      object-cover
      rounded-2xl
      flex-shrink-0
    "
                        />

                        <div className="flex-1">

                          <h2
                            className="
        text-xl
        font-bold
        text-gray-900
        mb-3
      "
                          >
                            {article.title}
                          </h2>

                          <div className="flex gap-2 mb-4">

                            <span
                              className="
          px-3
          py-1
          rounded-full
          bg-blue-100
          text-blue-700
          text-sm
        "
                            >
                              {article.category}
                            </span>

                            <span
                              className="
          px-3
          py-1
          rounded-full
          bg-gray-100
          text-gray-700
          text-sm
        "
                            >
                              {article.source}
                            </span>

                          </div>

                          <p
                            className="
        text-gray-600
        mb-5
      "
                          >
                            Topic: {article.topic}
                          </p>

                          <button
                            onClick={() =>
                              handleGenerateDraft(article._id)
                            }
                            className="
        bg-cyan-600
        hover:bg-cyan-700
        text-white
        px-5
        py-3
        rounded-xl
        font-medium
        transition-all
      "
                          >
                            🤖 Generate Draft
                          </button>

                        </div>

                      </div>

                    )
                  )

                }

              </div>

            )
          }

          {
            activeTab === "draft" && (

              <div>

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-3xl font-bold">
                    Draft Queue
                  </h2>

                  <span
                    className="
            px-4
            py-2
            rounded-xl
            bg-yellow-100
            text-yellow-700
            font-medium
          "
                  >
                    {draftNews.length} Drafts
                  </span>

                </div>

                <div className="space-y-5">

                  {
                    draftNews.map((article) => (

                      <div
                        key={article._id}
                        className="
                bg-white
                rounded-3xl
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
                p-6
                flex
                gap-6
              "
                      >

                        <img
                          src={article.imageUrl}
                          alt="news"
                          className="
                  w-56
                  h-40
                  object-cover
                  rounded-2xl
                  flex-shrink-0
                "
                        />

                        <div className="flex-1">

                          <h3
                            className="
                    text-xl
                    font-bold
                    text-gray-900
                    mb-3
                    line-clamp-2
                  "
                          >
                            {article.aiTitle}
                          </h3>

                          <div className="flex gap-2 mb-4">

                            <span
                              className="
                      px-3
                      py-1
                      rounded-full
                      bg-blue-100
                      text-blue-700
                      text-xs
                      font-medium
                    "
                            >
                              {article.category}
                            </span>

                            <span
                              className="
                      px-3
                      py-1
                      rounded-full
                      bg-yellow-100
                      text-yellow-700
                      text-xs
                      font-medium
                    "
                            >
                              Draft
                            </span>

                          </div>

                          <p
                            className="
                    text-gray-600
                    line-clamp-3
                    mb-5
                  "
                          >
                            {article.aiSummary}
                          </p>

                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                setSelectedDraft(article)
                              }
                              className="
                      px-4
                      py-2
                      rounded-xl
                      bg-gray-100
                      hover:bg-gray-200
                      transition-all
                      font-medium
                    "
                            >
                              👁 Preview
                            </button>

                            <button
                              onClick={() => {

                                setEditingDraft(article);

                                setIsEditing(true);

                              }}
                              className="
    px-4
    py-2
    rounded-xl
    bg-blue-100
    text-blue-700
    hover:bg-blue-200
    transition-all
    font-medium
  "
                            >
                              ✏ Edit
                            </button>

                            <button
                              onClick={() =>
                                handleSubmitToAdmin(
                                  article._id
                                )
                              }
                              className="
                      px-4
                      py-2
                      rounded-xl
                      bg-emerald-600
                      text-white
                      hover:bg-emerald-700
                      transition-all
                      font-medium
                    "
                            >
                              📤 Submit To Admin
                            </button>

                          </div>

                        </div>

                      </div>

                    ))
                  }

                </div>

              </div>

            )
          }

          {
            activeTab === "submitted" && (

              <div>

                <h2 className="text-3xl font-bold mb-6">
                  Submitted News
                </h2>

                <div className="space-y-5">

                  {
                    pendingNews.map(
                      (article) => (

                        <div
                          key={article._id}
                          onClick={() =>
                            setSelectedDraft(
                              article
                            )
                          }
                          className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                  border
                  border-gray-200
                  flex
                  gap-5
                  cursor-pointer
                "
                        >

                          <img
                            src={article.imageUrl}
                            className="
                    w-48
                    h-32
                    rounded-xl
                    object-cover
                  "
                          />

                          <div>

                            <h3 className="font-bold text-lg">
                              {article.aiTitle}
                            </h3>

                            <span
                              className="
                      inline-block
                      mt-2
                      px-3
                      py-1
                      rounded-full
                      bg-purple-100
                      text-purple-700
                      text-sm
                    "
                            >
                              Pending Review
                            </span>

                          </div>

                        </div>

                      )
                    )
                  }

                </div>

              </div>

            )
          }

          {
            activeTab === "published" && (

              <div>

                <h2 className="text-3xl font-bold mb-6">
                  Published News
                </h2>

                <div className="space-y-5">

                  {
                    publishedNews.map(
                      (article) => (

                        <div
                          key={article._id}
                          onClick={() =>
                            setSelectedDraft(
                              article
                            )
                          }
                          className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                  border
                  border-gray-200
                  flex
                  gap-5
                  cursor-pointer
                "
                        >

                          <img
                            src={article.imageUrl}
                            className="
                    w-48
                    h-32
                    rounded-xl
                    object-cover
                  "
                          />

                          <div>

                            <h3 className="font-bold text-lg">
                              {article.title}
                            </h3>

                            <span
                              className="
                      inline-block
                      mt-2
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                    "
                            >
                              Published
                            </span>

                          </div>

                        </div>

                      )
                    )
                  }

                </div>

              </div>

            )
          }

        </div>

      </div>
      {
        selectedDraft && (

          <div
            onClick={() =>
              setSelectedDraft(null)
            }
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor:
                "rgba(0,0,0,0.6)",
              backdropFilter:
                "blur(5px)",
              display: "flex",
              justifyContent:
                "center",
              alignItems:
                "center",
              zIndex: 9999,
              padding: "20px"
            }}
          >

            <div
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                backgroundColor:
                  "white",
                width: "90%",
                maxWidth: "1000px",
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: "15px",
                padding: "25px"
              }}
            >

              <button
                onClick={() =>
                  setSelectedDraft(null)
                }
                style={{
                  float: "right",
                  border: "none",
                  background:
                    "transparent",
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                ×
              </button>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom:
                    "25px"
                }}
              >

                <img
                  src={
                    selectedDraft.imageUrl
                  }
                  alt="news"
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />

                <div>

                  <h1>
                    {
                      selectedDraft.aiTitle
                    }
                  </h1>

                  <p
                    style={{
                      marginTop:
                        "15px",
                      color: "#555"
                    }}
                  >
                    {
                      selectedDraft.aiSummary
                    }
                  </p>

                  <p
                    style={{
                      marginTop:
                        "15px"
                    }}
                  >

                    <strong>
                      Category:
                    </strong>

                    {" "}

                    {
                      selectedDraft.category
                    }

                  </p>

                </div>

              </div>

              <hr />

              <div
                style={{
                  marginTop: "25px",
                  whiteSpace:
                    "pre-wrap",
                  lineHeight: "1.9"
                }}
              >

                {
                  selectedDraft.aiContent
                }

              </div>

            </div>

          </div>


        )
      }

      {
        isEditing &&
        editingDraft && (

          <div
            className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        z-50
        flex
        items-center
        justify-center
        p-6
      "
          >

            <div
              className="
          bg-white
          rounded-3xl
          w-full
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          p-8
        "
            >

              <div className="flex justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Edit Draft
                </h2>

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="text-2xl"
                >
                  ✕
                </button>

              </div>
              <input
                type="text"
                value={editingDraft.aiTitle}
                onChange={(e) =>
                  setEditingDraft({
                    ...editingDraft,
                    aiTitle: e.target.value
                  })
                }
                className="
    w-full
    border
    rounded-xl
    p-3
    mb-4
  "
              />

              <textarea
                value={editingDraft.aiSummary}
                onChange={(e) =>
                  setEditingDraft({
                    ...editingDraft,
                    aiSummary: e.target.value
                  })
                }
                rows={3}
                className="
    w-full
    border
    rounded-xl
    p-3
    mb-4
  "
              />

              <textarea
                value={editingDraft.aiContent}
                onChange={(e) =>
                  setEditingDraft({
                    ...editingDraft,
                    aiContent: e.target.value
                  })
                }
                rows={12}
                className="
    w-full
    border
    rounded-xl
    p-3
    mb-4
  "
              />

              <input
                type="text"
                value={editingDraft.category}
                onChange={(e) =>
                  setEditingDraft({
                    ...editingDraft,
                    category: e.target.value
                  })
                }
                className="
    w-full
    border
    rounded-xl
    p-3
    mb-6
  "
              />
              <div className="flex justify-end gap-4">

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="
      px-5
      py-3
      rounded-xl
      bg-gray-200
    "
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateDraft}
                  className="
      px-5
      py-3
      rounded-xl
      bg-emerald-600
      text-white
    "
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        )
      }

      {
        showDraftModal && (

          <div
            className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        z-50
        flex
        items-center
        justify-center
        p-6
      "
          >

            <div
              className="
          bg-white
          rounded-3xl
          w-full
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          shadow-2xl
        "
            >

              <div
                className="
            flex
            justify-between
            items-center
            p-6
            border-b
          "
              >

                <h2
                  className="
              text-2xl
              font-bold
            "
                >
                  AI Draft Preview
                </h2>

                <button
                  onClick={() =>
                    setShowDraftModal(false)
                  }
                  className="
              text-2xl
            "
                >
                  ✕
                </button>

              </div>

              <div className="p-8">

                <h1
                  className="
              text-3xl
              font-bold
              mb-4
            "
                >
                  {formData.title}
                </h1>

                <span
                  className="
              bg-purple-100
              text-purple-700
              px-3
              py-1
              rounded-full
            "
                >
                  {formData.category}
                </span>

                <div
                  className="
              mt-6
              space-y-6
            "
                >

                  {
                    formData.content
                      ?.split("\n\n")
                      .map((para, index) => (

                        <p
                          key={index}
                          className="
                      text-lg
                      leading-8
                      text-justify
                    "
                        >
                          {para}
                        </p>

                      ))
                  }
                  <div
                    className="
    border-t
    p-6
    flex
    justify-end
    gap-4
  "
                  >

                    <button
                      onClick={() =>
                        setShowDraftModal(false)
                      }
                      className="
      px-5
      py-3
      rounded-xl
      bg-gray-200
      hover:bg-gray-300
      transition-all
    "
                    >
                      Close Preview
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="
      px-5
      py-3
      rounded-xl
      bg-emerald-600
      hover:bg-emerald-700
      text-white
      transition-all
    "
                    >
                      Save Draft
                    </button>

                  </div>


                </div>

              </div>

            </div>


          </div>

        )
      }

    </>

  );

}



export default EditorDashboard;