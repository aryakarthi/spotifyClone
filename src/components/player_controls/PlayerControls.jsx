import React from "react";
import "./_PlayerControls.scss";
import { Stack } from "@mui/material";
import axios from "axios";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setPlayingState } from "../../utils/spotifySlice";

const PlayerControls = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();
  const token = state.token;
  const playingState = state.playingState;

  console.log(token, playingState);

  const changeState = async () => {
    const state = playingState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch(setPlayingState(!playingState));
  };

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch(setPlayingState(!playingState));

    const resData = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (resData.data !== "") {
      const playingTrack = {
        id: resData.data.item.id,
        name: resData.data.item.name,
        artists: resData.data.item.artists.map((artist) => artist.name),
        image: resData.data.item.album.images[2].url,
      };
      dispatch(setCurrentlyPlaying(playingTrack));
    } else {
      dispatch(setCurrentlyPlaying(null));
    }
  };

  return (
    <>
      <Stack className="track-controls" direction={"row"}>
        <Stack className="shuffle">
          <BsShuffle />
        </Stack>
        <Stack className="previous">
          <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
        </Stack>
        <Stack className="play-pause">
          {playingState ? (
            <BsFillPauseCircleFill onClick={changeState} />
          ) : (
            <BsFillPlayCircleFill onClick={changeState} />
          )}
        </Stack>
        <Stack className="next">
          <CgPlayTrackNext onClick={() => changeTrack("next")} />
        </Stack>
        <Stack className="repeat">
          <FiRepeat />
        </Stack>
      </Stack>
    </>
  );
};

export default PlayerControls;
