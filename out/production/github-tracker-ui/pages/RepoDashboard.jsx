// src/pages/RepoDashboard.jsx
import React from "react";
import { useParams } from "react-router-dom";
import RepoDetails from "./RepoDetails";
import Readme from "./Readme";
import CommitActivity from "./CommitActivity";
import Contributors from "./Contributors";
import Languages from "./Languages";

const RepoDashboard = () => {
  const { owner, repo } = useParams();

  return (
    <div>
      <h2>Repo Dashboard</h2>
      <p><strong>Owner:</strong> {owner}</p>
      <p><strong>Repository:</strong> {repo}</p>

      <RepoDetails owner={owner} repo={repo} />
      <Readme owner={owner} repo={repo} />
      <CommitActivity owner={owner} repo={repo} />
      <Contributors owner={owner} repo={repo} />
      <Languages owner={owner} repo={repo} />
    </div>
  );
};

export default RepoDashboard;
