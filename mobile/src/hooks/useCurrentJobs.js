//useCurrentJobs.js
import { useEffect, useState } from "react";
import { listJobs, updateJob, deleteJob } from "../services/api";

export function useCurrentJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await listJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (userJobDocId, status) => {
    try {
      const updated = await updateJob(userJobDocId, { status });

      setJobs((prev) =>
        prev.map((job) =>
          job.userJobDocId === userJobDocId ? updated : job
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeJob = async (userJobDocId) => {
    try {
      await deleteJob(userJobDocId);

      setJobs((prev) =>
        prev.filter((job) => job.userJobDocId !== userJobDocId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return {
    jobs,
    loading,
    error,
    changeStatus,
    removeJob,
    reload: loadJobs,
  };
}