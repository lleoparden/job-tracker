export default function JobCard({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition transform hover:scale-105">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-gray-900 font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
