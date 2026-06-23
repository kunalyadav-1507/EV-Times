import { useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import states from "../data/states";

import { FaUserCircle } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";






function Navbar() {

  const [search, setSearch] = useState("");

  const [showStates, setShowStates] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");




  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

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

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

      {/* TOP ROW */}

      <div className="px-8 py-4 flex items-center justify-between">

        {/* DATE + WEATHER */}

        <div
          className="
    hidden
    lg:block
    absolute
    left-8
    top-9
  "
        >

          <p
            className="
      text-xl
      text-gray-600
      font-medium
    "
          >
            {formattedDate}
          </p>

          <p
            className="
      text-xl
      text-gray-600
      
    "
          >
            🌤 32°C | New Delhi
          </p>

        </div>

        {/* LOGO + TITLE */}

        <div className="flex items-center justify-center gap-4 w-full">

          <img
            src="/logo.png.png"
            alt="EV Times"
            className="  w-16
  h-16
  lg:w-35
  lg:h-24
 object-contain "
          />

          <div>

            <h1 className="text-2xl
  lg:text-4xl font-serif font-bold tracking-wide text-green-900">

              EV TIMES

            </h1>

            <p className="
  hidden
  lg:block
  text-medium
  text-black-900
  tracking-wider
">

              Electric Vehicle News & Insights

            </p>

          </div>

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

        {/* LOGIN AREA */}

        <div>

          {!token ? (

            <Link
              to="/login"
              className="flex items-center gap-2 text-xl font-semibold hover:text-blue-600 transition"
            >

              <FaUserCircle className="text-xl" />

              LOGIN

            </Link>

          ) : (

            <div className="hidden lg:flex items-center gap-5">

              {(role === "admin" || role === "editor") && (

                <Link
                  to={
                    role === "admin"
                      ? "/admin-dashboard"
                      : "/editor-dashboard"
                  }
                  className="text-xl font-semibold hover:text-blue-600 transition"
                >

                  Dashboard

                </Link>

              )}

              <button
                onClick={handleLogout}
                className=" text-xl font-semibold hover:text-red-500 transition"
              >

                Logout

              </button>


            </div>

          )}

        </div>

      </div>

      {/* BOTTOM ROW */}

      <div className="border-t border-gray-100">

        {/* MOBILE SEARCH */}

        <div className="lg:hidden px-4 py-3">

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

        <div className="px-8 py-3 grid grid-cols-3 items-center">


          {/* NAV LINKS */}

          <div
            className="
    hidden
    lg:flex
    absolute
    left-1/2
    -translate-x-1/2
    items-center
    gap-10
    text-2xl
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
      py-2
      rounded-full
      w-64
      text-lg
      outline-none
      focus:ring-2
      focus:ring-gray-400
    "
            />

          </div>

        </div>

      </div>

      {
        mobileMenuOpen && (

          <div
            className="
        lg:hidden
        bg-white
        border-t
        border-gray-200
        px-6
        py-4
      "
          >

            <div className="flex flex-col gap-4 text-lg font-medium">

              <Link to="/"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Home
              </Link>

              <Link to="/ev-news"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                EV News
              </Link>

              <Link to="/bms"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                BMS
              </Link>

              <div className="border-t pt-3">

                <p className="font-semibold text-gray-700 mb-2">
                  States
                </p>

                <div className="flex flex-col gap-2 pl-2">

                  {states.map((state, index) => (

                    <button
                      key={index}
                      onClick={() => {
                        navigate(`/state/${state}`);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-600"
                    >
                      {state}
                    </button>

                  ))}

                </div>

              </div>

              <Link to="/international"
                onClick={() =>
                  setMobileMenuOpen(false)
                }>
                International
              </Link>

              <Link to="/trending-news"
                onClick={() =>
                  setMobileMenuOpen(false)
                }>
                Trending News
              </Link>

              <Link to="/saved-news"
                onClick={() =>
                  setMobileMenuOpen(false)
                }>
                Saved News
              </Link>

              {
                role === "admin" && (

                  <Link to="/admin-dashboard"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Dashboard
                  </Link>

                )
              }

              {
                role === "editor" && (

                  <Link to="/editor-dashboard"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Dashboard
                  </Link>

                )
              }

              {
                token && (

                  <button
                    onClick={handleLogout}
                    className="text-left"
                  >
                    Logout
                  </button>

                )
              }

            </div>

          </div>

        )
      }

    </nav>
  );
}


export default Navbar;