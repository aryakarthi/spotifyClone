import React from "react";
import "./_Searchbar.scss";
import { Box, Stack, Typography } from "@mui/material";

import { IoLibrary, IoSearch } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";

import spotifyLogo from "../../assets/images/Spotify_Logo_CMYK_White.png";

const Searchbar = () => {
  return (
    <>
      <Stack className="search-container">
        <Box
          className="spotify-logo"
          component="img"
          alt={"Spotify"}
          src={spotifyLogo}
        />
        <Stack className="home-search">
          <ul className="home-search-list">
            <li>
              <MdHomeFilled className="side-icon" />
              <span>Home</span>
            </li>
            <li>
              <IoSearch className="side-icon" />
              <span>Search</span>
            </li>
          </ul>
        </Stack>
      </Stack>
    </>
  );
};

export default Searchbar;
