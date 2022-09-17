import React from "react";
import Image from "next/image";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { Box, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import NavButton from "./NavButton";

const Header = () => {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <header className="flex p-2 justify-between items-center">
      {/* Leftside Header  */}
      <Box
        sx={{
          width: "100%",
          height: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
          height={80}
          width={80}
          className="rounded-full object-cover"
        />
        <Box sx={{ ml: "8px" }}>
          <Typography variant="h1" className="text-lg text-white font-bold">
            CRYPTO DRAW
          </Typography>
          <Typography
            variant="body1"
            className="text-xs text-emerald-500 truncate"
          >
            User: {address?.slice(0, 6)}...{address?.slice(-5)}
          </Typography>
        </Box>
      </Box>

      {/* NavButton  */}
      <Box
        sx={{
          display: "flex",
          marginLeft: "auto",
          alignItems: "center",
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{ backgroundColor: "#0A1F1C", p: "4px" }}
          className="space-x-2"
        >
          <NavButton title="Logout" onClick={() => disconnect()} />
        </Box>
      </Box>
    </header>
  );
};

export default Header;
