import { Config, Polygon, Mumbai } from '@usedapp/core';

const PolygonMumbaiConfig: Config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: process.env.NEXT_PUBLIC_POLYGON_MUMBAI_URL ?? '',
  },
};

const PolygonConfig: Config = {
  readOnlyChainId: Polygon.chainId,
  readOnlyUrls: {
    [Polygon.chainId]: process.env.NEXT_PUBLIC_POLYGON_URL ?? '',
  },
};

function utf8ToHex(str: string) {
  return (
    '0x' +
    Array.from(str)
      .map((c) =>
        c.charCodeAt(0) < 128
          ? c.charCodeAt(0).toString(16)
          : encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
      )
      .join('')
  );
}

const PolygonChain = {
  chainId: utf8ToHex(Polygon.chainId.toString()),
  chainName: Polygon.chainName,
  rpcUrls: [process.env.NEXT_PUBLIC_POLYGON_URL ?? ''],
  blockExplorerUrls: ['https://polygonscan.com'],
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
  },
};

const PolygonMumbaiChain = {
  chainId: '0x13881',
  chainName: Mumbai.chainName,
  rpcUrls: [process.env.NEXT_PUBLIC_POLYGON_MUMBAI_URL ?? ''],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
  },
};

const BlockchainInfo = {
  polygon: {
    ...PolygonChain,
  },
  polygonMumbai: {
    ...PolygonMumbaiChain,
  },
};

const BlockchainConfig = {
  polygonMumbai: {
    ...PolygonMumbaiConfig,
    //contract: process.env.NEXT_PUBLIC_TESTNET_CONTRACT,
  },
  polygon: {
    ...PolygonConfig,
  },
};

export { BlockchainConfig, BlockchainInfo };
