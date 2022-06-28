import Main from "../components/Main";
import Mint from "../components/Mint";
import Meta from "../components/Meta";
import Placeholder from "../components/Placeholder";
import projectConfig from "../config/projectConfig";

export default function Home() {

  // print app info
  console.log(`Sitedomain: ${projectConfig.siteDomain}`);
  console.log(`Environment: ${process.env.NEXT_PUBLIC_VERCEL_ENV}`);
  console.log(`Networkname: ${projectConfig.networkName}`);
  console.log(`Mint cost: ${projectConfig.mintCost}`);
  console.log(`OpenSea URL: ${projectConfig.openseaCollectionUrl}`);
  console.log(`Contract address: ${projectConfig.contractAddress}`);
  console.log(`EtherScan URL: ${projectConfig.etherScanUrl}`);

  return (
    <div className="bg-th-background">
      <Meta />
      <Placeholder />
      {/* <Main /> */}
      {/* <Mint /> */}
    </div>
  );
}
