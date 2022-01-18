import Header from "../components/Header";
import Mint from "../components/Mint";
import Owned from "../components/Owned";
import About from "../components/About";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-th-background-primary">
      <Header />      
      <Mint />
      <About />
      {/* <Owned /> */}
    </div>
  );
}
