import HeaderMenu from "./HeaderMenu";
import NotificationAndGymSelector from "./NotificationAndGymSelector";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { UserNav } from "./top-bar/user-nav";

export default function TopBar({ toggleSidebar }) {

  const [gyms, setGyms] = useState([]);

  const getGyms = async() =>{
    const response = await axios.get("http://maco-coding.go.ro:8010/gyms/all");
    const gymNames = response.data.map(gym => gym.name);
    return setGyms(gymNames);
  } 

  const handleLocationChange = (newLocation) => {
    console.log("Selected location:", newLocation);
  };

  useEffect(() => {
    getGyms();
  }, []);

  return (
    <header className="h-32 bg-gradient-to-t from-gray-950 to-pink-950 flex justify-between items-center px-8 py-4">
      <HeaderMenu toggleSidebar={toggleSidebar} />
      <div className="flex items-center gap-4">
        <NotificationAndGymSelector
          locations={gyms}
          onLocationChange={handleLocationChange}
        />
        <UserNav/>
      </div>
      
    </header>
  );
}
