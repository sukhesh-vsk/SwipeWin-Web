"use client"

import { abi } from "@/abi";
import { chains, wagmiConfig } from "@/context/Providers";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { getBalance } from "wagmi/actions";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setNativeBalance, setTokenBalance } from "@/lib/features/walletSlice";

interface PopupProps {
  onClose: () => void;
}

// Testnet chz Official Contract
//export  const contractAddress = '0x678c34581db0a7808d0aC669d7025f1408C9a3C6';
// Testnet azuro wchz
// export const contractAddress = '0x721EF6871f1c4Efe730Dce047D40D1743B886946';

// Mainnet
export const contractAddress = process.env.NEXT_PUBLIC_CHAIN_TOKEN_ADDRESS ? process.env.NEXT_PUBLIC_CHAIN_TOKEN_ADDRESS : '0x677F7e16C7Dd57be1D4C8aD1244883214953DC47';



const WrapComponent: React.FC<PopupProps> = ({ onClose }) => {
  const [isWrap, setIsWrap] = useState(true);
  const [amount, setAmount] = useState("");

  const { address } = useAccount();

  const [from, setFrom] = useState("CHZ");
  const [to, setTo] = useState("wCHZ");

  const [isBalanceFetching, setisBalanceFetching] = useState(true);
  const [isNativeBalanceFetching, setisNativeBalanceFetching] = useState(true);
  const tBalance = useSelector((state: RootState) => state.walletReducer.tokenBalance);
  const nBalance = useSelector((state: RootState) => state.walletReducer.nativeBalance);
  const dispatch = useDispatch<AppDispatch>();
  const setTokenValue = (value: string) => {
    dispatch(setTokenBalance(value))
  }

  const setNativeTokenValue = (value: string) => {
    dispatch(setNativeBalance(value))
  }

  const updateBalance = async () => {
    setisBalanceFetching(true);
    const tempBalance = await getBalance(wagmiConfig, {
      address: address,
      token: contractAddress as `0x{string}`,
    })
    const ethValue = ethers.formatEther(tempBalance.value);
    if (tBalance != ethValue) {
      setTokenValue(ethValue);
    }
    setisBalanceFetching(false);
  };

  const updateNativeBalance = async () => {
    setisBalanceFetching(true);
    const tempBalance = await getBalance(wagmiConfig, {
      address: address
    });
    const ethValue = ethers.formatEther(tempBalance.value);
    if (nBalance != ethValue) {
      setNativeTokenValue(ethValue);
    }
    setisNativeBalanceFetching(false);
  };

  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract();

  const handleDeposit = () => {
    if (isWrap) {
      writeContract({
        chain: chains[0],
        address: contractAddress as '0x${string}',
        abi,
        functionName: 'deposit',
        args: [],
        value: amount ? ethers.parseEther(amount) : undefined,
        account: address
      })
    } else {
      handleWithdraw();
    }
  };

  const handleWithdraw = () => {
    writeContract({
      chain: chains[0],
      address: contractAddress as '0x${string}',
      abi,
      functionName: 'withdraw',
      args: [amount ? ethers.parseEther(amount) as any as bigint : undefined],
      account: address
    })
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  useEffect(() => {
    updateBalance();
    updateNativeBalance();
  }, [isConfirmed]);

  useEffect(() => {
    updateBalance();
    updateNativeBalance();
  }, [])

  const handleToggle = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setIsWrap(!isWrap);
    setAmount("");
  };

  const handleMaxClick = () => {
    if (isBalanceFetching || isNativeBalanceFetching) {
      return
    }
    setAmount(
      (isWrap) ? nBalance : tBalance
    );
  };

  const getDepositButton = () => {
    if (isConfirming) {
      return <p className="text-xs mt-2 text-text_dim_2 font-medium">Waiting for Transaction to complete</p>
    }
    if (isPending) {
      return <p className="text-xs mt-2 text-text_dim_2 font-medium">Sending Transaction</p>
    }

    if (isConfirmed) {
      return <p className="text-xs mt-2 text-text_dim_2 font-medium">Transaction Successful</p>
    }

    return <button className="bg-sgrad text-white px-4 py-2 rounded-md w-full mt-4" onClick={handleDeposit}>
      {`Convert ${from} to ${to}`}
    </button>
  }

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
              className={`px-4 py-2 rounded-md ${isWrap ? "bg-gray-800 text-text" : "bg-bg text-text_dim_2"
                }`}
            >
              Wrap
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-md ${isWrap ? "bg-bg text-text_dim_2" : "bg-gray-800 text-text"
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
            <p className="text-xs mt-2 text-text_dim_2 font-medium">Balance: {(isWrap) ? Number(nBalance).toFixed(2) : Number(tBalance).toFixed(2)} {from} </p>
          </div>
          {getDepositButton()}
        </div>
      </div>
    </div>
  );
};

export default WrapComponent;
