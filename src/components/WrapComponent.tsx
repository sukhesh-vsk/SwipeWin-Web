"use client"

import React, { useState } from "react";

interface PopupProps {
  onClose: () => void;
}

const WrapComponent: React.FC<PopupProps> = ({ onClose }) => {
  const [isWrap, setIsWrap] = useState(true);
  const [amount, setAmount] = useState("");
  const [chzBalance, setCHZ] = useState("200.0");
  const [wchzBalance, setWCHZ] = useState("150.0");

  const [from, setFrom] = useState("CHZ");
  const [to, setTo] = useState("wCHZ");

  const handleToggle = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setIsWrap(!isWrap);
    setAmount("");
  };

  const handleMaxClick = () => {
    setAmount(
        (isWrap) ? chzBalance : wchzBalance
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-bg p-6 rounded-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-metro">
            {`Convert ${from} to ${to}`}
          </h2>
          <button onClick={onClose} className="text-white">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div className="px-2 pt-2 rounded-lg flex items-center justify-around">
                  <button
                    onClick={handleToggle}
                    className={`px-4 py-2 rounded-md ${
                      isWrap ? "bg-gray-800 text-text" : "bg-bg text-text_dim_2"
                    }`}
                  >
                    Wrap
                  </button>
                  <button
                    onClick={handleToggle}
                    className={`px-4 py-2 rounded-md ${
                      isWrap ? "bg-bg text-text_dim_2" : "bg-gray-800 text-text"
                    }`}
                  >
                    Unwrap
                  </button>
            </div>
          <div className="bg-sec_2 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <input
                type="number"
                min='0'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-3/4 px-4 py-2 text-lg rounded-md bg-bg text-white"
                placeholder="0.00"
              />
              <button
                onClick={handleMaxClick}
                className="bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                Max
              </button>
            </div>
            <p className="text-xs mt-2 text-text_dim_2 font-medium">Balance: {(isWrap) ? chzBalance : wchzBalance} {from} </p>
          </div>
          <button className="bg-sgrad text-white px-4 py-2 rounded-md w-full mt-4">
            {`Convert ${from} to ${to}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrapComponent;
