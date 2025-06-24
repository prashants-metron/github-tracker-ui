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

  if (!gists.length) {
    return <p>No gists found for user <strong>{username}</strong>.</p>;
  }

  return (
    <div className="space-y-4">
      {gists.map((gist) => (
        <div
          key={gist.id}
          className="bg-white p-4 rounded-xl shadow border border-gray-200"
        >
          <a
            href={gist.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold text-lg"
          >
            {gist.description || "No description"}
          </a>
          <p className="text-sm text-gray-600 mt-1">
            📝 Files: {Object.keys(gist.files).join(", ")}
          </p>
          <p className="text-sm text-gray-500">
            📅 Updated: {new Date(gist.updated_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Gists;
