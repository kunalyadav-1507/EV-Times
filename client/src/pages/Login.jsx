import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { loginUser } from "../services/authService";
import toast from "react-hot-toast";


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
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('backgroundImage.png')",
        }}
      >
        {/* Dark Overlay */}
        <div
  className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/55 to-black/75"
></div>

        {/* Content */}
        <div className="relative z-10">

          <div className="relative w-[1000px] h-[620px] rounded-[30px] overflow-hidden shadow-2xl flex">

            {/* LEFT SIDE */}
            <div
              className="relative w-[47%] bg-white px-16 py-14 flex z-10"
              style={{
                clipPath: "polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%)",
              }}
            >

              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">

                {/* Heading */}
                <h1 className="text-5xl font-bold text-gray-900">
                  Login
                </h1>

                <div className="w-14 h-1 bg-green-600 rounded-full mt-3 mb-12"></div>

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

                <div className="flex justify-between items-center mb-8">

                  <label className="flex items-center gap-2 text-sm text-gray-600">

                    <input type="checkbox" />

                    Remember Me

                  </label>

                  <button
type="button"
onClick={() => navigate("/forgot-password")}
className="
text-green-600
text-sm
hover:underline
"
>

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

                <p className="text-center text-gray-500 mt-8">

                  Don't have an account?

                  <span className="text-green-600 font-semibold cursor-pointer ml-2">

                    Sign Up

                  </span>

                </p>

              </form>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative w-[53%] bg-[#0B1118] -ml-24">




              <div className="flex flex-col justify-center h-full pl-28 pr-20 text-white">


                <h2 className="text-5xl font-bold leading-tight">
                  WELCOME
                  <br />
                  <span className="text-green-500">
                    BACK!
                  </span>
                </h2>

                <div className="w-14 h-1 bg-green-600 rounded-full mt-5 mb-8"></div>

                <p className="text-gray-300 leading-8 text-lg">
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
      w-70
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
      w-60
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