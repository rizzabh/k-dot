import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [kat, setKat] = useState(false);
  const [rat, setRat] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [allow, setAllow] = useState(false);
  const knum = import.meta.env.VITE_KNUM;
  const rnum = import.meta.env.VITE_RNUM;
  const handleKat = () => {
    setKat(true);
    setRat(false);
    setPhone(knum);
    setRole("k");
  };

  const handleRat = () => {
    setKat(false);
    setRat(true);
    setPhone(rnum);
    setRole("r");
  };

  const sendOtp = async () => {
    try {
      setDisabled(true);

      const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );
      const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      });
      const phoneNumber = "+" + phone;

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmation);
      toast(`OTP sent to ${phoneNumber.endsWith("21") ? "R's" : "K's"} number`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP. Please try again later.");
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      toast.success("OTP verified successfully");
      localStorage.setItem("user", JSON.stringify({ kat, rat }));
      navigate("/chat");
      setLoading(false);
      setUser(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      sendOtp();
      setResendTimer(30);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === import.meta.env.VITE_PASSWORD) {
      setAllow(true);
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <div>
      <div className="login"></div>
      <h1 className="text-4xl font-bold">K-chat</h1>
      <ToastContainer />
      <p className="text-gray-500">Visible to mau's eyes only</p>
      <div id="recaptcha-container"></div>
      {!allow && (
        <div className="mt-20">
          <div>Type our password below</div>
          <form action="" onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-md px-3 py-2 mt-2"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {!kat && !rat && allow && (
        <div className="border border-gray-700 p-8 rounded-md w-80 h-fit mx-auto m-10 bg-gray-600/10">
          <h1 className="text-3xl font-semibold mb-4">Login</h1>
          <div
            onClick={handleKat}
            className="cursor-pointer flex justify-center items-center px-4 py-3 mb-4 text-pink-400 border bg-pink-950/30 hover:bg-pink-300 hover:text-pink-900 border-pink-600/20 my-2 rounded-md"
          >
            Login as K <IoIosArrowForward className="ml-3" />
          </div>
          <div
            onClick={handleRat}
            className="cursor-pointer px-4 py-3 flex justify-center items-center border text-green-400 bg-green-950/30 hover:bg-green-300 hover:text-green-900  border-green-600/20 my-2 rounded-md"
          >
            Login as R <IoIosArrowForward className="ml-3" />
          </div>
        </div>
      )}
      {(kat || rat) && (
        <div className="border border-gray-700 p-8 rounded-md w-fit h-fit mx-auto mt-10 bg-gray-600/10 max-sm:p-4">
          <h1 className="text-2xl font-bold">OTP Verification</h1>
          <div className="text-sm text-gray-500 mb-6">
            An OTP will be sent to {kat ? "K's" : "R's"} Number{" "}
            {kat ? "+91 *******608" : "+91 *******521"}
            <br />
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(value) => setPhone(value)}
              className="my-4 hidden"
            />
            <button
              className={`w-full border border-gray-800 hover:bg-white hover:text-black gap-3 text-white flex items-center justify-center rounded-md py-2 mt-4 ${
                disabled && "hidden"
              }`}
              onClick={sendOtp}
            >
              Send OTP
            </button>
            {resendTimer > 0 && (
              <p className="text-gray-500 text-xs mt-2">
                Resend OTP in {resendTimer} seconds
              </p>
            )}
            {resendTimer === 0 && (
              <p
                onClick={handleResendOtp}
                className="cursor-pointer text-blue-500 text-xs mt-2"
              >
                Resend OTP
              </p>
            )}
          </div>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "40px",
              height: "60px",
              fontSize: "24px",
              marginRight: "10px",
              textAlign: "center",
              borderRadius: "5px",
              backgroundColor: "#0A0A1B",
              border: "1px solid #545454",
              outline: "none",
            }}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 gap-3 text-white flex items-center justify-center rounded-md py-2 mt-4"
            onClick={verifyOtp}
            disabled={loading}
          >
            <CgSpinner className={loading ? "animate-spin" : "hidden"} /> Verify
            OTP
          </button>
          <p
            onClick={() => {
              setRat(false);
              setKat(false);
              setPhone("");
              setLoading(false);
            }}
            className="cursor-pointer mt-4 text-blue-500 text-xs"
          >
            Back
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
