import React, { useEffect, useState } from "react";
import { getReadme } from "../services/githubApi";

const Readme = ({ owner, repo }) => {
  const [readme, setReadme] = useState({});

  useEffect(() => {
    if (owner && repo) {
      getReadme(owner, repo)
        .then((res) => setReadme(res.data))
        .catch(console.error);
    }
  }, [owner, repo]);

  return (
    <div>
      <h2>README</h2>
      <pre>{readme.content ? atob(readme.content) : "No README found"}</pre>
    </div>
  );
};

export default Readme;