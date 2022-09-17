import React from "react";
import { ethers } from "ethers";
import { useContractCall, useContractData } from "@thirdweb-dev/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  Star,
  MonetizationOn,
  Autorenew,
  UTurnLeft,
} from "@mui/icons-material";
import { adminButtonIconStyles } from "../../theme";
import { currency } from "../../data/constants";
import toast from "react-hot-toast";

const buttonList = [
  {
    name: "drawWinner",
    title: "Draw Winner",
    icon: <Star sx={adminButtonIconStyles} />,
    toastMessage: {
      loading: "Picking a Lucky Winner...",
      success: "A Winner has been selected!",
      error: "Whoops something went wrong!",
    },
  },
  {
    name: "withdrawCommission",
    title: "Withdraw Commission",
    icon: <MonetizationOn sx={adminButtonIconStyles} />,
    toastMessage: {
      loading: "Withdrawing commission...",
      success: "Your Commission has been withdrawn successfully!.",
      error: "Whoops something went wrong!",
    },
  },
  {
    name: "restartDraw",
    title: "Restart Draw",
    icon: <Autorenew sx={adminButtonIconStyles} />,
    toastMessage: {
      loading: "Restarting draw... ",
      success: "Draw restarted successfully!",
      error: "Whoops something went wrong!",
    },
  },
  {
    name: "refundAll",
    title: "Refund All",
    icon: <UTurnLeft sx={adminButtonIconStyles} />,
    toastMessage: {
      loading: "Refunded all...",
      success: "All refunded successfully!",
      error: "Whoops something went wrong!",
    },
  },
];

const AdminControl = ({ contract }: any) => {
  const { data: totalCommission } = useContractData(
    contract,
    "operatorTotalCommission"
  );

  /************** DrawWinnerTicket **************/
  const { mutateAsync: DrawWinnerTicket } = useContractCall(
    contract,
    "DrawWinnerTicket"
  );

  /************** WithdrawCommission **************/
  const { mutateAsync: WithdrawCommission } = useContractCall(
    contract,
    "WithdrawCommission"
  );

  /************** restartDraw **************/
  const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");

  /************** RefundAll **************/
  const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll");

  const handleClick = async (name: string) => {
    const functionList: {
      [key: string]: any;
    } = {
      drawWinner: async () => await DrawWinnerTicket([{}]),
      withdrawCommission: async () => await WithdrawCommission([{}]),
      restartDraw: async () => await restartDraw([{}]),
      refundAll: async () => await RefundAll([{}]),
    };

    const { toastMessage }: any = buttonList.find((item) => {
      return item?.name === name;
    });
    const notification = toast.loading(toastMessage?.loading);

    try {
      const data = await functionList[name]?.();
      toast.success(toastMessage?.success, { id: notification });
      console.info("contract call successs", data);
    } catch (error) {
      toast.error(toastMessage?.error, { id: notification });
      console.error("contract call failure", error);
    }
  };

  return (
    <Box
      sx={{
        color: "secondary.contrastText",
        textAlign: "center",
        px: 2.5,
        py: 1.5,
        mb: 2.5,
        borderRadius: "6px",
        border: "1px solid",
        borderColor: "secondary.dark",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Admin Controls
      </Typography>
      <Typography variant="body1" sx={{ mb: 2.5 }}>
        Total Commission to be withdrawn:{" "}
        {totalCommission &&
          ethers.utils.formatEther(totalCommission?.toString())}{" "}
        {currency}
      </Typography>

      <Stack
        sx={{
          flexDirection: { md: "row" },
          columnGap: { md: "8px" },
          rowGap: { md: "0px", xs: "8px" },
        }}
      >
        {buttonList?.map(({ name, title, icon }) => (
          <Button
            variant="outlined"
            startIcon={icon}
            key={name}
            sx={{
              span: { m: 0 },
              py: 1.25,
              flexDirection: "column",
              flex: "1 1 0%",
              color: "secondary.contrastText",
              borderRadius: "6px",
              backgroundColor: "primary.dark",
              border: "2px solid",
              borderColor: "secondary.dark",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
            onClick={() => handleClick(name)}
          >
            {title}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminControl;
