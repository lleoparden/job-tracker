import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function CurrentJobsPage() {
  return (
    <div className="flex flex-col items-center text-center bg-white min-h-screen py-20">
      <div className="w-24 h-24 bg-[#20aae4]/10 rounded-3xl flex items-center justify-center mb-6">
        <TrendingUp className="w-12 h-12 text-[#20aae4]" />
      </div>
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Current Jobs</h2>
      <p className="text-gray-600 mb-8">Track all jobs you've applied to in one place.</p>
      <div className="px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <p className="text-gray-600">This feature is under development 🚀</p>
      </div>
    </div>
  );
}
