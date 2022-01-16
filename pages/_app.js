import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { StatusProvider } from "../context/statusContext";

function MyApp({ Component, pageProps }) { 

  return (
    <ThemeProvider>
      <StatusProvider>
        <Component {...pageProps} />
      </StatusProvider>
    </ThemeProvider>
  );
}

export default MyApp;
