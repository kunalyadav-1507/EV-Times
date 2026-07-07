import { useState } from "react";
import {

  checkEmail,

  verifyOTP,

  resetPassword

} from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function ForgotPassword() {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);

const [otp, setOtp] = useState("");

const [showResetPassword, setShowResetPassword] = useState(false);

const [newPassword, setNewPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);


const handleCheckEmail = async () => {

  try {

    setLoading(true);

    const response = await checkEmail(email);

    console.log(response.data);

    toast.success("OTP sent successfully.");

    setShowOTP(true);

  }

  catch (error) {

    console.log(error);

    toast.error(

      error.response?.data?.message ||

      "Failed to send OTP."

    );

  }

  finally {

    setLoading(false);

  }

};
const handleVerifyOTP = async () => {

  try {

    setLoading(true);

    const response = await verifyOTP(

      email,

      otp

    );

    console.log(response.data);

    toast.success("OTP verified successfully.");

    setShowResetPassword(true);

  }

  catch (error) {

    console.log(error);

    toast.error(

      error.response?.data?.message ||

      "Invalid OTP."

    );

  }

  finally {

    setLoading(false);

  }

};
const handleResetPassword = async () => {

  if (newPassword !== confirmPassword) {

    toast.error("Passwords do not match.");

    return;

  }

  try {

    setLoading(true);

    const response = await resetPassword(

      email,

      newPassword

    );

    console.log(response.data);

    toast.success("Password updated successfully.");

    setTimeout(() => {

      navigate("/login");

    }, 1500);

  }

  catch (error) {

    console.log(error);

    toast.error(

      error.response?.data?.message ||

      "Failed to reset password."

    );

  }

  finally {

    setLoading(false);

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
  showOTP && !showResetPassword &&  (

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

{
showResetPassword && (

<div className="mt-6 space-y-4">

<input

type="password"

placeholder="New Password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

className="w-full border rounded-lg px-4 py-3 "

/>

<input

type="password"

placeholder="Confirm Password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

className="w-full border rounded-lg px-4 py-3 mb-4"

/>

</div>

)
}

        <button

  type="button"

  disabled={loading}

  onClick={() => {

    if (showResetPassword) {

      handleResetPassword();

    }

    else if (showOTP) {

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
    disabled:bg-green-400
    disabled:cursor-not-allowed
    transition
  "
>
 {
loading
?

showResetPassword
?

"Resetting..."

:

showOTP
?

"Verifying..."

:

"Sending OTP..."

:

showResetPassword
?

"Reset Password"

:

showOTP
?

"Verify OTP"

:

"Send OTP"
}
</button>

      </div>

    </div>

  );

}

export default ForgotPassword;