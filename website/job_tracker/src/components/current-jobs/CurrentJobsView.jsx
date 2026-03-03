import JobCard from "../ui/JobCard";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function CurrentJobsView({
  jobs,
  loading,
  error,
  changeStatus,
  removeJob,
}) {
  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No jobs yet 🚀
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.userJobDocId}
          job={job}
          onStatusChange={changeStatus}
          onDelete={removeJob}
        />
      ))}
    </div>
  );
}