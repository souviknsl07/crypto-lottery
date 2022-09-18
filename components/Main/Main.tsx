import React from "react";
import Marquee from "react-fast-marquee";
import { useAddress, useContractData } from "@thirdweb-dev/react";
import { Box, Container, Stack, Typography } from "@mui/material";
import AdminControl from "./AdminControl";
import WinnerBox from "./WinnerBox";
import DrawBox from "./DrawBox";
import TicketBox from "./TicketBox/TicketBox";
import { ethers } from "ethers";
import { currency } from "../../data/constants";

const MarqueeComponent = ({ contract }: any) => {
  const { data: lastWinner } = useContractData(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractData(
    contract,
    "lastWinnerAmount"
  );
  return (
    <Marquee speed={100} gradient={false} className="p-5 mb-5">
      <Stack
        direction="row"
        spacing={1}
        sx={{ mx: 5, color: "secondary.contrastText" }}
      >
        <Typography>Last Winner: {lastWinner?.toString()}</Typography>
        <Typography>
          Previous winnngs:{" "}
          {lastWinnerAmount &&
            ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}
          {currency}
        </Typography>
      </Stack>
    </Marquee>
  );
};

const Main = ({ contract }: any) => {
  const address = useAddress();
  const { data: isLotteryOperator } = useContractData(
    contract,
    "lotteryOperator"
  );

  return (
    <>
      <Container sx={{ width: "100%" }}>
        {/* Marquee  */}
        <MarqueeComponent contract={contract} />

        {/* AdminControl  */}
        {isLotteryOperator === address && (
          <Stack direction="row" justifyContent="center">
            <AdminControl contract={contract} />
          </Stack>
        )}

        {/* WinnerBox  */}
        <WinnerBox contract={contract} />

        <Box
          sx={{
            display: { md: "flex" },
            alignItems: "start",
            justifyContent: "center",
            maxWidth: "1080px",
            mx: "auto",
          }}
          className="space-y-5 md:space-y-0 md:space-x-5"
        >
          {/*  Draw Box */}
          <DrawBox contract={contract} />

          {/* Ticket Box */}
          <TicketBox contract={contract} />
        </Box>
      </Container>
    </>
  );
};

export default Main;
