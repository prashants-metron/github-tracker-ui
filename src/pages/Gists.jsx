import React, { useEffect, useState } from "react";
import { getGists } from "../services/githubApi";

const Gists = ({ username }) => {
  const [gists, setGists] = useState([]);

  useEffect(() => {
    if (username) {
      getGists(username)
        .then((res) => setGists(res.data))
        .catch(console.error);
    }
  }, [username]);

  return (
    <div>
      <h2>Gists</h2>
      <ul>
        {gists.map((gist) => (
          <li key={gist.id}>{gist.description || "No description"}</li>
        ))}
      </ul>
    </div>
  );
};

export default Gists;