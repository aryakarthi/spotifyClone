import React, { useEffect } from "react";
import "./_Main.scss";

import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import { IoPlaySharp, IoTimeOutline, IoHeartOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  setSelectedPlaylist,
  setCurrentlyPlaying,
  setPlayingState,
} from "../../utils/spotifySlice";

const Main = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  console.log("main state", state);

  const token = state.token;
  const selectedPlaylistId = state.selectedPlaylistId;
  const selectedPlaylist = state.selectedPlaylist;
  const username = state?.userinfo?.userName;

  useEffect(() => {
    const getPlaylistSongs = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a>")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
          image: track.album.images[2].url,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      console.log(selectedPlaylist);
      console.log(response.data);
      dispatch(setSelectedPlaylist(selectedPlaylist));
    };
    getPlaylistSongs();
  }, [token, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch(setCurrentlyPlaying(currentPlaying));
      dispatch(setPlayingState(true));
    } else {
      dispatch(setPlayingState(true));
    }
  };

  const msToMinSec = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <>
      <Stack className="main-container">
        {selectedPlaylist && (
          <>
            <Stack className="playlist-bg">
              <Container>
                <Stack className="playlist-content">
                  <Grid container className="con">
                    <Grid item md={3}>
                      <Stack className="playlist-img-stack">
                        <Box
                          className="playlist-img"
                          component="img"
                          alt={selectedPlaylist.name}
                          src={selectedPlaylist.image}
                        />
                      </Stack>
                    </Grid>
                    <Grid item md={9}>
                      <Stack className="playlist-info-stack">
                        <Typography className="type">Playlist</Typography>
                        <Typography className="playlist-name">
                          {selectedPlaylist.name}
                        </Typography>
                        <Typography className="no-of-songs">
                          {username} . {selectedPlaylist.tracks.length} Songs
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Container>
            </Stack>
            <Container>
              <Stack className="playlist-controls" direction={"row"}>
                <Box className="play-btn">
                  <IoPlaySharp className="play-icon" />
                </Box>
                <IconButton aria-label="dots" className="dots-btn">
                  <BsThreeDots className="dots-icon" />
                </IconButton>
              </Stack>
              <Stack className="playlist-title">
                <Grid container>
                  <Grid item lg={1}>
                    <Typography
                      className="pl-title"
                      sx={{ textAlign: "center" }}
                    >
                      #
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography className="pl-title">Title</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography className="pl-title">Album</Typography>
                  </Grid>
                  <Grid item lg={1}>
                    <Stack />
                  </Grid>
                  <Grid item lg={1}>
                    <IoTimeOutline className="duration-icon" />
                  </Grid>
                  <Grid item lg={1}>
                    <Stack />
                  </Grid>
                </Grid>
              </Stack>
              <Stack className="playlist-songs">
                <ul className="song-list">
                  {selectedPlaylist.tracks.map(
                    (
                      {
                        id,
                        name,
                        artists,
                        image,
                        duration,
                        album,
                        context_uri,
                        track_number,
                      },
                      index
                    ) => {
                      return (
                        <>
                          <li
                            key={id}
                            className="song-info"
                            onClick={() =>
                              playTrack(
                                id,
                                name,
                                artists,
                                image,
                                context_uri,
                                track_number
                              )
                            }
                          >
                            <Grid container>
                              <Grid item lg={1}>
                                <Typography className="track-no">
                                  {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item lg={4}>
                                <Stack
                                  className="song-img-info"
                                  direction={"row"}
                                >
                                  <Box
                                    className="song-img"
                                    component="img"
                                    alt={name}
                                    src={image}
                                  />
                                  <Stack className="song-info">
                                    <Typography className="song-name">
                                      {name}
                                    </Typography>
                                    <Typography className="song-artists">
                                      {artists}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Grid>
                              <Grid item lg={4}>
                                <Typography className="album-name">
                                  {album}
                                </Typography>
                              </Grid>
                              <Grid item lg={1}>
                                <IoHeartOutline className="song-like-icon" />
                              </Grid>
                              <Grid item lg={1}>
                                <Typography className="duration">
                                  {msToMinSec(duration)}
                                </Typography>
                              </Grid>
                              <Grid item lg={1}>
                                <BsThreeDots className="song-dot-icon" />
                              </Grid>
                            </Grid>
                          </li>
                        </>
                      );
                    }
                  )}
                </ul>
              </Stack>
            </Container>
          </>
        )}
      </Stack>
    </>
  );
};

export default Main;
