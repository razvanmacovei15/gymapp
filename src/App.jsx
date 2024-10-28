import Sidebar from "./components/Sidebar";
import MainView from "./components/MainView";

function App() {
  return (
    <div className="flex flex-row h-screen ">
      <Sidebar />
      <MainView />
    </div>
  );
}

export default App;
