import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import states from "../data/states";

import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaBookmark,
  FaSignOutAlt,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
} from "react-icons/fa";






function Navbar() {

  const [search, setSearch] = useState("");

  const [showStates, setShowStates] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [hideSearchBar, setHideSearchBar] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

const role = localStorage.getItem("role");

const userName = localStorage.getItem("name");

const userEmail = localStorage.getItem("email");

const initials = userName
  ? userName
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  : "U";




  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("email");

  setShowProfile(false);

  navigate("/");
};
  const handleSearch = (e) => {

    if (e.key === "Enter") {

      if (search.trim() !== "") {

        navigate(

          `/search?q=${search}`

        );

      }

    }

  };

  const today = new Date();

  const formattedDate =
    today.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    useEffect(() => {

  const handleScroll = () => {

    if (window.innerWidth >= 768) return;

    if (window.scrollY > 60) {

      setHideSearchBar(true);

    } else {

      setHideSearchBar(false);

    }

  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);

}, []);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

        {/* TOP ROW */}

        <div
  className="
    px-3
lg:px-6
xl:px-8
py-3
lg:py-1.5
    flex
    items-center
    justify-between
  "
>

          {/* DATE + WEATHER */}

          <div
            className="
hidden
lg:block
absolute
left-6
xl:left-8
top-6
xl:top-7"
          >
            <p
              className="
  text-[10px]
sm:text-sm
lg:text-sm
xl:text-xl
  text-gray-600
  font-medium
"
            >
              {formattedDate}
            </p>

            <p
              className="
  text-[10px]
sm:text-sm
lg:text-sm
xl:text-xl
  text-gray-600
"
            >
              🌤 32°C | New Delhi
            </p>

          </div>

          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="
    lg:hidden
    text-2xl
  "
          >

            {
              mobileMenuOpen
                ? <FaTimes />
                : <FaBars />
            }

          </button>

          {/* LOGO + TITLE */}

          <div className="flex items-center justify-center gap-2 flex-1 lg:gap-4 lg:w-full">

            <img
              src="/logo.png.png"
              alt="EV Times"
              className="
w-8
h-8
sm:w-10
sm:h-10
lg:w-10
lg:h-14
xl:w-14
xl:h-20
object-contain
"
            />

            <div>

              <h1 className="text-lg
sm:text-xl
lg:text-xl
xl:text-3xl font-serif font-bold tracking-wide text-green-900">

                EV TIMES

              </h1>

              <p className="
  hidden
  lg:block
  text-sm
xl:text-base
  text-black-900
  tracking-wider
">

                Electric Vehicle News & Insights

              </p>

            </div>

          </div>


          {/* LOGIN AREA */}

          <div
            className="
    flex
    items-center
    gap-2
    shrink-0
  "
          >

            {!token ? (

              <>

                {/* Desktop */}

                <Link
                  to="/login"
                  className="
        hidden
        lg:flex
        items-center
        gap-2
        text-lg
xl:text-xl
        font-semibold
        hover:text-blue-600
        transition
      "
                >

                  <FaUserCircle className="text-xl" />

                  LOGIN

                </Link>

                {/* Mobile Login */}

                <Link
                  to="/login"
                  className="
    md:hidden
    text-xl
    hover:text-blue-600
    transition
  "
                >

                  <FaUserCircle />

                </Link>

                {/* Tablet Search */}

                <button
                  onClick={() => navigate("/search")}
                  className="
    hidden
    md:block
    lg:hidden
    text-base
xl:text-xl
    hover:text-green-700
    transition
  "
                >

                  <FaSearch />

                </button>

                {/* Tablet Login */}

                <Link
                  to="/login"
                  className="
    hidden
    md:block
    lg:hidden
    text-xl
    hover:text-blue-600
    transition
  "
                >

                  <FaUserCircle />

                </Link>

              </>

) : (
  <div className="relative">

    {/* PROFILE ICON */}

    <button
      onClick={() => setShowProfile(!showProfile)}
      className="
        w-8
        h-8
        xl:w-14
        xl:h-14
        rounded-full
        bg-gradient-to-br
        from-cyan-700
        to-teal-800
        text-white
        flex
        items-center
        justify-center
        text-lg
        xl:text-xl
        font-semibold
        shadow-md
        hover:scale-105
        transition
      "
    >
      {initials}
    </button>

    {/* PROFILE DROPDOWN */}

    {showProfile && (

      <div
        className="
          absolute
          right-0
          top-full
          mt-3
          w-[360px]
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-gray-200
          overflow-hidden
          z-[9999]
        "
      >

        {/* USER INFO */}

        <div className="flex items-center gap-5 px-7 py-7">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-gradient-to-br
              from-green-700
              to-teal-800
              text-white
              flex
              items-center
              justify-center
              text-3xl
              font-medium
              shrink-0
            "
          >
            {initials}
          </div>

          <div className="min-w-0">

            <h3 className="text-xl font-semibold text-black">
              {userName}
            </h3>

            <p className="text-gray-600 mt-1 truncate">
              {userEmail}
            </p>

          </div>

        </div>

        {/* ACCOUNT OPTIONS */}

        <div className="border-t border-gray-200 py-3">

          <Link
            to="/saved-news"
            onClick={() => setShowProfile(false)}
            className="
              flex
              items-center
              gap-6
              px-7
              py-4
              text-lg
              hover:bg-gray-100
              transition
            "
          >
            <FaBookmark className="text-2xl text-gray-600" />

            Saved News
          </Link>

          {(role === "admin" || role === "editor") && (

            <Link
              to={
                role === "admin"
                  ? "/admin-dashboard"
                  : "/editor-dashboard"
              }
              onClick={() => setShowProfile(false)}
              className="
                flex
                items-center
                gap-6
                px-7
                py-4
                text-lg
                hover:bg-gray-100
                transition
              "
            >
              <FaTachometerAlt className="text-2xl text-gray-600" />

              Dashboard
            </Link>

          )}

          <button
            onClick={() => {
              handleLogout();
              setShowProfile(false);
            }}
            className="
              w-full
              flex
              items-center
              gap-6
              px-7
              py-4
              text-lg
              hover:bg-gray-100
              transition
            "
          >
            <FaSignOutAlt className="text-2xl text-gray-600" />

            Sign out
          </button>

        </div>

        {/* OTHER OPTIONS */}

        <div className="border-t border-gray-200 py-3">

          <Link
            to="/about"
            onClick={() => setShowProfile(false)}
            className="
              flex
              items-center
              gap-6
              px-7
              py-4
              text-lg
              hover:bg-gray-100
              transition
            "
          >
            <FaInfoCircle className="text-2xl text-gray-600" />

            About Us
          </Link>

          <Link
            to="/contact"
            onClick={() => setShowProfile(false)}
            className="
              flex
              items-center
              gap-6
              px-7
              py-4
              text-lg
              hover:bg-gray-100
              transition
            "
          >
            <FaEnvelope className="text-2xl text-gray-600" />

            Contact Us
          </Link>

        </div>

      </div>

    )}

  </div>
)}

          </div>

        </div>

        {/* BOTTOM ROW */}

        <div className="border-t border-gray-100">

          {/* MOBILE SEARCH */}

          <div
  className={`
    md:hidden
    px-4
    overflow-hidden
    transition-all
    duration-300
    ${
      hideSearchBar
        ? "max-h-0 py-0 opacity-0"
        : "max-h-24 py-3 opacity-100"
    }
  `}
>

            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleSearch}
              className="
        w-full
        border
        border-gray-300
        px-4
        py-3
        rounded-full
        outline-none
      "
            />

          </div>

          {/* MOBILE & TABLET NAVIGATION */}

          <div
            className="
    lg:hidden
    relative
    z-40
    flex
    items-center
    justify-center
    gap-5
    md:gap-8
    px-4
    py-3
    text-sm
    md:text-base
    font-semibold
    text-gray-700
"
          >
            <Link
              to="/"
              className="hover:text-black transition"
            >
              Home
            </Link>

            <Link
              to="/ev-news"
              className="hover:text-black transition"
            >
              EV News
            </Link>

            <Link
              to="/bms"
              className="hover:text-black transition"
            >
              BMS
            </Link>

            <div className="relative">

              <button
                onClick={() => {

                  setShowStates(!showStates);

                  setShowMore(false);

                }}
                className="hover:text-black transition"
              >

                States ▾

              </button>

              {

                showStates && (

                  <div
                    className="
  absolute
  top-full
  left-1/2
  -translate-x-1/2
  mt-2
  bg-white
  w-40
  md:w-48
  max-h-64
  overflow-y-auto
  rounded-xl
  shadow-xl
  border
  border-gray-200
  z-[999]
"
                  >

                    {

                      states.map((state, index) => (

                        <div

                          key={index}

                          onClick={() => {

                            navigate(`/state/${state}`);

                            setShowStates(false);

                          }}

                          className="
                px-3
py-2
text-sm
                hover:bg-gray-100
                cursor-pointer
                border-b
                last:border-b-0
              "
                        >

                          {state}

                        </div>

                      ))

                    }

                  </div>

                )

              }

            </div>

            {/* Hide International only on Mobile */}

            <Link
              to="/international"
              className="
      hidden
      md:block
      hover:text-black
      transition
    "
            >
              International
            </Link>

            <div className="relative">

              <button
                onClick={() => {

                  setShowMore(!showMore);

                  setShowStates(false);

                }}
                className="hover:text-black transition"
              >

                More ▾

              </button>

              {

                showMore && (

                  <div
                    className="
          absolute
          top-full
          right-0
          mt-2
          bg-white
          w-52
          rounded-xl
          shadow-xl
          border
          border-gray-200
          z-50
        "
                  >

                    <Link
                      to="/featured"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowMore(false)}
                    >
                      Featured News
                    </Link>

                    <Link
                      to="/trending-news"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowMore(false)}
                    >
                      Trending News
                    </Link>

                    <Link
                      to="/editor-picks"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowMore(false)}
                    >
                      Editor News
                    </Link>

                    <Link
                      to="/saved-news"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowMore(false)}
                    >
                      Saved News
                    </Link>

                  </div>

                )

              }

            </div>

          </div>

          <div className="px-6 xl:px-8 py-1.5 lg:py-1.5 grid grid-cols-3 items-center">


            {/* NAV LINKS */}



            <div
              className="
    hidden
    lg:flex
    absolute
    left-1/2
    -translate-x-1/2
    items-center
    gap-4
xl:gap-8
text-[15px]
xl:text-xl
    font-semibold
    text-gray-600
  "
            >

              <Link
                to="/"
                className="hover:text-black transition"
              >
                Home
              </Link>

              <Link
                to="/ev-news"
                className="hover:text-black transition"
              >
                EV News
              </Link>

              <Link
                to="/bms"
                className="hover:text-black transition"
              >
                BMS
              </Link>

              {/* STATES */}

              <div className="relative">

                <div
                  className="relative"
                  onMouseEnter={() => setShowStates(true)}
                  onMouseLeave={() => setShowStates(false)}
                >

                  <button className="hover:text-black transition">

                    States ▾

                  </button>

                  {showStates && (

                    <div
                      className="
        absolute
        top-full
        left-0
        bg-white
        w-72
        max-h-[500px]
        overflow-y-auto
        rounded-xl
        shadow-2xl
        border
        border-gray-200
        z-50
      "
                    >

                      {states.map((state, index) => (

                        <div
                          key={index}
                          onClick={() =>
                            navigate(`/state/${state}`)
                          }
                          className="
            px-4
            py-3
            hover:bg-gray-100
            cursor-pointer
            border-b
            last:border-b-0
          "
                        >
                          {state}
                        </div>

                      ))}

                    </div>

                  )}

                </div>

              </div>

              <Link
                to="/international"
                className="hover:text-black transition"
              >
                International
              </Link>

              {/* MORE */}

              <div className="relative">

                <div
                  className="relative"
                  onMouseEnter={() => setShowMore(true)}
                  onMouseLeave={() => setShowMore(false)}
                >

                  <button className="hover:text-black transition">

                    More ▾

                  </button>

                  {showMore && (

                    <div
                      className="
        absolute
        top-full
        left-0
        bg-white
        w-60
        rounded-xl
        shadow-2xl
        border
        border-gray-200
        z-50
      "
                    >

                      <Link
                        to="/featured"
                        className="block p-3 hover:bg-gray-100"
                      >
                        Featured News
                      </Link>

                      <Link
                        to="/trending-news"
                        className="block p-3 hover:bg-gray-100"
                      >
                        Trending News
                      </Link>

                      <Link
                        to="/editor-picks"
                        className="block p-3 hover:bg-gray-100"
                      >
                        Editor News
                      </Link>
                      <Link
                        to="/saved-news"
                        className="block p-3 hover:bg-gray-100"
                      >
                        Saved News
                      </Link>



                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* SEARCH */}

            {/* Desktop Search */}

            <div className="hidden lg:block">

              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={handleSearch}
                className="
      border
      border-gray-300
      px-4
      py-1.5
      rounded-full
      w-36
lg:w-40
xl:w-56
text-sm
xl:text-base
      outline-none
      focus:ring-2
      focus:ring-gray-400
    "
              />

            </div>

          </div>

        </div>



      </nav>
      {
        mobileMenuOpen && (

          <div
            className="
        fixed
        inset-0
        bg-black/40
        z-[9998]
        lg:hidden
      "
            onClick={() => setMobileMenuOpen(false)}
          >

            <div
              className="
          h-full
          w-full
          md:w-[420px]
          bg-white
          overflow-y-auto
          shadow-2xl
        "
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}

              <div
                className="
          flex
          items-center
          justify-between
          px-5
          py-5
          border-b
        "
              >

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl"
                >
                  <FaTimes />
                </button>

                <div className="flex items-center gap-2">

                  <img
                    src="/logo.png.png"
                    alt="EV Times"
                    className="w-8 h-8"
                  />

                  <h1
                    className="
              text-2xl
              font-bold
              text-green-900
              font-serif
            "
                  >
                    EV TIMES
                  </h1>

                </div>

                <div className="w-6"></div>

              </div>

              {/* MENU */}

              <div className="px-6 py-4 flex flex-col">

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 border-b border-gray-300"
                >
                  🏠 Home
                </Link>

                <Link
                  to="/ev-news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 border-b border-gray-300"
                >
                  ⚡ EV News
                </Link>

                <Link
                  to="/bms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 border-b border-gray-300"
                >
                  🔋 BMS
                </Link>

                {/* STATES */}

                <div className="border-b border-gray-300">

                  <button
                    onClick={() => setShowStates(!showStates)}
                    className="
              w-full
              flex
              justify-between
              items-center
              py-4
            "
                  >

                    <span>📍 States</span>

                    <span>

                      {

                        showStates

                          ? "▾"

                          : "▸"

                      }

                    </span>

                  </button>

                  {

                    showStates && (

                      <div
                        className="
                  max-h-60
                  overflow-y-auto
                  pb-2
                "
                      >

                        {

                          states.map((state, index) => (

                            <button

                              key={index}

                              onClick={() => {
                                navigate(`/state/${state}`);
                                setMobileMenuOpen(false);
                                setShowStates(false);
                              }}

                              className="
                        block
                        w-full
                        text-left
                        pl-6
                        py-2
                        hover:bg-gray-100
                      "

                            >

                              {state}

                            </button>

                          ))

                        }

                      </div>

                    )

                  }

                </div>

                <Link
                  to="/international"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 border-b border-gray-300"
                >
                  🌍 International
                </Link>

                {/* MORE */}

                <div className="border-b border-gray-300">

                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="
              w-full
              flex
              justify-between
              items-center
              py-4
            "
                  >

                    <span>☰ More</span>

                    <span>

                      {

                        showMore

                          ? "▾"

                          : "▸"

                      }

                    </span>

                  </button>

                  {

                    showMore && (

                      <div>

                        <Link
                          to="/featured"
                          className="block pl-6 py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Featured News
                        </Link>

                        <Link
                          to="/trending-news"
                          className="block pl-6 py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Trending News
                        </Link>

                        <Link
                          to="/editor-picks"
                          className="block pl-6 py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Editor Picks
                        </Link>

                        <Link
                          to="/saved-news"
                          className="block pl-6 py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Saved News
                        </Link>

                      </div>

                    )

                  }

                </div>

                <Link
                  to="/about"
                  className="py-4 border-b border-gray-300 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ℹ️ About Us
                </Link>

                <Link
                  to="/contact"
                  className="py-4 border-b border-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📞 Contact Us
                </Link>

                <Link
                  to="/saved-news"
                  className="py-4 border-b border-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🔖 Saved News
                </Link>

                <Link
                  to="/privacy-policy"
                  className="py-4 border-b border-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🛡 Privacy Policy
                </Link>

                <Link
                  to="/terms"
                  className="py-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📄 Terms & Conditions
                </Link>

              </div>

              {/* FOOTER */}

              {/* FOOTER */}

<div
  className="
    border-t
    border-gray-100
    px-6
    py-5
    mt-4
  "
>

  <p className="text-gray-600">

    🌤 32°C | New Delhi

  </p>

  <p className="text-sm text-gray-500 mt-1">

    {formattedDate}

  </p>

  {

    !token ? (

      <Link
        to="/login"
        onClick={() => setMobileMenuOpen(false)}
        className="
          mt-5
          w-full
          bg-green-100
          text-green-800
          font-semibold
          py-3
          rounded-xl
          flex
          justify-center
          items-center
          gap-2
        "
      >

        <FaUserCircle />

        LOGIN

      </Link>

    ) : (

      <div className="mt-5 flex flex-col gap-3">

        {(role === "admin" || role === "editor") && (

          <Link
            to={
              role === "admin"
                ? "/admin-dashboard"
                : "/editor-dashboard"
            }
            onClick={() => setMobileMenuOpen(false)}
            className="
              w-full
              bg-green-100
              text-green-800
              font-semibold
              py-3
              rounded-xl
              text-center
            "
          >

            Dashboard

          </Link>

        )}

        <button
          onClick={() => {

            handleLogout();

            setMobileMenuOpen(false);

          }}
          className="
            w-full
            bg-red-100
            text-red-700
            font-semibold
            py-3
            rounded-xl
          "
        >

          Logout

        </button>

      </div>

    )

  }

</div>

            </div>
          </div>

        )
      }
    </>
  );
}


export default Navbar;