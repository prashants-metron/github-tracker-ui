// src/services/githubApi.js
import axios from "axios";
import axiosRetry from "axios-retry";


const BASE_URL = "https://githubrepoextract.onrender.com/api/github";

const axiosInstance = axios.create();

axiosRetry(axiosInstance, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => retryCount * 1000, // wait 1s, 2s, 3s...
  retryCondition: (error) => {
    return error.response?.status === 500 || error.code === "ECONNABORTED";
  },
});

export const getRepos = (username, page = 1, size = 10) =>
  axiosInstance.get(`${BASE_URL}/repos`, { params: { username, page, size } });

export const getEvents = (username, page = 1, size = 10) =>
  axiosInstance.get(`${BASE_URL}/events`, { params: { username, page, size } });

export const getCommitActivity = (owner, repo) =>
  axiosInstance.get(`${BASE_URL}/commit-activity`, { params: { owner, repo } });

export const getContributors = (owner, repo) =>
  axiosInstance.get(`${BASE_URL}/contributors`, { params: { owner, repo } });

export const getLanguages = (owner, repo) =>
  axiosInstance.get(`${BASE_URL}/languages`, { params: { owner, repo } });

export const getStarredRepos = (username) =>
  axiosInstance.get(`${BASE_URL}/starred`, { params: { username } });

export const getGists = (username) =>
  axiosInstance.get(`${BASE_URL}/gists`, { params: { username } });

export const getReadme = (owner, repo) =>
  axiosInstance.get(`${BASE_URL}/readme`, { params: { owner, repo } });

export const getRepoDetails = (owner, repo) =>
  axiosInstance.get(`${BASE_URL}/repo-details`, { params: { owner, repo } });

export const downloadRepoZip = (owner, repo, branch = "main") =>
  axiosInstance.get(`${BASE_URL}/download-repo`, {
    params: { owner, repo, branch },
    responseType: "blob",
  });
