import { Button, Container, Typography } from '@mui/material';
import { FC } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';
import useWeb3Modal from '../services/hooks/useWeb3Modal';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

const Home: FC<any> = () => {
  const pageTitle = 'page title';
  const pageDesc = 'another good desc my lord';
  const { t } = useTranslation('common');
  const session = useSession();
  const {
    account,
    isValidChain,
    connectWallet,
    disconnectWallet,
    signInWithEth,
    switchNetwork,
  } = useWeb3Modal();
  return (
    <Container
      className="section"
      sx={{ height: '100%', width: '100%', minHeight: '100vh' }}
      maxWidth={false}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Container
        maxWidth={false}
        sx={{
          height: '100%',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!account ? (
          <Button onClick={() => connectWallet()}>{t('CONNECT_WALLET')}</Button>
        ) : !isValidChain ? (
          <Button onClick={() => switchNetwork()}>{t('SWITCH_NETWORK')}</Button>
        ) : !session || session?.status !== 'authenticated' ? (
          <Button onClick={() => signInWithEth()}>{t('SIGN_WITH_ETH')}</Button>
        ) : (
          <>
            <Typography variant="h5" component="span" color="primary">
              connect with {account}
            </Typography>
            <Typography variant="h5" component="span" color="primary">
              signed as {session?.data?.address}
            </Typography>
            <Button onClick={() => disconnectWallet()}>
              {t('DISCONNECT_WALLET')}
            </Button>
          </>
        )}
      </Container>
    </Container>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const fs = require('fs');
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};

export default Home;
