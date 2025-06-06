
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from "../abi/Ticket.json";
import { Loader2 } from 'lucide-react';


const contractAddress = '0x256ff3b9d3df415a05ba42beb5f186c28e103b2a'; // Replace with your NFT contract address

const MintNFT = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [mintingStatus, setMintingStatus] = useState(null);
  const [tokenURI, setTokenURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkWalletConnection();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
    } else {
      setWalletAddress(null);
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to connect your wallet');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      setWalletAddress(accounts[0]);
    } catch (error) {
      setError(error.message || 'Error connecting wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMintNFT = async () => {
    if (!walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    if (!tokenURI.trim()) {
      setError('Please provide a valid token URI');
      return;
    }

    setError(null);
    setIsLoading(true);
    setMintingStatus('Initializing minting process...');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      setMintingStatus('Please confirm the transaction in your wallet...');
      const transaction = await contract.mintNFT(tokenURI);

      setMintingStatus('Transaction submitted. Waiting for confirmation...');
      await transaction.wait();
      
      setMintingStatus('NFT Minted Successfully! 🎉');
      setTokenURI('');
    } catch (error) {
      console.error('Error minting NFT:', error);
      setError(error.message || 'Error minting NFT. Please try again.');
      setMintingStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Mint Your NFT
        </h2>

        {!walletAddress ? (
          <div className="text-center mb-8">
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 rounded-xl
                hover:opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin inline" />
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <div className="inline-block px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600">
              <p className="text-sm text-gray-300">Connected Wallet</p>
              <p className="text-md font-mono">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2" htmlFor="tokenURI">
            Token URI
          </label>
          <input
            type="text"
            id="tokenURI"
            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white 
              placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Enter token URI (e.g., ipfs://...)"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleMintNFT}
            disabled={isLoading || !walletAddress}
            className="relative bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 rounded-xl
              hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin inline" />
            ) : (
              'Mint NFT'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>
          </div>
        )}

        {mintingStatus && (
          <div className="mt-6 text-center">
            <p className="text-green-400 bg-green-400/10 px-4 py-2 rounded-lg">{mintingStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintNFT;
