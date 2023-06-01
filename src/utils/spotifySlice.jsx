import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "spotifySlice",
  initialState: {
    token: null,
    playlist: [],
    userinfo: null,
    selectedPlaylistId: "73XC6SQQomNvKb5mcW82hN",
    selectedPlaylist: null,
    currentlyPlaying: null,
    playingState: false,
  },
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
    getPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    getUserInfo: (state, action) => {
      state.userinfo = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setCurrentlyPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    setPlayingState: (state, action) => {
      state.playingState = action.payload;
    },
    setPlaylistID: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
  },
});

export const {
  getToken,
  getPlaylist,
  getUserInfo,
  setSelectedPlaylist,
  setCurrentlyPlaying,
  setPlayingState,
  setPlaylistID,
} = stateSlice.actions;
export default stateSlice.reducer;
