import React, { useEffect } from "react";
import { Box, Button, Container, Grid, Stack } from "@mui/material";

import "./_Login.scss";

import spotifyImg from "../../assets/images/Spotify_Logo_CMYK_Black.png";

import { useSelector, useDispatch } from "react-redux";

import { getToken } from "../../utils/spotifySlice";

const Login = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  const handleClick = () => {
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const redirectUrl = "http://localhost:5173/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      // console.log(token);
      dispatch(getToken(token));
    }
  }, []);
  return (
    <>
      <Stack className="login-container">
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={6} sx={{ margin: "120px auto" }}>
              <Stack className="login-content">
                <Box
                  className="spotify-img"
                  component="img"
                  alt={"Spotify"}
                  src={spotifyImg}
                ></Box>
                <Button
                  className="connect-btn"
                  variant="contained"
                  onClick={handleClick}
                >
                  Connect Spotify
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </>
  );
};

export default Login;
