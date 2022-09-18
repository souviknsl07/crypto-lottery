import React from "react";
import Image from "next/image";
import { useMetamask } from "@thirdweb-dev/react";
import { Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

const Login = () => {
  const connectWithMetamask = useMetamask();
  return (
    <>
     <Head>
        <title>Login</title>
      </Head>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Stack alignItems="center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
            height={224}
            width={224}
            className="rounded-full object-cover"
          />
          <Typography
            variant="h3"
            sx={{
              color: "secondary.contrastText",
              fontWeight: "bold",
              mt: "24px",
              mb: "10px",
            }}
          >
            CRYPTO LOTTERY
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ color: "secondary.contrastText" }}
          >
            Get Started by Logging in with your Metamask.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "secondary.contrastText",
              "&:hover": {
                backgroundColor: "secondary.contrastText",
              },
              color: "primary.contrastText",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "16px",
              mt: "20px",
            }}
            onClick={connectWithMetamask}
          >
            Login with Metamask
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
