import Sidebar from "./components/Sidebar";
import MainView from "./components/MainView";
import Login from "./pages/LoginPage"; 
import SignUp from "./pages/SignUp"; 


function App() {
  return (
    <div className="flex flex-row h-screen ">
       <Sidebar />
      <MainView />
      {/* <Login /> */}
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
