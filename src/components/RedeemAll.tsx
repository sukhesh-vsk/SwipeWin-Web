"use client";
import React from "react";
import { type Bet, useRedeemBet } from "@azuro-org/sdk";
import cx from "clsx";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTokenBalance } from "@/lib/features/walletSlice";
import { contractAddress } from "@/components/WrapComponent";
import { ethers } from "ethers";
import { getBalance } from "wagmi/actions";
import { useAccount } from "wagmi";
import { wagmiConfig } from "@/context/Providers";

type Props = {
  bets: Bet[];
};

export function RedeemAll(props: Props) {
  const { bets } = props;
  const { address } = useAccount();

  const { submit, isPending, isProcessing } = useRedeemBet();

  const unredeemedBets = bets?.filter(
    (bet) => !bet.freebetContractAddress && bet.isRedeemable
  );

  const isDisabled = !unredeemedBets.length || isPending || isProcessing;

  const handleRedeem = async () => {
    try {
      await submit({ bets: unredeemedBets });
      updateBalance();
    } catch { }
  };

  let buttonTitle = "Redeem all";

  if (isPending) {
    buttonTitle = "Waiting for approval";
  } else if (isProcessing) {
    buttonTitle = "Processing...";
  }

  const tBalance = useSelector((state: RootState) => state.walletReducer.tokenBalance);
  const dispatch = useDispatch<AppDispatch>();
  const setTokenValue = (value: string) => {
    dispatch(setTokenBalance(value))
  }

  const updateBalance = async () => {
    const tempBalance = await getBalance(wagmiConfig, {
      address: address,
      token: contractAddress as `0x{string}`,
    })
    const ethValue = ethers.utils.formatEther(tempBalance.value);
    if (tBalance != ethValue) {
      setTokenValue(ethValue);
    }
  };

  return (
    <button
      className={cx(
        "md:w-[200px] py-3 px-2 text-white font-semibold text-center rounded-xl mb-4",
        {
          "bg-blue-500 hover:bg-blue-600 transition shadow-md": !isDisabled,
          "bg-zinc-300 cursor-not-allowed": isDisabled,
        }
      )}
      disabled={isDisabled}
      onClick={handleRedeem}
    >
      {buttonTitle}
    </button>
  );
}
