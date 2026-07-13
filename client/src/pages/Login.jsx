import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { loginUser } from "../services/authService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log(response.data);




      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );


      // SAVE ROLE
      localStorage.setItem(
        "role",
        response.data.role
      );

      // SAVE USER NAME
localStorage.setItem(
  "name",
  response.data.name
);

// SAVE USER EMAIL
localStorage.setItem(
  "email",
  response.data.email
);
      toast.success("Login Successful");
      setLoading(false);


      // ROLE-BASED REDIRECT

      if (response.data.role === "admin") {

        navigate("/admin-dashboard");

      }

      else if (
        response.data.role === "editor"
      ) {

        navigate("/editor-dashboard");

      }

      else {

        navigate("/");

      }

    } catch (error) {

      console.log(error);

      toast.error("Invalid Email or Password");


      // CLEAR INPUTS
      setFormData({

        email: "",

        password: ""

      });
      setLoading(false);

    }

  };


  return (

    <>


      <div
        className="relative min-h-screen flex items-center justify-center bg-cover
bg-center
bg-no-repeat"
        style={{
          backgroundImage: "url('backgroundImage.png')",
        }}
      >
        {/* Dark Overlay */}
        <div
  className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/55 to-black/75"
></div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">

  <div
    className="
      relative
      mx-auto
      w-full
      max-w-[900px]
      xl:max-w-[950px]
      min-h-[560px]
      rounded-[30px]
      overflow-hidden
      shadow-2xl
      flex
      flex-col
      md:flex-row
    "
  >

            {/* LEFT SIDE */}
            <div
  className="
login-left
relative
w-full
md:w-[46%]
lg:w-[45%]
bg-white
px-6
sm:px-8
md:pr-14
lg:px-14
py-8
sm:py-10
lg:py-14
flex
z-10
"
>

              <form
  onSubmit={handleSubmit}
  className="
    h-full
    w-full
    max-w-[340px]
    mx-auto
    flex
    flex-col
    justify-center
  "
>

                {/* Heading */}
                <div className="text-center md:text-left">

  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
    Login
  </h1>

  <div className="w-14 h-1 bg-green-600 rounded-full mt-3 mb-12 mx-auto md:mx-0"></div>

</div>

                {/* Email */}

                <div className="mb-6">

                  <label className="text-sm text-gray-700 block mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>

                {/* Password */}

                <div className="mb-4">

                  <label className="text-sm text-gray-700 block mb-2">
                    Password
                  </label>

                  <div className="relative">

  <input
  type="password"
  name="password"
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  required
  autoComplete="current-password"
  className="
    w-full
    border
    border-gray-300
    rounded-lg
    px-4
    py-3
    focus:outline-none
    focus:ring-2
    focus:ring-green-500
  "
/>



</div>

                </div>

                {/* Remember + Forgot */}

                <div className="
flex
justify-between
items-center
mb-8
text-xs
sm:text-sm
">



                  <button
type="button"
onClick={() => navigate("/forgot-password")}
className="
text-green-600
text-xs
sm:text-sm
hover:underline
whitespace-nowrap
">

Forgot Password?

</button>

                </div>

                {/* Login */}

                <button
  type="submit"
  disabled={loading}
  className="
    w-full
    bg-green-600
    hover:bg-green-700
    disabled:bg-green-400
    disabled:cursor-not-allowed
    text-white
    font-semibold
    py-3
    rounded-lg
    transition-all
  "
>
  {loading ? "Logging in..." : "Login"}
</button>

                {/* Signup */}

<p className="text-center text-gray-500 mt-8 text-sm leading-6">

  Need an account?

  <Link
    to="/contact"
    className="text-green-600 font-semibold hover:underline ml-1"
  >
    Contact Administrator
  </Link>

</p>
              </form>

            </div>

            {/* RIGHT SIDE */}
            <div className="
hidden
md:block
relative
md:w-[54%]
lg:w-[55%]
bg-[#0B1118]
md:-ml-20
lg:-ml-24
">




              <div className="flex flex-col justify-center h-full pl-16
lg:pl-28
pr-8
lg:pr-20 text-white">


                <h2 className="text-4xl
lg:text-5xl font-bold leading-tight">
                  WELCOME
                  <br />
                  <span className="text-green-500">
                    BACK!
                  </span>
                </h2>

                <div className="w-14 h-1 bg-green-600 rounded-full mt-5 mb-8"></div>

                <p className="text-gray-300 leading-8 text-base
lg:text-lg">
                  Stay updated with the latest
                  electric vehicle news, trends,
                  and innovations from around
                  the world.
                </p>

                {/* Illustration */}
                <div className="relative mt-20 h-40 opacity-90">

  <img
    src="newspaper.png"
    alt=""
    className="
      absolute
      left-0
      bottom-0
      w-44
lg:w-64
      opacity-30
      select-none
      pointer-events-none
      drop-shadow-[0_0_10px_rgba(34,197,94,.35)]
    "
  />

  <img
    src="globe.png"
    alt=""
    className="
      absolute
      left-50
      bottom-2
      w-36
lg:w-52
      opacity-25
      select-none
      pointer-events-none
      drop-shadow-[0_0_8px_rgba(34,197,94,.35)]
    "
  />

</div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>

  );

}




export default Login;