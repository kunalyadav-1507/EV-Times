import { useState } from "react";
import {

  checkEmail,

  verifyOTP,

  resetPassword

} from "../services/authService";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);

const [otp, setOtp] = useState("");

const [showResetPassword, setShowResetPassword] = useState(false);

const [newPassword, setNewPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");
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

    setShowResetPassword(true);

  }

  catch (error) {

    console.log(error);

  }

};

const handleResetPassword = async () => {

  if (newPassword !== confirmPassword) {

    alert("Passwords do not match");

    return;

  }

  try {

    const response =
      await resetPassword(
        email,
        newPassword
      );

    console.log(response.data);

    alert("Password Updated Successfully");

    navigate("/login");

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
  "
>
  {
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