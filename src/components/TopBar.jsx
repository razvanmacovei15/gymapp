import HeaderMenu from "./HeaderMenu";
import UserProfile from "./UserProfile";
import NotificationAndGymSelector from "./NotificationAndGymSelector";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TopBar({ toggleSidebar }) {

  const { authState } = useAuth();
  const locations = ["Gym A", "Gym B", "Gym C", "Gym D"];
  const username = authState.currentUser.name;

  const [gyms, setGyms] = useState([]);

  const getGyms = async() =>{
    const response = await axios.get("http://maco-coding.go.ro:8010/gyms/all");
    const gymNames = response.data.map(gym => gym.name);
    setGyms(gymNames);
    return setGyms(response.data);
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
      <NotificationAndGymSelector
        locations={locations}
        onLocationChange={handleLocationChange}
      />
      <UserProfile username={username} />
    </header>
  );
}
