import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
    user: {},
    repos: [],
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
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  }

  async function getUser(login) {
    setLoading();
    const response = await fetch(`https://api.github.com/users/${login}`);
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  }

  async function getRepos(login) {
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    setLoading();
    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
