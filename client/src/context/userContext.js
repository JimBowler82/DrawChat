import React, { createContext, useContext, useReducer } from "react";

const UserContext = createContext({});

const initialState = { name: "", roomName: "" };

function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setRoom":
      return { ...state, roomName: action.payload };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ user: state, setUser: dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
