import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";

function User() {
  const { getUser, user } = useContext(GithubContext);
  const params = useParams();
  useEffect(() => {
    getUser(params.login);
    console.log(params.login, user);
  }, []);

  return <div>{user.login}</div>;
}

export default User;
