import { useEffect, useState } from "react";
import { browseJobs, createJob } from "../services/api";

export function useBrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await browseJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (job) => {
    try {
      await createJob({
        title: job.title,
        company: job.company,
        link: job.link,
        tags: job.tags,
        status: "saved",
      });

      alert("Job saved!");
    } catch (error) {
      console.error(error);
      alert("Failed to save job");
    }
  };

  return {
    jobs,
    loading,
    saveJob,
    reload: loadJobs,
  };
}