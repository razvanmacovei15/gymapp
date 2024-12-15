import SidebarMenu from "./SidebarMenu";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`bg-gradient-to-b from-pink-950 via-gray-950 to-pink-950 h-[calc(100%)] fixed left-0 z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "250px" }}
    >
      <SidebarMenu />
    </div>
  );
}
