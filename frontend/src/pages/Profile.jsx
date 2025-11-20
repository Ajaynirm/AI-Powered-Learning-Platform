import { useAuthStore } from "../store/AuthStore.js";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/auth/Logout.jsx";

export default function Profile() {
   
    const navigate = useNavigate();
    const { authUser,logout } = useAuthStore();
    if(!authUser){
      return (
        <div className="flex flex-col">
                 <div className="flex flex-row justify-center p-10 m-5 font-extrabold font-stretch-90% btn h-10"
                  
                 >Login to see profile</div>
                 <button
                 className="flex flex-row justify-center p-10 m-10 "
                 onClick={() => navigate("/auth/sign-in")}
                 >
                    Go to Login
                 </button>
               </div>
      );
    }else{
      return (
        <div className=" min-h-screen p-6">
          {/* Profile Header */}
          
          <div className=" p-6 rounded-lg shadow-lg max-w-3xl mx-auto text-center">
            <img
              src={authUser.full_name}
              alt={authUser.full_name.toUpperCase().substring(0,2)}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h1 className="text-2xl font-bold mt-4">{authUser.full_name.toUpperCase()} </h1>
            <p className="">{authUser.email}</p>
          </div>
    
         
    
          {/* Settings & Logout */}
          <div className="max-w-3xl mx-auto mt-6  p-6 rounded-lg shadow-lg text-center flex flex-row justify-around">
            <div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
              Edit Profile
              <div className="hidden">
            {/* <UserButton /> */}
            </div>
  
            </button>
            </div>
            
            <div className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
                >
               <LogoutButton />
            </div>
           
            
          </div>
        </div>
      );
    }
   
  }
  
