import { useNavigate } from "react-router-dom";




export default function JobCard({ job, onStatusChange, onDelete }) {
  const statusColors = {
    saved: "bg-blue-100 text-blue-700",
    applied: "bg-green-100 text-green-700",
    interview: "bg-yellow-100 text-yellow-700",
    offer: "bg-purple-100 text-purple-700",
    rejection: "bg-red-100 text-red-700",
  };

  const navigate = useNavigate();

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>

      <div className="mt-2">
        <select
          value={job.status}
          onChange={(e) =>
            onStatusChange(job.userJobDocId, e.target.value)
          }
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejection">Rejection</option>
        </select>
      </div>

      

      <div className="flex justify-between items-center mt-4">
       <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="text-blue-600 text-sm hover:underline"
        >
          View Details
        </button>

        <button
          onClick={() => onDelete(job.userJobDocId)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}