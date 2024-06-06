import { ThemeProvider } from "@/components/ThemeProvider";
import UserDataProvider from "@/context/useContext";
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  // console.log(pageProps, "APPPPP");
  return (
    <UserDataProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserDataProvider>
  );
}
export default App;
