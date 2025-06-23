import React, { useEffect, useState } from "react";
import { getRepoDetails } from "../services/githubApi";

const RepoDetails = ({ owner, repo }) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (owner && repo) {
      getRepoDetails(owner, repo)
        .then((res) => setDetails(res.data))
        .catch(console.error);
    }
  }, [owner, repo]);

  return (
    <div>
      <h2>Repository Details</h2>
      <p>Name: {details.name}</p>
      <p>Description: {details.description}</p>
      <p>Stars: {details.stargazers_count}</p>
      <p>Forks: {details.forks_count}</p>
    </div>
  );
};

export default RepoDetails;
