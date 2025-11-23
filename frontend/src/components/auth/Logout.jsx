import { useAuthStore } from "../../store/AuthStore.js";

const LogoutButton = ({ className }) => {
  const { logout } = useAuthStore();

  return (
    <button
      onClick={logout}
      className={`w-full py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md transition-transform hover:scale-105 ${className || ""}`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
