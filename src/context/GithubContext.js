import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  function setLoading() {
    dispatch({
      type: "SET_LOADING",
    });
  }
  async function getUsers() {
    setLoading();
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        getUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
