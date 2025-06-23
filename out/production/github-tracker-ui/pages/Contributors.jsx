import React, { useEffect, useState } from "react";
import { getContributors } from "../services/githubApi";

const Contributors = ({ owner, repo }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    if (owner && repo) {
      getContributors(owner, repo)
        .then((res) => setContributors(res.data))
        .catch(console.error);
    }
  }, [owner, repo]);

  return (
    <div>
      <h2>Contributors</h2>
      <ul>
        {contributors.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
};

export default Contributors;