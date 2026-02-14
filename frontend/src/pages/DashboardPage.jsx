import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { analysisAPI } from '../services/api';

const DashboardPage = () => {
  const [formData, setFormData] = useState({
    problemTitle: '',
    problemDescription: '',
    code: '// Write your code here\n\npublic class Solution {\n    \n}',
    language: 'java'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!formData.problemTitle || !formData.problemDescription || !formData.code) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await analysisAPI.analyzeCode(formData);
      navigate('/result', { state: { result: response.data.data } });
    } catch (error) {
      alert('Analysis failed: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-3 text-white">
            Code Analysis Studio
          </h1>
          <p className="text-gray-400">Submit your code and get instant AI-powered insights</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl space-y-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                📝
              </div>
              <h2 className="text-xl font-bold text-white">Problem Details</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-300">Problem Title</label>
                <input
                  type="text"
                  value={formData.problemTitle}
                  onChange={(e) => setFormData({ ...formData, problemTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/70 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="e.g., Two Sum Problem"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-300">Problem Description</label>
                <textarea
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/70 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition h-36 resize-none"
                  placeholder="Describe the problem in detail..."
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-300">Programming Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/70 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
                >
                  <option value="java">☕ Java</option>
                  <option value="python">🐍 Python</option>
                  <option value="c++">⚡ C++</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-xl">
                💻
              </div>
              <h2 className="text-xl font-bold text-white">Code Editor</h2>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-slate-700">
              <Editor
                height="450px"
                language={formData.language === 'c++' ? 'cpp' : formData.language}
                theme="vs-dark"
                value={formData.code}
                onChange={(value) => setFormData({ ...formData, code: value })}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'Consolas, Monaco, monospace',
                  lineHeight: 22,
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Analyze Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-12 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow-xl shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Your Code...
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                ⚡ Analyze Code with AI
              </span>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
