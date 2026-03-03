import LoadingSpinner from "../ui/LoadingSpinner";

export default function BrowseJobsView({
  jobs,
  loading,
  saveJob,
}) {
  if (loading) return <LoadingSpinner />;

  if (jobs.length === 0) {
    return (
      <div className="text-center mt-10">
        No jobs yet.
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSave={saveJob}
        />
      ))}
    </div>
  );
}

function JobCard({ job, onSave }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">
        {job.title}
      </h3>

      <p className="text-gray-600">
        {job.company}
      </p>

      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm hover:underline mt-2 block"
      >
        View Job
      </a>

      <button
        onClick={() => onSave(job)}
        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Save to My Jobs
      </button>
    </div>
  );
}