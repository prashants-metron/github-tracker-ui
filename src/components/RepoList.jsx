import React from "react";

const RepoList = ({ repos, page, onPageChange }) => {
  if (!repos.length) return <p>No repositories found.</p>;

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
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
