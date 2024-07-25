"use client"

import React, { useState } from "react";
import WrapComponent from "./WrapComponent";
import CryptoExchange from "./CryptoExchange";

interface PopupProps {
  onClose: () => void;
}

export const SwapContainer: React.FC<PopupProps> = ({ onClose }) => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleConvertNowClick = () => {
    setActiveComponent("wrap");
  };

  const handleDepositNowClick = () => {
    setActiveComponent("exchange");
  };

  const renderActiveComponent = () => {
    if (activeComponent === "wrap") {
      return <WrapComponent onClose={onClose} />;
    }
    if (activeComponent === "exchange") {
      return <CryptoExchange onClose={onClose} />;
    }
    return null;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-bg p-6 rounded-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-metro">Swap Tokens</h2>
          <button onClick={onClose} className="text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-sec_2 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-md font-bold">Convert CHZ ↔ wCHZ</h3>
                <p className="text-xs mt-1 text-start">
                  wCHZ is the default betting currency on Wakanda.bet. Convert your CHZ to wCHZ here                
                </p>
              </div>
            </div>
            <button
              onClick={handleConvertNowClick}
              className="bg-sgrad font-semibold text-white px-4 py-2 rounded-md text-xs"
            >
              Convert Now
            </button>
          </div>
          {/* <div className="bg-sec_2 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-md font-bold">I have crypto</h3>
                <p className="text-xs mt-1 text-start">
                  Awesome! Swap your tokens to wCHZ/CHZ or transfer them to Gnosis.
                </p>
              </div>
            </div>
            <button
              onClick={handleDepositNowClick}
              className="bg-sgrad font-semibold text-white px-4 py-2 rounded-md text-xs"
            >
              Deposit Now
            </button>
          </div> */}
        </div>
      </div>
      {renderActiveComponent()}
    </div>
  );
};

export default SwapContainer;
