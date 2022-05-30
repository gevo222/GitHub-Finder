import { useEffect, useContext } from "react";
import GithubContext from "../../context/GithubContext";
import Spinner from "../Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const { users, isLoading, getUsers } = useContext(GithubContext);

  useEffect(() => {
    getUsers();
  }, []);

  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner></Spinner>;
  }
}

export default UserResults;
