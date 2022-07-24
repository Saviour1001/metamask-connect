import React from "react";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskOnboarding from "@metamask/onboarding";
import { MetaMaskInpageProvider } from "@metamask/providers";
declare var window: any;
const { ethereum } = window;

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  // useEffect(() => {
  //   MetamaskConnection();
  // }, []);
  async function MetamaskConnection() {
    if (ethereum && ethereum.isMetaMask) {
      console.log("chain ID", ethereum.networkVersion);
      setChainId(ethereum.networkVersion);

      const newAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Wallet Address", newAccounts);
      setWalletAddress(newAccounts[0]);

      try {
        const chainId = await ethereum.request({
          method: "eth_getBalance",
          params: [newAccounts[0], "latest"],
          id: ethereum.networkVersion,
        });
        console.log("Wallet Balance", parseInt(chainId, 16) / 10 ** 18);
        setWalletBalance(parseInt(chainId, 16) / 10 ** 18);
      } catch (err) {
        console.log(err);
      }
    } else {
      let onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    }
  }

  return (
    <div>
      <button onClick={MetamaskConnection}>Connect</button>
      {isConnected ? <p>Connected</p> : <p>Not Connected</p>}
    </div>
  );
};

export default Connect;
