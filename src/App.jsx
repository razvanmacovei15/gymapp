import Sidebar from "./components/Sidebar";
import MainView from "./components/MainView";
import Login from "./pages/LoginPage"; 
import SignUp from "./pages/SignUp"; 
import { useAuth } from "./components/AuthProvider";


function App() {

  const { authState } = useAuth();

  return (
    <div 
    className="flex flex-row h-screen " 
    >
      {/* {authState.authToken ? (<div className="flex flex-row h-screen ">
        <Sidebar />
        <MainView />
      </div>) : (
        <Login/>
      )} */}

      <Sidebar />
      <MainView />
    </div>
  );
}

export default App;
