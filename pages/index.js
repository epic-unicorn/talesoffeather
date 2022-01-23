import Header from "../components/Header";
import Mint from "../components/Mint";
import Footer from "../components/Footer";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-th-background-primary">
      <Header />
      {/* <Main />  */}
      <Mint />
      <Footer />
    </div>
  );
}
