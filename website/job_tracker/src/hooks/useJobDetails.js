import { useEffect, useState } from "react";
import { getJobDetails, updateJob } from "../services/api";

export function useJobDetails(jobId) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getJobDetails(jobId);
        setJob(data);
      } catch (err) {
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jobId]);

  const saveTrackingInfo = async (userJobDocId, updates) => {
    const updated = await updateJob(userJobDocId, updates);
    setJob(updated);
    return updated;
  };

  return { job, loading, error, saveTrackingInfo };
}