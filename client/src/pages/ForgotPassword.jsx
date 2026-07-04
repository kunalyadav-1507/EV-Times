import { useState } from "react";
import {
  checkEmail,
  verifyOTP
}
from "../services/authService";
function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);

const [otp, setOtp] = useState("");
  const handleCheckEmail = async () => {

  try {

    const response =
      await checkEmail(email);

    console.log(response.data);
    setShowOTP(true);

  }

  catch (error) {

    console.log(error);

  }

};
const handleVerifyOTP = async () => {

  try {

    const response = await verifyOTP(

      email,

      otp

    );

    console.log(response.data);

  }

  catch (error) {

    console.log(error);

  }

};

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mt-3 mb-8">

          Enter your registered email address.

        </p>
        

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
        {
  showOTP && (

    <div className="mt-2 mb-4">

      <label className="block mb-2 text-gray-700">

        Enter OTP

      </label>

      <input

        type="text"

        maxLength={6}

        value={otp}

        onChange={(e)=>setOtp(e.target.value)}

        placeholder="Enter 6-digit OTP"

        className="
        w-full
        border
        rounded-lg
        px-4
        py-3
        focus:ring-2
        focus:ring-green-500
        "

      />

    </div>

  )
}

        <button
  type="button"
  onClick={() => {

  if (showOTP) {

    handleVerifyOTP();

  }

  else {

    handleCheckEmail();

  }

}}
  className="
    w-full
    bg-green-600
    text-white
    py-3
    rounded-lg
    hover:bg-green-700
  "
>
  {
  showOTP
    ? "Verify OTP"
    : "Send OTP"
}
</button>

      </div>

    </div>

  );

}

export default ForgotPassword;