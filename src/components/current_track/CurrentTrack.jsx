import React, { useEffect } from "react";
import "./_CurrentTrack.scss";

import { useSelector, useDispatch } from "react-redux";

import { setCurrentlyPlaying } from "../../utils/spotifySlice";
import axios from "axios";
import { Stack, Typography, Box } from "@mui/material";

import { IoHeartOutline } from "react-icons/io5";
import { MdPictureInPictureAlt } from "react-icons/md";

const CurrentTrack = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();
  const token = state.token;
  const currentPlaying = state.currentlyPlaying;

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data !== "") {
        const playingTrack = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch(setCurrentlyPlaying(playingTrack));
      } else {
        dispatch(setCurrentlyPlaying(null));
      }
      console.log(response);
    };
    getCurrentTrack();
  }, [token]);

  return (
    <>
      <Stack className="current-track-content">
        {currentPlaying && (
          <Stack className="track-stack" direction={"row"}>
            <Stack className="track-img-name" direction={"row"}>
              <Box
                className="track-img"
                component="img"
                alt={currentPlaying.name}
                src={currentPlaying.image}
              />
              <Stack className="track-info">
                <Typography className="track-name">
                  {currentPlaying.name}
                </Typography>
                <Typography className="track-artists">
                  {currentPlaying.artists}
                </Typography>
              </Stack>
            </Stack>
            <Stack className="track-like-pip" direction={"row"}>
              <IoHeartOutline className="track-like" />
              <MdPictureInPictureAlt className="track-pip" />
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default CurrentTrack;
