import SidebarMenu from "./SidebarMenu";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`bg-[#2a333f] h-[calc(100%-9px)] fixed top-1 left-0 rounded-xl z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "250px" }}
    >
      <SidebarMenu />
    </div>
  );
}
