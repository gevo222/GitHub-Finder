import { useState, createContext } from "react";

const GithubContext = createContext();

export function GithubProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUsers() {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  }

  return (
    <GithubContext.Provider
      value={{
        users,
        isLoading,
        getUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
