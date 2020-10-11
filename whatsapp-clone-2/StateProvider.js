import React, { createContext, useContext, useReducer } from "react";

// defines the data layout
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// makes the data layout accessible
export const useStateValue = () => useContext(StateContext);
