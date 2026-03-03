import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useJobDetails } from "../hooks/useJobDetails";
import JobTrackingSection from "../components/job/JobTrackingSection";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { job, loading, error, saveTrackingInfo } =
    useJobDetails(jobId);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800"
      >
        ← Back
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">

        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-xl text-gray-600">{job.company}</p>
        </div>

        {job.description && (
          <div>
            <h2 className="font-semibold">Job Description</h2>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>
        )}

        <JobTrackingSection
          job={job}
          onSave={saveTrackingInfo}
        />

      </div>
    </div>
  );
}