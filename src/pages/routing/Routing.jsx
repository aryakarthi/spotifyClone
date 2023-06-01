import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import Home from "../home/Home";

import { Provider, useSelector } from "react-redux";
import { store } from "../../utils/store";

const Routing = () => {
  const state = useSelector(({ data }) => data);

  const tokenVal = state.token;

  return (
    <>
      <BrowserRouter>
        {tokenVal ? (
          <Routes>
            <Route path="/home" element={<Home />}></Route>

            <Route
              path="*"
              element={<Navigate to={`/home`}></Navigate>}
            ></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />}></Route>

            <Route path="*" element={<Navigate to={`/`}></Navigate>}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

const StateProvider = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default StateProvider;
