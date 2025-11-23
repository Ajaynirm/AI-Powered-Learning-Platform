import { useState } from "react";
import { useAuthStore } from "../store/AuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center   p-4">
      <div className="w-full max-w-md bg-white/90backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold ">
            Create Account
          </h1>
          <p className="">
            Get started with your free account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-300" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className={`w-full pl-10  pr-3 py-3 rounded-xl border ${
                errors.full_name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-neutral-600"
              }  focus:ring-1  outline-none transition`}
            />
            
          </div>
          {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          

          {/* Email */}
          <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                errors.email
                ? "border-red-500"
                : "border-gray-300 "
            }  focus:ring-1  outline-none transition`}
            />
            
          </div>
          {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          

          {/* Password */}
          <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-neutral-600"
            }  focus:ring-1  outline-none transition`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            
          </div>
          {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          

          {/* Confirm Password */}
          <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300 "
            }  focus:ring-1  outline-none transition`}
            />
            
          </div>
          {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
       
 

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold flex justify-center items-center gap-2 transition"
          >
            {isSigningUp ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center ">
          Already have an account?{" "}
          <button
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
