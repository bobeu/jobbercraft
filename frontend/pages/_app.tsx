import "@rainbow-me/rainbowkit/styles.css"
import '../styles/globals.css'
import React from 'react';
import NextHead from 'next/head'
import type { AppProps } from 'next/app';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import store from '@/components/configs/StoreConfig';
import { BrowserRouter } from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux';
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { AppThemeProvider } from "@/components/AppThemeProvider";
import AppProvider from "@/components/AppProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, mount] = React.useState(false);

  React.useEffect(() => {
    mount(true);
  }, []);
  // if(typeof window === 'undefined') return null;
  return isMounted? (
    <React.Fragment>
      <NextHead>
        <title>JobberCraft</title>
      </NextHead>
        {
          isMounted &&
          <AppProvider>
            <BrowserRouter>
              <AppThemeProvider>
                <ReduxProvider store={store}>
                  <ScopedCssBaseline enableColorScheme />
                    <Component {...pageProps} />
                </ReduxProvider>
              </AppThemeProvider>
            </BrowserRouter>
          </AppProvider>
        }
    </React.Fragment>
  ) : null;
}

