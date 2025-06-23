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
      <div style={{ display: "flex" }}>
{/*         <nav style={{ padding: 20, borderRight: "1px solid #ccc", minWidth: 200 }}> */}
{/*           <h3>GitHub Tracker</h3> */}
{/*           <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /> */}
{/*           <input placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} /> */}
{/*           <input placeholder="Repo" value={repo} onChange={(e) => setRepo(e.target.value)} /> */}
{/*           <ul style={{ listStyle: "none", padding: 0 }}> */}
{/*             <li><Link to="/repos">Repositories</Link></li> */}
{/*             <li><Link to="/events">Events</Link></li> */}
{/*             <li><Link to="/commit-activity">Commit Activity</Link></li> */}
{/*             <li><Link to="/contributors">Contributors</Link></li> */}
{/*             <li><Link to="/languages">Languages</Link></li> */}
{/*             <li><Link to="/starred">Starred</Link></li> */}
{/*             <li><Link to="/gists">Gists</Link></li> */}
{/*             <li><Link to="/readme">Readme</Link></li> */}
{/*             <li><Link to="/repo-details">Repo Details</Link></li> */}
{/*           </ul> */}
{/*         </nav> */}

        <div style={{ padding: 20, flex: 1 }}>
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
        </div>
      </div>
    </Router>
  );
};

export default App;