import React, { useEffect } from "react";
import "./_Playlists.scss";

import { IoLibrary, IoSearch } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi";

import { Stack, IconButton, Box, Typography } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { getPlaylist, setPlaylistID } from "../../utils/spotifySlice";

const Playlists = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  const token = state.token;
  const playlist = state.playlist;

  // console.log("playlist state", state);

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      console.log(items);

      const myPlaylist = items.map(({ name, id, images }) => {
        return { name, id, images };
      });
      console.log(myPlaylist);
      dispatch(getPlaylist(myPlaylist));
    };
    getPlaylistData();
  }, [token]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch(setPlaylistID(selectedPlaylistId));
  };

  return (
    <>
      <Stack className="playlist-container">
        <Stack className="lib-content" direction={"row"}>
          <Stack className="lib-title" direction={"row"}>
            <IoLibrary className="side-icon" />
            <span>Your Library</span>
          </Stack>
          <Stack className="add-lib">
            <IconButton aria-label="add">
              <HiOutlinePlus className="add-icon" />
            </IconButton>
          </Stack>
        </Stack>
        <Stack className="filter-btns" direction={"row"}>
          <span>Playlists</span>
          <span>Artists</span>
        </Stack>
        <Stack className="playlist">
          <ul>
            {playlist.map(({ name, id, images }) => {
              return (
                <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                  <Box
                    className="pl-img"
                    component="img"
                    alt={name}
                    src={images[0].url}
                  />
                  <Typography>{name}</Typography>
                </li>
              );
            })}
          </ul>
        </Stack>
      </Stack>
    </>
  );
};

export default Playlists;
