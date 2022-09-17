import Head from "next/head";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAddress, useContract, useContractData } from "@thirdweb-dev/react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import Login from "../components/Login";
import Loader from "../components/Loader";
import Main from "../components/Main/Main";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  useEffect(() => {
    console.log("address", address);
  }, []);

  if (!address) return <Login />;
  if (isLoading) return <Loader />;
  return (
    <>
      <Head>
        <title>Decentralized Lottery</title>
      </Head>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.main",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Ctn */}
        <Main contract={contract} />

        {/* Footer */}
        <Footer />
      </Container>
    </>
  );
};

export default Home;
