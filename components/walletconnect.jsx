import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Callback to parent component if provided
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
    <div className="wallet-connect">
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
        onClick={connectWallet}
      >
        {walletAddress ? truncateAddress(walletAddress) : "Connect Wallet"}
      </button>
      {walletAddress && (
        <p className="mt-2 text-sm text-gray-600">
          Connected Address: {truncateAddress(walletAddress)}
        </p>
      )}
    </div>
  );
};

export default WalletConnect;
