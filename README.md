

# tribes-eth

`tribes-eth` is a sample [Next.js](https://nextjs.org/) project utilizing the tribes module from the [hyperverse](https://www.decentology.com/hyperverse). The aim of this project is to allow users to join different tribes (or communities) and gain access to content only visible to those in that specific tribe.

- If you have any questions please join the [Decentology Discord.](http://discord.gg/decentology)


## 💻 System Requirements
- [Visual Studio Code](https://code.visualstudio.com/download) (or any IDE for editing JavaScript)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable). 


## 🛠 Installation
To run this project locally:

1. In your terminal run these commands:
    clone the repository
    ```bash
    git clone https://github.com/decentology/workshop-yeovil
    ```
        cd into that folder
    ```bash
    cd tribes-eth 
    ```
    

2. Download all the dependencies needed to run the project by running `yarn`. 
    ```bash
    yarn
    ```
    To run the development server run our custom script 
    ```bash
    yarn dev:tribes
    ```
    

    Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result. 


## Testing & Running the application
If you were successful following the Installation application, you should be greeted with the tribes home page that looks like this:
<img src="./apps/ethereum/tribes/public/tribes-home.png" alt="tribes"/>

To be able to actually do anything on the dapp, you need a Metmask Wallet and some Rinkeby eth.

If you do not have a metamask wallet, [here](https://www.surgewomen.io/learn-about-web3/set-up-metamask-wallet) is a guide you can follow on how to set up one.

To get some Rinkeby eth here are some available faucets you can request from:
- https://faucet.paradigm.xyz/
- https://app.mycrypto.com/faucet

## 📌 Important Links and File Locations

Here are some links and locations of files related to tribes:

- Rinkeby Etherscan of the [contract](https://rinkeby.etherscan.io/address/0x410E22b393B3A90953c0677F2282E331580ed45b)
- [Contract code](https://github.com/decentology/workshop-yeovil/blob/workshop/yeovil/packages/hyperverse-ethereum-tribes/contracts/Tribes.sol) found in the repo
- [useTribe](https://github.com/decentology/workshop-yeovil/blob/workshop/yeovil/packages/hyperverse-ethereum-tribes/source/useTribes.ts) hook which is what allows us to interact and transact with the contract
