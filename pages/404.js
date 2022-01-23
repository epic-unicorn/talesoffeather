import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="text-black">
      <Head>
        <title>Tales of Feather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col justify-center mx-auto mt-52 text-center max-w-2x1">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          Oops not found
        </h1>                
      </div>
      <div className="mt-64"></div>
      <Footer />
    </div>
  );
}