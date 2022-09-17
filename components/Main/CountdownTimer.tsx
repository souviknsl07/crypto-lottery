import React from "react";
import { useContract, useContractData } from "@thirdweb-dev/react";
import { Box, Stack, Typography } from "@mui/material";
import Countdown from "react-countdown";
import { IRenderer } from "../../data/interface";

const timerUnitList = [
  { id: 1, name: "hours" },
  { id: 2, name: "minutes" },
  { id: 3, name: "seconds" },
];

const Renderer = ({ hours, minutes, seconds, completed }: IRenderer) => {
  return (
    <Box>
      {completed ? (
        // Render a completed state
        <Typography
          variant="h6"
          sx={{ textAlign: "center" }}
          className="animate-bounce"
        >
          Tickets Sales have now CLOSED for this draw
        </Typography>
      ) : (
        // Render a countdown
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Time Remaining
        </Typography>
      )}

      {/* Timer Stats */}
      <Stack direction="row" spacing={3}>
        {timerUnitList?.map(({ id, name }) => (
          <Stack key={id} flex="1 1 0%">
            <Box
              sx={{
                p: { xs: 2, sm: 4 },
                fontSize: { xs: "36px", sm: "48px" },
                textAlign: "center",
                borderRadius: 1,
                minWidth: { lg: "150px" },
                backgroundColor: "secondary.main",
              }}
              className={completed ? "animate-pulse" : ""}
            >
              {!isNaN(hours) &&
                !isNaN(minutes) &&
                !isNaN(seconds) &&
                eval(name)}
            </Box>
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                pt: 2,
                fontSize: { sm: "16px" },
                textTransform: "uppercase",
              }}
            >
              {name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

const CountdownTimer = ({ contract }: any) => {
  const { data: expiration, isLoading: isLoadingExpiration } = useContractData(
    contract,
    "expiration"
  );
  return (
    <>
      <Countdown date={new Date(expiration * 1000)} renderer={Renderer} />
    </>
  );
};

export default CountdownTimer;
