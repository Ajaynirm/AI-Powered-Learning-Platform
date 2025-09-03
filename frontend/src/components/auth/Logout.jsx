import { useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const { signOut } = useClerk();

  return (
    <div>
        <button
      onClick={() =>{signOut({ redirectUrl: "/" }); toast.success("Logout successfully")}}
      
    >
      Logout
    </button>
    </div>
    
  );
};

export default LogoutButton;
