import { FC } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import nextI18NextConfig from '../next-i18next.config.js';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Box,
} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { DAppProvider } from '@usedapp/core';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.scss';
import { BlockchainConfig } from '../config/blockchain.config';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: FC<MyAppProps> = (props) => {
  let config: any = BlockchainConfig.polygonMumbai;
  if (process.env.NEXT_PUBLIC_BC_ENV === 'production') {
    config = BlockchainConfig.polygon;
  }
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <DAppProvider config={config}>
            <CssBaseline />
            <Container
              sx={{
                height: '100%',
                width: '100%',
                padding: '0 !important',
                display: 'flex',
                flexDirection: 'column',
              }}
              maxWidth={false}
            >
              <Component {...pageProps} />
            </Container>
          </DAppProvider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
