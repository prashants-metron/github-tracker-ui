import React, { useEffect, useState } from "react";
import { getLanguages } from "../services/githubApi";

const Languages = ({ owner, repo }) => {
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    if (owner && repo) {
      getLanguages(owner, repo)
        .then((res) => setLanguages(res.data))
        .catch(console.error);
    }
  }, [owner, repo]);

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([lang, lines]) => (
          <li key={lang}>{lang}: {lines} lines</li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;