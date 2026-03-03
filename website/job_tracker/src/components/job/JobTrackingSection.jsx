import { useState } from "react";

export default function JobTrackingSection({ job, onSave }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formState, setFormState] = useState({
    status: job.status || "saved",
    notes: job.notes || ""
  });

  if (!job.userJobDocId) {
    return (
      <div className="text-gray-500 text-sm">
        You are not tracking this job.
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(job.userJobDocId, formState);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h2 className="font-semibold">Your Tracking Info</h2>

        {!editing ? (
          <button onClick={() => setEditing(true)}>
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}>
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
              setFormState({
                ...formState,
                status: e.target.value
              })
            }
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

      {/* Notes */}
      <div>
        <strong>Your Notes:</strong>
        {editing ? (
          <textarea
            value={formState.notes}
            onChange={(e) =>
              setFormState({
                ...formState,
                notes: e.target.value
              })
            }
            rows={4}
          />
        ) : (
          <div className="mt-2 bg-gray-50 p-4 rounded">
            {job.notes || "No private notes added."}
          </div>
        )}
      </div>
    </div>
  );
}