import Header from "../components/header";
import Mint from "../components/mint";
import Owned from "../components/owned";
import About from "../components/about";

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
