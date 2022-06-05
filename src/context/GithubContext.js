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

  function clearUsers() {
    dispatch({
      type: "CLEAR_USERS",
    });
  }

  async function searchUsers(text) {
    const params = new URLSearchParams({
      q: text,
    });

    setLoading();
    const response = await fetch(
      `https://api.github.com/search/users?${params}`
    );
    console.log(params);
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
