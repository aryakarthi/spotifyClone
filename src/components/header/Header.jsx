import React from "react";
import "./_Header.scss";

import { TextField, IconButton, Stack, Button } from "@mui/material";
import { IoSearch, IoArrowDownCircleOutline } from "react-icons/io5";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { SlUser } from "react-icons/sl";

import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  const username = state?.userinfo?.userName;

  return (
    <>
      <Stack className="header-container" direction={"row"}>
        <Stack className="header-left" direction={"row"}>
          <Stack className="chevron" direction={"row"}>
            <IconButton aria-label="previous" className="chev-btn">
              <HiChevronLeft className="chev-left" />
            </IconButton>
            <IconButton aria-label="next" className="chev-btn">
              <HiChevronRight className="chev-right" />
            </IconButton>
          </Stack>
          <Stack className="search-box">
            <TextField
              className="search-field"
              fullWidth
              id="standard-bare"
              variant="outlined"
              size="small"
              color="primary"
              placeholder="Search songs, artists, albums..."
              sx={{ border: "1px solid blue" }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <IoSearch className="search-icon" />
                  </IconButton>
                ),
              }}
            />
          </Stack>
        </Stack>
        <Stack className="header-right" direction={"row"}>
          <Button className="upgrade" variant="outlined" size="small">
            Upgrade
          </Button>
          <Button
            size="small"
            className="install"
            variant="outlined"
            startIcon={<IoArrowDownCircleOutline />}
          >
            Install App
          </Button>
          <Button
            size="small"
            className="user-menu"
            variant="outlined"
            startIcon={<SlUser />}
          >
            {username}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
