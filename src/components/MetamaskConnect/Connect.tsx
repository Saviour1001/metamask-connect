import React from "react";
import { useState, useEffect } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
declare var window: any;
const { ethereum } = window;

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  async function MetamaskConnection() {
    if (ethereum && ethereum.isMetaMask) {
      console.log("chain ID", ethereum.networkVersion);
      setChainId(ethereum.networkVersion);

      const newAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Wallet Address", newAccounts);
      setWalletAddress(newAccounts[0]);
      setIsConnected(true);

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
      {isConnected ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(navy, black)",
            color: "cyan",
            border: "1px solid yellow",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ border: "2px solid red", padding: "10px" }}>
            Connected
          </h1>
          <h2>Chain ID: {chainId}</h2>
          <h2>Wallet Address: {walletAddress}</h2>
          <h2>Wallet Balance: {walletBalance}</h2>
        </div>
      ) : (
        <button onClick={MetamaskConnection}>Connect</button>
      )}
    </div>
  );
};

export default Connect;
