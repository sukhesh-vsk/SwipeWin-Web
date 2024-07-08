"use client";

import React, { useState } from "react";

interface PopupProps {
  onClose: () => void;
}

const totalNetworks = ["Polygon", "Chilliz"];
const totalTokens = {
  "USDT": 2135.54,
  "Matic": 123.54,
};

const CryptoExchange: React.FC<PopupProps> = ({ onClose }) => {
  const [wCHZ, setWCHZ] = useState(120.24);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedTokenBal, setSelectedTokenBal] = useState(0);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-bg p-6 rounded-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-metro">Select Crypto</h2>
          <button onClick={onClose} className="text-white">
            ✕
          </button>
        </div>
        <div className="flex flex-col justify-between mb-3">
          <p className="font-semibold text-sm">Select Network</p>
          <select className="bg-sec_2 px-2 py-2 rounded w-full" onChange={(e) => setSelectedNetwork(e.target.value)}>
            {totalNetworks.map((network) => (
              <option key={network} className="bg-sec_dim_2">{network}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-between mb-3">
          <p className="font-semibold text-sm">Select token</p>
          <div>
            {Object.entries(totalTokens).map(([token, balance]) => (
              <button key={token} onClick={() => {setSelectedToken(token); setSelectedTokenBal(balance)}} className={`flex w-full text-md justify-between mt-1 px-2 py-1 border rounded ${selectedToken === token ? 'bg-sec_2 border-accent' : 'bg-transparent border-sec_dim_2'}`}>
                <p>{token}</p>
                <p>{balance}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label className="font-semibold text-sm">From</label>
          <input
            type="number"
            min="0"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="rounded bg-sec_2 py-1 mt-1 px-2"
          />
          <p className="text-xs text-text_dim_2 pt-1">Balance: {selectedTokenBal} {selectedToken}</p>
        </div>
        <div className="flex flex-col mb-3">
          <label className="font-semibold text-sm">To</label>
          <input
            type="number"
            min="0"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            className="rounded bg-sec_2 py-1 mt-1 px-2"
          />
          <p className="text-xs text-text_dim_2 pt-1">Balance: {wCHZ} wCHZ</p>
        </div>
        <button className="w-full bg-sgrad rounded py-1">Swap</button>
      </div>
    </div>
  );
};

export default CryptoExchange;
