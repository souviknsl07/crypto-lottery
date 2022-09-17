import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    disabled: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    disabled: PaletteOptions["primary"];
  }

  interface PaletteColor {
    emeraldText?: string;
  }
  interface SimplePaletteColorOptions {
    emeraldText?: string;
  }
}
// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    disabled: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#091B18",
      dark: "#091F1C",
      contrastText: "#000000",
    },
    secondary: {
      main: "#036756",
      dark: "#004337",
      contrastText: "#ffffff",
      emeraldText: "#6ee7b7",
    },
    disabled: {
      main: grey[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body2: "span",
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export const statsContainerStyles = {
  p: 2.5,
  color: "secondary.contrastText",
  flex: "1 1 0%",
  border: "1px solid",
  borderColor: "secondary.dark",
  borderRadius: 1,
  backgroundColor: "primary.dark",
};

export const statsStyles = {
  p: 2,
  color: "secondary.contrastText",
  flex: "1 1 0%",
  borderRadius: "6px",
  border: "2px solid",
  borderColor: "secondary.dark",
  backgroundColor: "primary.dark",
};

export const textFieldStyles = {
  input: { color: "secondary.contrastText" },
  width: "70px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "secondary.dark",
    },
    "&:hover fieldset": {
      borderColor: "secondary.main",
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "secondary.main",
      borderWidth: "2px",
    },
  },
};

export const adminButtonIconStyles = {
  h: 3,
  mx: "auto",
  mb: 1,
};
