import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <>
      <Navbar />

      {/* <Login /> */}
      <Home />
      <Dashboard />
      <Profile />
      <Courses />
      <Quiz />
      {/* <Chatbot /> */}
    </>
  );
}

export default App;
