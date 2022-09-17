import React from "react";
import { ethers } from "ethers";
import { useContractData } from "@thirdweb-dev/react";
import { Box, Stack, Typography } from "@mui/material";
import { statsContainerStyles, statsStyles } from "../../theme";
import { currency } from "../../data/constants";
import CountdownTimer from "./CountdownTimer";

const DrawBox = ({ contract }: any) => {
  const { data: RemainingTickets } = useContractData(
    contract,
    "RemainingTickets"
  );
  const { data: CurrentWinningReward } = useContractData(
    contract,
    "CurrentWinningReward"
  );

  return (
    <>
      <Box sx={statsContainerStyles}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "600", textAlign: "center" }}
        >
          The Next Draw
        </Typography>

        {/* Top Stats Ctn */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          py={1}
          whiteSpace={"nowrap"}
        >
          {/* Left Ctn */}
          <Stack sx={statsStyles}>
            <Typography variant="caption">Total Pool</Typography>
            <Typography variant="body1">
              {CurrentWinningReward &&
                ethers.utils.formatEther(CurrentWinningReward.toString())}{" "}
              {currency}
            </Typography>
          </Stack>
          {/* Right Ctn */}
          <Stack sx={statsStyles}>
            <Typography variant="caption">Tickets Remaining</Typography>
            <Typography variant="body1">
              {RemainingTickets?.toString()}
            </Typography>
          </Stack>
        </Stack>

        {/* Countdown Timer */}
        <Box sx={{ mt: 2.5, mb: 1.5 }}>
          <CountdownTimer contract={contract} />
        </Box>
      </Box>
    </>
  );
};

export default DrawBox;
