import React from "react";
import "./_Footer.scss";
import { Container, Stack, Grid } from "@mui/material";
import CurrentTrack from "../current_track/CurrentTrack";
import PlayerControls from "../player_controls/PlayerControls";
import Volume from "../volume/Volume";

const Footer = () => {
  return (
    <>
      <Stack className="footer-container">
        <Container maxWidth={"xl"}>
          <Grid container>
            <Grid item md={4}>
              <Stack className="song-details">
                <CurrentTrack />
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack className="song-player">
                <PlayerControls />
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack className="song-controls">
                <Volume />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </>
  );
};

export default Footer;
