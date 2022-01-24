import Header from "../components/Header";
import Mint from "../components/Mint";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Head from "next/head";
import Collection from "../components/Collection";
import Team from "../components/Team";
import Roadmap from "../components/Roadmap";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-th-background-primary">
      <Head>
        <title>Tales of Feather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Collection />
      <Roadmap />
      <Team />
      {/* <Mint /> */}
      <Footer />
    </div>
  );
}
