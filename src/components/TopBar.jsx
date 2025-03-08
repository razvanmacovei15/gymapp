import HeaderMenu from "./HeaderMenu";
import NotificationAndGymSelector from "./NotificationAndGymSelector";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { UserNav } from "./top-bar/user-nav";
import { useSidebar } from "./ui/sidebar";
import { usePopup } from "./popups/PopupContext";
import ProfileMenuPopup from "./popups/ProfileMenuPopup";

export default function TopBar( ) {

  const { toggleProfileMenu } = usePopup();

  const {open, toggleSidebar} = useSidebar();

  const [gyms, setGyms] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;


  const getGyms = async () => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${apiUrl}/gyms/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const gymNames = response.data.map((gym) => gym.name);
    return setGyms(gymNames);
  };

  const handleLocationChange = (newLocation) => {
    console.log("Selected location:", newLocation);
  };

  useEffect(() => {
    getGyms();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 z-50 h-32 bg-gradient-to-t from-gray-950 to-pink-950 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-300"
      style={{
        width: `calc(100% - ${open ? "16rem" : "3rem"})`, // Adjust width based on sidebar state
        marginLeft: open ? "16rem" : "3rem", // Adjust margin based on sidebar state
      }}
    >
      <HeaderMenu toggleSidebar={toggleSidebar} />
      <div className="flex items-center gap-4">
        <NotificationAndGymSelector
          locations={gyms}
          onLocationChange={handleLocationChange}
        />
        <UserNav toggleProfileMenu={toggleProfileMenu}/>
        <ProfileMenuPopup/>


      </div>
    </header>

  );
}
