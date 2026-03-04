import api from "./api";

// ─── User Jobs (current user's tracked jobs) ──────────────────────────────────

export const listJobs = async () => {
  const res = await api.get("/jobs/");
  return res.data;
};

export const createJob = async (jobData) => {
  const res = await api.post("/jobs/", jobData);
  return res.data;
};

export const updateJob = async (jobId, updates) => {
  const res = await api.patch(`/jobs/${jobId}`, updates);
  return res.data;
};

export const deleteJob = async (jobId) => {
  const res = await api.delete(`/jobs/${jobId}`);
  return res.data;
};

export const getJobDetails = async (jobId) => {
  const res = await api.get(`/jobs/${jobId}`);
  return res.data;
};

// ─── Browse (global jobs collection) ─────────────────────────────────────────

export const browseJobs = async () => {
  const res = await api.get("/jobs/browse");
  return res.data;
};

// ─── Scraper ──────────────────────────────────────────────────────────────────

export const fetchJobFromLink = async (url) => {
  const res = await api.get("/scraper/fetch-job", {
    params: { url },
  });
  return res.data;
};