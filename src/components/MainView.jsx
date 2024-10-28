import MainInfo from "./MainInfo";
import TopBar from "./TopBar";

export default function MainView() {
  return (
    <div className="flex flex-col grow">
      <TopBar />
      <MainInfo />
    </div>
  );
}
