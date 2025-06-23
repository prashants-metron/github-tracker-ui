import React, { useEffect, useState } from "react";
import { getCommitActivity } from "../services/githubApi";

const CommitActivity = ({ owner, repo }) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (owner && repo) {
      getCommitActivity(owner, repo)
        .then((res) => setActivity(res.data))
        .catch(console.error);
    }
  }, [owner, repo]);

  return (
    <div>
      <h2>Commit Activity</h2>
      <ul>
        {activity.map((week, i) => (
          <li key={i}>Week: {new Date(week.week * 1000).toDateString()}, Commits: {week.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommitActivity;