import { useAuthStore } from "../store/AuthStore.js";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/auth/Logout.jsx";

export default function Profile() {
   
    const navigate = useNavigate();
    const { authUser,logout } = useAuthStore();
    if(!authUser){
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 p-4">
      <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-md shadow-xl rounded-2xl p-8 sm:p-12 max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Login to access your Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          You need to be signed in to view your personalized dashboard, track progress, and manage your account.
        </p>

        <button
          onClick={() => navigate("/auth/sign-up")}
          className="w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all text-sm sm:text-base"
        >
          Go to Login / Sign Up
        </button>
      </div>
    </div>
      );
    }else{
      return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
          
          {/* Profile Card */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center flex flex-col items-center gap-4">
            <img
              src={authUser.avatar || "https://ui-avatars.com/api/?name=" + authUser.full_name}
              alt={authUser.full_name}
              className="w-28 h-28 rounded-full shadow-md border-2 border-gray-300 dark:border-gray-700"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {authUser.full_name.toUpperCase()}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{authUser.email}</p>
          </div>
    
          <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
  {/* Edit Profile */}
  <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-md">
    Edit Profile
  </button>

  {/* Logout */}
  <LogoutButton className="flex-1 w-full py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md transition-transform" />
</div>

        </div>
      );
    }
   
  }
  
