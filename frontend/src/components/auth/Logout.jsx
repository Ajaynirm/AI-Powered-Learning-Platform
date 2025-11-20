import { useAuthStore } from "../../store/AuthStore.js";

const LogoutButton = () => {
  const {logout } = useAuthStore();
  return (
    <div>
        <button
      onClick={() =>{ logout() }}
      
    >
      Logout
    </button>
    </div>
    
  );
};

export default LogoutButton;
