import { Plus, Link2, Briefcase, Building2, Tag, FileText } from "lucide-react";
import { useState } from "react";

export default function AddJobForm({
  formData,
  isProcessing,
  showSuccess,
  inputMode,
  setInputMode,
  updateField,
  fetchFromLink,
  submitJob,
}) {
  const statusOptions = [
    { value: "saved", label: "Saved" },
    { value: "applied", label: "Applied" },
    { value: "interview", label: "Interview" },
    { value: "offer", label: "Offer" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Job
        </h1>

        {showSuccess && (
          <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            Job saved successfully
          </div>
        )}

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setInputMode("link")}
            className={`flex-1 py-2 rounded-lg ${
              inputMode === "link"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            <Link2 className="inline w-4 h-4 mr-1" />
            Quick Add
          </button>

          <button
            onClick={() => setInputMode("manual")}
            className={`flex-1 py-2 rounded-lg ${
              inputMode === "manual"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            <Plus className="inline w-4 h-4 mr-1" />
            Manual
          </button>
        </div>

        {/* LINK MODE */}
        {inputMode === "link" && (
          <div className="space-y-4">
            <textarea
              value={formData.jobLink}
              onChange={(e) =>
                updateField("jobLink", e.target.value)
              }
              placeholder="Paste job link..."
              className="w-full border rounded-lg p-3"
              disabled={isProcessing}
            />

            <button
              onClick={fetchFromLink}
              disabled={isProcessing || !formData.jobLink.trim()}
              className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
              {isProcessing ? "Fetching..." : "Fetch Info"}
            </button>
          </div>
        )}

        {/* MANUAL MODE */}
        {inputMode === "manual" && (
          <ManualForm
            formData={formData}
            updateField={updateField}
            statusOptions={statusOptions}
            isProcessing={isProcessing}
          />
        )}

        {/* Submit */}
        <button
          onClick={submitJob}
          disabled={isProcessing}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {isProcessing ? "Saving..." : "Save Job"}
        </button>
      </div>
    </div>
  );
}

function ManualForm({
  formData,
  updateField,
  statusOptions,
  isProcessing,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const allTags = [
    "Remote",
    "Hybrid",
    "Full-time",
    "Part-time",
    "Internship",
    "Frontend",
    "Backend",
    "Data",
  ];

  const handleTagInput = (value) => {
    updateField("tags", value);

    if (!value) {
      setSuggestions([]);
    } else {
      const filtered = allTags.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  return (
    <div className="space-y-4">

      <input
        type="text"
        value={formData.title}
        onChange={(e) =>
          updateField("title", e.target.value)
        }
        placeholder="Job Title"
        className="w-full border rounded-lg p-3"
        disabled={isProcessing}
      />

      <input
        type="text"
        value={formData.company}
        onChange={(e) =>
          updateField("company", e.target.value)
        }
        placeholder="Company"
        className="w-full border rounded-lg p-3"
        disabled={isProcessing}
      />

      <input
        type="url"
        value={formData.jobLink}
        onChange={(e) =>
          updateField("jobLink", e.target.value)
        }
        placeholder="Job Link"
        className="w-full border rounded-lg p-3"
        disabled={isProcessing}
      />

      {formData.image && (
        <img
          src={formData.image}
          alt="Job"
          className="rounded-lg max-h-56 object-cover"
        />
      )}

      <select
        value={formData.status}
        onChange={(e) =>
          updateField("status", e.target.value)
        }
        className="w-full border rounded-lg p-3"
        disabled={isProcessing}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="relative">
        <input
          type="text"
          value={formData.tags}
          onChange={(e) =>
            handleTagInput(e.target.value)
          }
          placeholder="Tags"
          className="w-full border rounded-lg p-3"
          disabled={isProcessing}
        />

        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full rounded-lg mt-1 shadow">
            {suggestions.map((tag) => (
              <li
                key={tag}
                onClick={() => {
                  updateField("tags", tag);
                  setSuggestions([]);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <textarea
        value={formData.description}
        onChange={(e) =>
          updateField("description", e.target.value)
        }
        placeholder="Description"
        className="w-full border rounded-lg p-3"
        rows="4"
        disabled={isProcessing}
      />

      <textarea
        value={formData.notes}
        onChange={(e) =>
          updateField("notes", e.target.value)
        }
        placeholder="Private Notes"
        className="w-full border rounded-lg p-3"
        rows="3"
        disabled={isProcessing}
      />
    </div>
  );
}