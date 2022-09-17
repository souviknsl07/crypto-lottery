import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { theme } from "../theme";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ThirdwebProvider desiredChainId={ChainId.Goerli}>
          <Component {...pageProps} />
          <Toaster />
        </ThirdwebProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
