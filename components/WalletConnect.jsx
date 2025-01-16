"use client";

import React, { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";

const WalletConnect = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        if (onWalletConnected) {
          onWalletConnected(address);
        }
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("Please install MetaMask or another wallet extension.");
    }
  };

  const truncateAddress = (address) => {
    return address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : "Address not available";
  };

  return (
    <button
      className="w-full flex items-center justify-center gap-2 border py-2 px-4 rounded-lg hover:bg-gray-50"
      onClick={connectWallet}
    >
      {walletAddress ? truncateAddress(walletAddress) : "Connect Wallet"}
    </button>
  );
};

export default WalletConnect;
