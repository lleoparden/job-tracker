import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

export default function AuthForm({ auth }) {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuth = async () => {
    setError('');
    setIsProcessing(true);

    try {
      if (authMode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModeSwitch = (mode) => {
    setAuthMode(mode);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
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
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative z-10 animate-slide-in">
        {/* Logo/Title with gradient */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#20aae4] to-[#1d99c9] bg-clip-text text-transparent mb-2">
            JobTracker
          </h1>
          <p className="text-gray-600 text-sm">
            {authMode === 'login' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Mode toggle with sliding indicator */}
        <div className="relative bg-gray-100 rounded-xl p-1 mb-6">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#20aae4] rounded-lg shadow-md transition-all duration-300 ease-out ${
              authMode === 'register' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
            }`}
          ></div>
          <div className="relative flex gap-2">
            <button
              onClick={() => handleModeSwitch('login')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-colors duration-300 ${
                authMode === 'login'
                  ? 'text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleModeSwitch('register')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-colors duration-300 ${
                authMode === 'register'
                  ? 'text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form inputs with stagger animation */}
        <div className="space-y-4">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              disabled={isProcessing}
            />
          </div>
          
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20aae4] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              disabled={isProcessing}
            />
          </div>

          {/* Error message with shake animation */}
          {error && (
            <div className="animate-shake">
              <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                {error}
              </p>
            </div>
          )}

          {/* Submit button with loading animation */}
          <button
            onClick={handleAuth}
            disabled={isProcessing}
            className="w-full py-3 bg-gradient-to-r from-[#20aae4] to-[#1d99c9] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                authMode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Footer text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => handleModeSwitch(authMode === 'login' ? 'register' : 'login')}
            className="text-[#20aae4] font-semibold hover:underline transition-all duration-300 hover:text-[#1d99c9]"
          >
            {authMode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}