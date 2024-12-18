import Sidebar from "./components/sidebar";
import MainView from "./components/MainView";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import { useAuth } from "./components/AuthProvider";

function App() {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <MainView />
    </div>
  );
}
export default App;
