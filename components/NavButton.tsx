import React from "react";
import { Button } from "@mui/material";

interface props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}
const NavButton = ({ title, isActive, onClick }: props) => {
  return (
    <Button
      size="medium"
      sx={{
        backgroundColor: `${isActive ? "secondary.main" : ""}`,
        color: "secondary.contrastText",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
        fontWeight: 600,
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default NavButton;
