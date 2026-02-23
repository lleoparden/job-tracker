import { useEffect, useState } from "react";
import { listJobs, updateJob, deleteJob } from "../services/api";
import JobCard from "../components/ui/JobCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function CurrentJobsPage() {
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userJobDocId, status) => {
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

  const handleDelete = async (userJobDocId) => {
    try {
      await deleteJob(userJobDocId);

      setJobs((prev) =>
        prev.filter((job) => job.userJobDocId !== userJobDocId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );

  if (jobs.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">
        No jobs yet 🚀
      </div>
    );

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.userJobDocId}
          job={job}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}