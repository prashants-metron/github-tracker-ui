// src/pages/RepoDashboard.jsx
import React from "react";
import { useParams } from "react-router-dom";
import RepoDetails from "./RepoDetails";
import Readme from "./Readme";
import CommitActivity from "./CommitActivity";
import Contributors from "./Contributors";
import Languages from "./Languages";
import Gists from "./Gists";
import { downloadRepoZip } from "../services/githubApi";

const sectionStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1.5rem",
  backgroundColor: "#fefefe",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const headingStyle = {
  fontSize: "1.5rem",
  marginBottom: "0.75rem",
  color: "#333",
};

const labelStyle = {
  fontWeight: "bold",
  marginRight: "0.25rem",
};

const RepoDashboard = () => {
  const { owner, repo } = useParams();

  const handleDownloadZip = () => {
    const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;
    window.open(zipUrl, "_blank");
  };


  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f6f8" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "0.75rem", color: "#1f2937" }}>
          📦 Repository Dashboard
        </h2>
        <p><span style={labelStyle}>👤 Owner:</span> {owner}</p>
        <p><span style={labelStyle}>📁 Repository:</span> {repo}</p>

        {/* ✅ Download Button */}
        <button
          onClick={handleDownloadZip}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⬇️ Download ZIP
        </button>

      </div>



      <div style={sectionStyle}>
        <h3 style={headingStyle}>📌 Repo Details</h3>
        <RepoDetails owner={owner} repo={repo} />
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>📄 README</h3>
        <Readme owner={owner} repo={repo} />
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>📊 Commit Activity</h3>
        <CommitActivity owner={owner} repo={repo} />
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>👥 Contributors</h3>
        <Contributors owner={owner} repo={repo} />
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>🧠 Languages Used</h3>
        <Languages owner={owner} repo={repo} />
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>🧾 Gists by {owner}</h3>
        <Gists username={owner} />
      </div>
    </div>
  );
};

export default RepoDashboard;
