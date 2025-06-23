// src/services/githubApi.js
import axios from "axios";

const BASE_URL = "https://githubrepoextract.onrender.com/api/github";

export const getRepos = (username, page = 1, size = 10) =>
  axios.get(`${BASE_URL}/repos`, { params: { username, page, size } });

export const getEvents = (username, page = 1, size = 10) =>
  axios.get(`${BASE_URL}/events`, { params: { username, page, size } });

export const getCommitActivity = (owner, repo) =>
  axios.get(`${BASE_URL}/commit-activity`, { params: { owner, repo } });

export const getContributors = (owner, repo) =>
  axios.get(`${BASE_URL}/contributors`, { params: { owner, repo } });

export const getLanguages = (owner, repo) =>
  axios.get(`${BASE_URL}/languages`, { params: { owner, repo } });

export const getStarredRepos = (username) =>
  axios.get(`${BASE_URL}/starred`, { params: { username } });

export const getGists = (username) =>
  axios.get(`${BASE_URL}/gists`, { params: { username } });

export const getReadme = (owner, repo) =>
  axios.get(`${BASE_URL}/readme`, { params: { owner, repo } });

export const getRepoDetails = (owner, repo) =>
  axios.get(`${BASE_URL}/repo-details`, { params: { owner, repo } });

export const downloadRepoZip = (owner, repo, branch = "main") =>
  axios.get(`${BASE_URL}/download-repo`, {
    params: { owner, repo, branch },
    responseType: "blob",
  });
