import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";

export default function LoginPage() {
  const { login, isLoggingIn } = useAuthStore();

  const [isOtpMode, setIsOtpMode] = useState(false);
  const [step, setStep] = useState("login"); // login | forgot | otpSent
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateLogin = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (!isOtpMode && step === "login") {
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    }

    if (isOtpMode && step === "otpSent") {
      if (!otp) newErrors.otp = "OTP is required";
      else if (!/^\d{6}$/.test(otp)) newErrors.otp = "OTP must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      // Add your login/signup/OTP logic here
      login({ email, password, otp });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center   p-4">
      <div className="w-full max-w-md p-8 rounded-2xl border  backdrop-blur-lg shadow-xl  dark:shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 ">
          {step === "forgot" ? "Reset Password" : isOtpMode ? "Login with OTP" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
          <div className="relative">
            
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                errors.full_name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-neutral-600"
              }  focus:ring-1  outline-none transition`}
            />
            
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          

          {/* Password */}
          {!isOtpMode && step === "login" && (
            <div>
              
              <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 " />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-neutral-600"
                  }  focus:ring-1  outline-none transition`}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-green-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          )}

          {/* OTP */}
          {isOtpMode && step === "otpSent" && (
            <div>
              <label className="text-gray-700 dark:text-gray-300 text-sm">Enter OTP</label>
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full p-3 mt-1 rounded-lg border bg-white dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition ${
                  errors.otp ? "border-red-500" : ""
                }`}
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition"
          >
            {step === "forgot" ? "Send Reset Link" : isOtpMode ? (step === "otpSent" ? "Verify OTP" : "Send OTP") : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm mt-4">
          {step === "login" && (
            <button onClick={() => setStep("forgot")} className="text-blue-600 dark:text-blue-400 hover:underline">
              Forgot Password?
            </button>
          )}
          {step === "forgot" && (
            <button onClick={() => setStep("login")} className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Login
            </button>
          )}
          {!isOtpMode && step === "login" && (
            <button onClick={() => setIsOtpMode(true)} className="text-green-600 dark:text-green-400 hover:underline">
              Login with OTP
            </button>
          )}
          {isOtpMode && (
            <button
              onClick={() => {
                setIsOtpMode(false);
                setStep("login");
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Use Password Instead
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center   ">
          Don't have an account?{" "}
          <button
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
