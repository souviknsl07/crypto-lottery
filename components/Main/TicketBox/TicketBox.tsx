import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useAddress,
  useContractCall,
  useContractData,
} from "@thirdweb-dev/react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  statsContainerStyles,
  statsStyles,
  textFieldStyles,
} from "../../../theme";
import { IRowStackProps } from "../../../data/interface";
import { currency } from "../../../data/constants";

const rowStackProps: IRowStackProps = {
  direction: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const TicketBox = ({ contract }: any) => {
  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);
  const [userTickets, setuserTickets] = useState<number>(0);
  const { data: tickets } = useContractData(contract, "getTickets");
  const { data: ticketPrice } = useContractData(contract, "ticketPrice");
  const { data: expiration } = useContractData(contract, "expiration");
  const { data: ticketCommission } = useContractData(
    contract,
    "ticketCommission"
  );
  const { data: remainingTickets } = useContractData(
    contract,
    "RemainingTickets"
  );
  const { mutateAsync: BuyTickets, isLoading } = useContractCall(
    contract,
    "BuyTickets"
  );

  useEffect(() => {
    if (!tickets) return;
    const totalTickets: string[] = [...tickets];
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );
    setuserTickets(noOfUserTickets);
  }, [tickets, address]);

  const handleClick = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Buying your tickets...");
    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (+ethers.utils.formatEther(ticketPrice) * quantity).toString()
          ),
        },
      ]);
      toast.success("Tickets purchased successfully!", { id: notification });
      console.info("contract call success!", data);
    } catch (err) {
      toast.error("Whoops something went wrong!", { id: notification });
      console.error("contract call failure!", err);
    }
  };

  return (
    <>
      <Box sx={statsContainerStyles} className="space-y-2">
        <Box sx={statsContainerStyles}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pb: 1.5 }}
          >
            <Typography variant="body2">Price per ticket</Typography>
            <Typography variant="body2">
              {ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}
              {currency}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 1.5,
              border: "1px solid",
              borderColor: "secondary.dark",
              backgroundColor: "primary.main",
            }}
            spacing={1}
          >
            <Typography variant="body2">TICKETS</Typography>
            <TextField
              type="number"
              size="small"
              sx={textFieldStyles}
              InputProps={{
                inputProps: {
                  min: 1,
                  max: 10,
                },
              }}
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </Stack>

          <Stack
            spacing={1}
            sx={{
              color: "secondary.emeraldText",
              fontStyle: "italic",
              mt: 2.5,
            }}
          >
            <Stack {...rowStackProps}>
              <Typography variant="body2" sx={{ fontWeight: "800" }}>
                Total cost of tickets
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "800" }}>
                {ticketPrice &&
                  +ethers.utils.formatEther(ticketPrice.toString()) *
                    quantity}{" "}
                {currency}
              </Typography>
            </Stack>
            <Stack {...rowStackProps}>
              <Typography variant="caption">Service fees</Typography>
              <Typography variant="caption">
                {ticketCommission &&
                  ethers.utils.formatEther(ticketCommission.toString())}{" "}
                {currency}
              </Typography>
            </Stack>
            <Stack {...rowStackProps}>
              <Typography variant="caption">Netwotk Fees</Typography>
              <Typography variant="caption">TBC</Typography>
            </Stack>
          </Stack>

          <Button
            size="large"
            sx={{
              mt: 2.5,
              width: "100%",
              fontWeight: 600,
              color: "secondary.contrastText",
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
              "&:disabled": {
                background: "linear-gradient(to right, #8e9eab, #eef2f399)",
                cursor: "not-allowed",
                pointerEvents: "auto",
              },
            }}
            disabled={
              expiration?.toString() > Date.now().toString() ||
              remainingTickets?.toNumber() === 0
            }
            onClick={handleClick}
          >
            Buy {quantity} {quantity > 1 ? "tickets" : "ticket"} for{" "}
            {ticketPrice &&
              +ethers.utils.formatEther(ticketPrice.toString()) * quantity}{" "}
            {currency}
          </Button>
        </Box>

        {userTickets > 0 && (
          <Box sx={statsStyles}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Tickets in this draw
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              flexWrap="wrap"
              maxWidth="384px"
              rowGap={1}
            >
              {Array(userTickets)
                .fill("")
                .map((value, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "48px",
                      height: "80px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "secondary.emeraldText",
                      backgroundColor: "secondary.main",
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>
                ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default TicketBox;
