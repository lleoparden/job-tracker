import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { getJobDetails, updateJob } from "../services/api";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formState, setFormState] = useState({
    status: "",
    notes: ""
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        const data = await getJobDetails(jobId);
        setJob(data);

        if (data.userJobDocId) {
          setFormState({
            status: data.status || "saved",
            notes: data.notes || ""
          });
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleSave = async () => {
    if (!job?.userJobDocId) return;

    try {
      setSaving(true);

      const updated = await updateJob(job.userJobDocId, {
        status: formState.status,
        notes: formState.notes
      });

      setJob(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        ← Back
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-xl text-gray-600">{job.company}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.trackerCount ?? 0} users tracking
            </span>

            {job.status && job.userJobDocId && (
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                Your Status: {job.status}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {job.description && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>
        )}

        {/* Metadata */}
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">

          {job.createdAt && (
            <div>
              <strong>Created:</strong>{" "}
              {new Date(job.createdAt).toLocaleString()}
            </div>
          )}

          {job.appliedDate && (
            <div>
              <strong>Applied Date:</strong>{" "}
              {new Date(job.appliedDate).toLocaleDateString()}
            </div>
          )}

          {job.link && (
            <div>
              <strong>External Link:</strong>{" "}
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                View Job Posting
              </a>
            </div>
          )}
        </div>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t pt-6"></div>

        {/* User Tracking Section */}
        {job.userJobDocId ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Tracking Info</h2>

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditing(false)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <strong>Status:</strong>

              {editing ? (
                <select
                  value={formState.status}
                  onChange={(e) =>
                    setFormState({ ...formState, status: e.target.value })
                  }
                  className="block mt-2 border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              ) : (
                <span className="ml-2 capitalize">{job.status}</span>
              )}
            </div>

            {/* Private Notes */}
            <div>
              <strong>Your Notes:</strong>

              {editing ? (
                <textarea
                  value={formState.notes}
                  onChange={(e) =>
                    setFormState({ ...formState, notes: e.target.value })
                  }
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3"
                  rows={4}
                />
              ) : (
                <div className="mt-2 bg-gray-50 p-4 rounded-xl whitespace-pre-line text-gray-700">
                  {job.notes && job.notes.trim().length > 0
                    ? job.notes
                    : "No private notes added."}
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500">
              Last Updated:{" "}
              {job.updatedAt
                ? new Date(job.updatedAt).toLocaleString()
                : "N/A"}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            You are not tracking this job.
          </div>
        )}
      </div>
    </div>
  );
}