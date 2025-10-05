import React, { useState } from 'react';
import { Plus, Link2, Briefcase, Building2, Tag, FileText, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';

export default function AddJobPage() {
  const [formData, setFormData] = useState({
    jobLink: '',
    title: '',
    company: '',
    notes: '',
    tags: '',
    status: 'saved'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputMode, setInputMode] = useState('link'); // 'link' or 'manual'

  const handleSubmit = () => {
    if (inputMode === 'link' && !formData.jobLink.trim()) return;
    if (inputMode === 'manual' && (!formData.title.trim() || !formData.company.trim())) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setFormData({
        jobLink: '',
        title: '',
        company: '',
        notes: '',
        tags: '',
        status: 'saved'
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statusOptions = [
    { value: 'saved', label: 'Saved', color: 'bg-gray-100 text-gray-700' },
    { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-700' },
    { value: 'interview', label: 'Interview', color: 'bg-purple-100 text-purple-700' },
    { value: 'offer', label: 'Offer', color: 'bg-green-100 text-green-700' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 relative overflow-hidden">
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes success {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-success {
          animation: success 0.5s ease-out;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-8 right-8 z-50 animate-success">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Job saved successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#20aae4] to-[#1d99c9] bg-clip-text text-transparent mb-4">
            Add Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">Track every opportunity and land your perfect role</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-12 animate-slide-up">
          {/* Mode Toggle */}
          <div className="relative bg-gray-100 rounded-xl p-1 mb-8 max-w-md mx-auto">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#20aae4] to-[#1d99c9] rounded-lg shadow-md transition-all duration-300 ease-out ${
                inputMode === 'manual' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
              }`}
            ></div>
            <div className="relative flex gap-2">
              <button
                onClick={() => setInputMode('link')}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 ${
                  inputMode === 'link' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Link2 className="w-4 h-4" />
                Quick Add (Link)
              </button>
              <button
                onClick={() => setInputMode('manual')}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 ${
                  inputMode === 'manual' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Plus className="w-4 h-4" />
                Manual Entry
              </button>
            </div>
          </div>

          {/* Form Content */}
          {inputMode === 'link' ? (
            <div className="space-y-4 animate-slide-up">
              <div className="relative group">
                <Link2 className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#20aae4] transition-colors" />
                <textarea
                  value={formData.jobLink}
                  onChange={(e) => updateField('jobLink', e.target.value)}
                  placeholder="Paste job link here (e.g., LinkedIn, Indeed, company career page)..."
                  className="w-full h-40 pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm"
                  disabled={isProcessing}
                />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
              <div className="relative group">
                <Briefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#20aae4] transition-colors" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Job Title *"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  disabled={isProcessing}
                />
              </div>

              <div className="relative group">
                <Building2 className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#20aae4] transition-colors" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Company Name *"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  disabled={isProcessing}
                />
              </div>

              <div className="relative group">
                <Link2 className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#20aae4] transition-colors" />
                <input
                  type="url"
                  value={formData.jobLink}
                  onChange={(e) => updateField('jobLink', e.target.value)}
                  placeholder="Job Link (Optional)"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  disabled={isProcessing}
                />
              </div>

              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                  disabled={isProcessing}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="relative group md:col-span-2">
                <Tag className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#20aae4] transition-colors" />
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="Tags (comma separated, e.g., Remote, Full-time, Senior)"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  disabled={isProcessing}
                />
              </div>

              <div className="relative group md:col-span-2">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#20aae4] transition-colors" />
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Notes (salary range, requirements, interview dates...)"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm"
                  rows="3"
                  disabled={isProcessing}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              (inputMode === 'link' && !formData.jobLink.trim()) ||
              (inputMode === 'manual' && (!formData.title.trim() || !formData.company.trim())) ||
              isProcessing
            }
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#20aae4] to-[#1d99c9] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isProcessing ? (
                <>
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Save Job
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Lightning Fast"
            description="Save jobs in seconds with smart link parsing"
            gradient="from-yellow-400 to-orange-500"
            delay="stagger-1"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            title="Smart Tracking"
            description="Auto-organize applications by status and timeline"
            gradient="from-purple-400 to-pink-500"
            delay="stagger-2"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Analytics"
            description="Track your success rate and application trends"
            gradient="from-blue-400 to-cyan-500"
            delay="stagger-3"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient, delay }) {
  return (
    <div className={`bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up ${delay} group`}>
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 animate-float`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}