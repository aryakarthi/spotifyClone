import { Container, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
import Searchbar from "../../components/searchbar/Searchbar";
import Playlists from "../../components/playlists/Playlists";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { getUserInfo } from "../../utils/spotifySlice";

import "./_Home.scss";

const Home = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  // console.log("home state", state);

  const token = state.token;

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      const userInfo = {
        userID: data.id,
        userName: data.display_name,
      };
      dispatch(getUserInfo(userInfo));
    };
    getUser();
  }, [token, dispatch]);

  return (
    <>
      <Stack className="home-container">
        <Stack className="top-container">
          <Container maxWidth="xl">
          <Grid container>
            <Grid item md={2}>
              <Searchbar />
              <Playlists />
            </Grid>
            <Grid item md={10}>
              <Header />
              <Main />
            </Grid>
          </Grid>
          </Container>
        </Stack>
        <Stack className="bottom-container">
          <Container maxWidth="xl">
          <Grid container>
            <Grid item md={12}>
              <Footer />
            </Grid>
          </Grid>
          </Container>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
