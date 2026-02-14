import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AnalyticsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await userAPI.getSubmissions(user.userId);
      setSubmissions(response.data.data);
    } catch (error) {
      console.error('Failed to fetch submissions', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeakTopicsData = () => {
    const topicCount = {};
    submissions.forEach(sub => {
      sub.weakConcepts?.forEach(concept => {
        topicCount[concept] = (topicCount[concept] || 0) + 1;
      });
    });
    return Object.entries(topicCount).map(([name, value]) => ({ name, value }));
  };

  const getComplexityData = () => {
    const complexityCount = {};
    submissions.forEach(sub => {
      const complexity = sub.detectedComplexity?.split(' ')[0] || 'Unknown';
      complexityCount[complexity] = (complexityCount[complexity] || 0) + 1;
    });
    return Object.entries(complexityCount).map(([name, count]) => ({ name, count }));
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-xl">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-white"
        >
          Weakness Analytics
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h3 className="text-gray-400 mb-2">Total Submissions</h3>
            <p className="text-4xl font-bold text-indigo-400">{submissions.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h3 className="text-gray-400 mb-2">Languages Used</h3>
            <p className="text-4xl font-bold text-purple-400">
              {new Set(submissions.map(s => s.language)).size}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h3 className="text-gray-400 mb-2">Unique Weak Topics</h3>
            <p className="text-4xl font-bold text-orange-400">
              {getWeakTopicsData().length}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-white">Weak Topics Distribution</h2>
            {getWeakTopicsData().length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getWeakTopicsData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getWeakTopicsData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-12">No data available</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-white">Complexity Distribution</h2>
            {getComplexityData().length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getComplexityData()}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                  <Bar dataKey="count" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-12">No data available</p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl mt-6"
        >
          <h2 className="text-xl font-bold mb-4 text-white">Recent Submissions</h2>
          <div className="space-y-3">
            {submissions.slice(0, 5).map((sub, i) => (
              <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{sub.problemTitle}</h3>
                    <p className="text-sm text-gray-400">{sub.language}</p>
                  </div>
                  <span className="text-sm text-indigo-400">{sub.detectedComplexity}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
