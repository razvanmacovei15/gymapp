import HeaderMenu from "./HeaderMenu";
import UserProfile from "./UserProfile";
import NotificationAndGymSelector from "./NotificationAndGymSelector";

export default function TopBar({ toggleSidebar }) {
  const locations = ["Gym A", "Gym B", "Gym C", "Gym D"];
  const username = "John";

  const handleLocationChange = (newLocation) => {
    console.log("Selected location:", newLocation);
  };

  return (
    <header className="h-32 bg-[#455271] rounded-xl mx-1 mt-1 flex justify-between items-center px-8 py-4">
      <HeaderMenu toggleSidebar={toggleSidebar} />
      <NotificationAndGymSelector
        locations={locations}
        onLocationChange={handleLocationChange}
      />
      <UserProfile username={username} />
    </header>
  );
}
