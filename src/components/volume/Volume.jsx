import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import "./_Volume.scss";

import { TbMicrophone2, TbDevices2, TbVolume2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";

const Volume = () => {
  const state = useSelector(({ data }) => data);
  const dispatch = useDispatch();
  const token = state.token;

  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <>
      <Stack className="volume-controls">
        <Stack className="control-icons" direction={"row"}>
          <TbMicrophone2 />
          <TbDevices2 />
          <HiOutlineQueueList />
          <TbVolume2 />
          <input
            type="range"
            onMouseUp={(e) => setVolume(e)}
            min={0}
            max={100}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Volume;
