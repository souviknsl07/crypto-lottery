import React from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import {
  useAddress,
  useContractCall,
  useContractData,
} from "@thirdweb-dev/react";
import { Stack, Typography } from "@mui/material";
import { currency } from "../../data/constants";

const WinnerBox = ({ contract }: any) => {
  const address = useAddress();
  const { data: winnings } = useContractData(
    contract,
    "getWinningsForAddress",
    address
  );

  const { mutateAsync: WithdrawWinnings, isLoading } = useContractCall(
    contract,
    "WithdrawWinnings"
  );

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings...");
    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winnings withdrawn successfully!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
      console.error("contract call failure", error);
    }
  };

  return (
    <>
      {winnings > 0 && (
        <Stack
          sx={{
            p: 2.5,
            mb: 2.5,
            textAlign: "center",
            borderRadius: "6px",
            color: "secondary.contrastText",
            backgroundColor: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
          className="animate-pulse"
          onClick={onWithdrawWinnings}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Winner Winner Chicken Dinner!
          </Typography>
          <Typography variant="body1">
            Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "}
            {currency}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1.5 }}>
            Click here to Withdraw
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default WinnerBox;
