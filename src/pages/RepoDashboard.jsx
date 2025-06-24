// src/pages/RepoDashboard.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RepoDetails from "./RepoDetails";
import Readme from "./Readme";
import CommitActivity from "./CommitActivity";
import Contributors from "./Contributors";
import Languages from "./Languages";
import Gists from "./Gists";
import Layout from "../components/Layout";

const RepoDashboard = () => {
  const { owner, repo } = useParams();
  const [darkMode, setDarkMode] = useState(false);

  const handleDownloadZip = () => {
    const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;
    window.open(zipUrl, "_blank");
  };

  const theme = getThemeStyles(darkMode);

  return (
    <div style={theme.wrapper}>
      <div style={theme.header}>
        <h2 style={theme.title}>📦 Repository Dashboard</h2>
        <button onClick={() => setDarkMode(!darkMode)} style={theme.toggle}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <p><span style={theme.label}>👤 Owner:</span> {owner}</p>
      <p><span style={theme.label}>📁 Repository:</span> {repo}</p>

      <button onClick={handleDownloadZip} style={theme.downloadBtn}>
        ⬇️ Download ZIP
      </button>

      <div style={theme.section}>
        <h3 style={theme.heading}>📌 Repo Details</h3>
        <RepoDetails owner={owner} repo={repo} />
      </div>

      <div style={theme.section}>
        <h3 style={theme.heading}>📄 README</h3>
        <Readme owner={owner} repo={repo} />
      </div>

      <div style={theme.section}>
        <h3 style={theme.heading}>📊 Commit Activity</h3>
        <CommitActivity owner={owner} repo={repo} />
      </div>

      <div style={theme.section}>
        <h3 style={theme.heading}>👥 Contributors</h3>
        <Contributors owner={owner} repo={repo} />
      </div>

      <div style={theme.section}>
        <h3 style={theme.heading}>🧠 Languages Used</h3>
        <Languages owner={owner} repo={repo} />
      </div>

      <div style={theme.section}>
        <h3 style={theme.heading}>🧾 Gists by {owner}</h3>
        <Gists username={owner} />
      </div>
    </div>
  );
};

const getThemeStyles = (darkMode) => ({
  wrapper: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: darkMode ? "#121212" : "#f4f6f8",
    color: darkMode ? "#f0f0f0" : "#000",
    minHeight: "100vh",
    transition: "all 0.3s ease-in-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2.5rem",
    color: darkMode ? "#f8fafc" : "#1f2937",
  },
  label: {
    fontWeight: "bold",
    marginRight: "0.25rem",
  },
  toggle: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: darkMode ? "#ffc107" : "#333",
  },
  downloadBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "2rem",
  },
  section: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
    backgroundColor: darkMode ? "#1e1e1e" : "#fefefe",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "0.75rem",
    color: darkMode ? "#90cdf4" : "#333",
  },
});

export default RepoDashboard;
