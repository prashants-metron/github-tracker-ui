import React from "react";
import { Link } from "react-router-dom";

const RepoList = ({ repos, page, onPageChange, owner }) => {
  console.log('Repos:', repos);
  if (!repos.length) return <p>No repositories found.</p>;

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link
              to={`/repos/${owner}/${repo.name}`}
              onClick={(e) => {
//                 console.log('Link clicked', repo.name);
                console.log('Navigation path:', `/repos/${owner}/${repo.name}`);
              }}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>Page: {page}</span>
        <button onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default RepoList;