import { useEthers } from '@usedapp/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import Web3Modal from 'web3modal';
import {
  BlockchainInfo,
  BlockchainConfig,
} from '../../config/blockchain.config';

export default function useWeb3Modal() {
  let config: any = BlockchainConfig.polygonMumbai;
  let chainInfo: any = BlockchainInfo.polygonMumbai;

  if (process.env.NEXT_PUBLIC_BC_ENV === 'production') {
    config = BlockchainConfig.polygon;
    chainInfo = BlockchainInfo.polygon;
  }

  const { deactivate, activate, account, library, chainId } = useEthers();
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [isValidChain, setIsValidChain] = useState<boolean>(false);
  const providerOptions = {
    injected: {
      display: {
        name: 'Metamask',
        description: 'Connect with the provider in your browser',
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          [config.readOnlyChainId]: chainInfo.rpcUrls[0],
        },
        network: process.env.NEXT_PUBLIC_WALLETCONNECT_NETWORK ?? 'matic',
      },
    },
  };

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: false,
        providerOptions,
      })
    );
  }, []);

  useEffect(() => {
    if (chainId !== config.readOnlyChainId) {
      setIsValidChain(false);
    } else {
      setIsValidChain(true);
    }
  }, [chainId, config]);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal?.connect();
      await activate(provider);
    } catch (error: any) {
      console.error(error);
    }
  };

  const switchNetwork = async () => {
    if (library && chainId !== config.readOnlyChainId) {
      await library
        .send('wallet_switchEthereumChain', [
          { chaindId: config.readOnlyChainId },
        ])
        .catch(async (error) => {
          await library.send('wallet_addEthereumChain', [chainInfo]);
        });
    }
  };

  const signInWithEth = async () => {
    if (account) {
      try {
        const message = new SiweMessage({
          domain: window.location.host,
          address: account,
          statement: `Sign in with Ethereum to ${window.location.host}`,
          uri: window.location.origin,
          version: '1',
          chainId: config.readOnlyChainId,
          nonce: await getCsrfToken(),
        });
        const signedMessage = await library
          ?.getSigner(account)
          ?.signMessage(message.prepareMessage());
        signIn('credentials', {
          message: JSON.stringify(message),
          redirect: false,
          signature: signedMessage,
          callbackUrl: '/protected',
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = async () => {
    await deactivate();
    await signOut();
  };

  return {
    account,
    isValidChain,
    connectWallet,
    disconnectWallet,
    signInWithEth,
    switchNetwork,
  };
}
