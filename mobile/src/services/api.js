//api.js
import { getAuth } from 'firebase/auth';

const BACKEND_URL = 'http://192.168.1.134:8000/'; 

// Helper: get Firebase ID token
const getIdToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');
  return user.getIdToken();
};

// Create a new job
export const createJob = async (jobData) => {
  const token = await getIdToken();
  const res = await fetch(`${BACKEND_URL}jobs/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData)
  });
  if (!res.ok) throw new Error('Failed to create job');
  return res.json();
};

// Get all jobs for the current user
export const listJobs = async () => {
  const token = await getIdToken();
  const res = await fetch(`${BACKEND_URL}jobs/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
};

// Update a user-specific job
export const updateJob = async (jobId, updates) => {
  const token = await getIdToken();
  const res = await fetch(`${BACKEND_URL}jobs/${jobId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update job');
  return res.json();
};

// Delete a user-specific job
export const deleteJob = async (jobId) => {
  const token = await getIdToken();
  const res = await fetch(`${BACKEND_URL}jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete job');
  return res.json();
};

// Fetch job info from LinkedIn link
export async function fetchJobFromLink(url) {
  const token = await getIdToken(); // reuse your helper

  const res = await fetch(`${BACKEND_URL}scraper/fetch-job?url=${encodeURIComponent(url)}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to fetch job");
  }

  return res.json();
}

// Get all global jobs (browse page)
export const browseJobs = async () => {
  const token = await getIdToken();
  const res = await fetch(`${BACKEND_URL}jobs/browse`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch browse jobs");
  return res.json();
};

export const getJobDetails = async (jobId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${BACKEND_URL}jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch job details");
  }

  return response.json();
};