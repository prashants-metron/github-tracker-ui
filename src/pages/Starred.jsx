import React, { useEffect, useState } from "react";
import { getStarredRepos } from "../services/githubApi";

const Starred = ({ username }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (username) {
      getStarredRepos(username)
        .then((res) => setRepos(res.data))
        .catch(console.error);
    }
  }, [username]);

  return (
    <div>
      <h2>Starred Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Starred;