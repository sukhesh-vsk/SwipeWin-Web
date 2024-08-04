'use client'
import { wagmiConfig } from "@/context";
import { useChain, useBaseBetslip, useDetailedBetslip, useBetTokenBalance, usePrepareBet } from "@azuro-org/sdk";
import { switchChain } from "viem/actions";
import cx from "clsx";
import { ethers } from "ethers";

const SubmitButton: React.FC = () => {
  const { appChain, isRightNetwork } = useChain();
  const { items, clear } = useBaseBetslip();
  const {
    betAmount,
    odds,
    totalOdds,
    isStatusesFetching,
    isOddsFetching,
    isBetAllowed,
  } = useDetailedBetslip();
  const { loading: isBalanceFetching, balance } = useBetTokenBalance();
  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired,
  } = usePrepareBet({
    betAmount,
    slippage: 10,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as `0x${string}` ?? "0x1494887C286D539f29A527734975119CdEDcE2D2",
    selections: items,
    odds,
    totalOdds,
    betGas : {
      gas: undefined,
      maxFeePerBlobGas: undefined,
      gasPrice: undefined,
      maxFeePerGas: Number(appChain.id) == 88888 ? ethers.parseUnits('2500', 'gwei') : undefined,
      maxPriorityFeePerGas:  Number(appChain.id) == 88888 ? ethers.parseUnits('5', 'gwei') :  undefined
    },
    onSuccess: () => {
      clear();
    },
  });

  const handleSwitchChain = async () => {
    switchChain(wagmiConfig, {
      chainId: wagmiConfig.chains[0].id
    })
  };

  const isPending = approveTx.isPending || betTx.isPending;
  const isProcessing = approveTx.isProcessing || betTx.isProcessing;
  if (!isRightNetwork) {
    return (
      <div className="mt-6 py-3.5 text-center bg-red-200 rounded-2xl" onClick={handleSwitchChain}>
        Switch network to <b>{appChain.name}</b> in your wallet
      </div>
    );
  }

  const isEnoughBalance =
    isBalanceFetching || !Boolean(+betAmount)
      ? true
      : Boolean(+balance! > +betAmount);

  const isLoading =
    isOddsFetching ||
    isBalanceFetching ||
    isStatusesFetching ||
    isAllowanceLoading ||
    isPending ||
    isProcessing ||
    isRelayerFeeLoading;

  const isDisabled =
    isLoading || !isBetAllowed || !isEnoughBalance || !+betAmount;

  let title = 'Select Odd';

  if (items.length != 0) {
    if (isPending) {
      title = "Waiting for approval";
    } else if (isProcessing) {
      title = "Processing...";
    } else if (isLoading) {
      title = "Loading...";
    } else if (isApproveRequired) {
      title = "Approve";
    } else {
      title = "Place Bet";
    }
  }


  return (
    <div className="mt-1 flex flex-col justify-center items-center">
      {!isEnoughBalance && (
        <div className="mb-1 text-sm text-red-500 text-center font-semibold">
          Not enough balance.
        </div>
      )}
      <button
        className={cx(
          "px-4 py-2 rounded-full font-cairo font-bold tracking-widest",
          {
            "btn-grad transition": !isDisabled,
            "bg-gray-400 cursor-not-allowed": isDisabled,
          }
        )}
        disabled={isDisabled}
        onClick={submit}
      >
        {title}
      </button>
    </div>
  );
};

export default SubmitButton;