# Boilerplate Next web3 with TS

- Next
- Next-auth
- Siwe (Sign in with eth)
- web3modal (modal for multi wallet)
- useDapp (main lib for contract interaction)
- reactMUI (use for design)
- next-i18next (internationalization in `public/locales` and `next-i18next.config.js`)
- Vite (for dev and build better than webpack <3)
- Sass
- Custom theme in `styles/theme`
- Basic reset in `styles/globals.scss`

use yarn (not tested with npm, must work)

fill `.env` and change `config/blockchain.config.ts` to connect to another network

font imported in `pages/_document.tsx` :

- Roboto
- Poppins
- Orbitron

`useWeb3modal()` hook return :

account -> metamask address
isValidChain -> if chainid is same as your choosen chain in .env and config
connectWallet -> function to connect metamask wallet
disconnectWallet -> function to disconnect from siwe
signInWithEth -> function to connect with siwe
switchNetwork -> function add/switch network

if you want to export more it use `useEthers()`

## Launch project

- yarn i
- yarn dev

(BTW eslint and linter not done feel free to add the one you want to use with eslint and your own rules)
