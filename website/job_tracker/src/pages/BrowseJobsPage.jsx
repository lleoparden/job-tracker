import { useEffect, useState } from "react";
import { browseJobs, createJob } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await browseJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (job) => {
    try {
      await createJob({
        title: job.title,
        company: job.company,
        link: job.link,
        tags: job.tags,
        status: "saved"
      });

      alert("Job saved!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (jobs.length === 0)
    return <div className="text-center mt-10">No jobs yet.</div>;

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>

          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm hover:underline mt-2 block"
          >
            View Job
          </a>

          <button
            onClick={() => handleSave(job)}
            className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Save to My Jobs
          </button>
        </div>
      ))}
    </div>
  );
}