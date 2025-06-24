import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RepoDashboard from "./pages/RepoDashboard";
import Repositories from "./pages/Repositories";
import Events from "./pages/Events";
import CommitActivity from "./pages/CommitActivity";
import Contributors from "./pages/Contributors";
import Languages from "./pages/Languages";
import Starred from "./pages/Starred";
import Gists from "./pages/Gists";
import Readme from "./pages/Readme";
import RepoDetails from "./pages/RepoDetails";

const App = () => {
  const [username, setUsername] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  return (
    <Router>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/repos/:owner/:repo" element={<RepoDashboard />} />            <Route path="/repos" element={<Repositories username={username} />} />
            <Route path="/events" element={<Events username={username} />} />
            <Route path="/commit-activity" element={<CommitActivity owner={owner} repo={repo} />} />
            <Route path="/contributors" element={<Contributors owner={owner} repo={repo} />} />
            <Route path="/languages" element={<Languages owner={owner} repo={repo} />} />
            <Route path="/starred" element={<Starred username={username} />} />
            <Route path="/gists" element={<Gists username={username} />} />
            <Route path="/readme" element={<Readme owner={owner} repo={repo} />} />
            <Route path="/repo-details" element={<RepoDetails owner={owner} repo={repo} />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
    </Router>
  );
};

export default App;