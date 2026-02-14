import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userAPI } from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-2xl mb-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile?.name}</h1>
              <p className="text-gray-400">{profile?.email}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-4 text-primary">Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Submissions</span>
                <span className="font-bold">{profile?.totalSubmissions || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Improvement Score</span>
                <span className="font-bold text-green-400">
                  {profile?.improvementScore?.toFixed(1) || 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Most Weak Topic</span>
                <span className="font-bold text-red-400">{profile?.mostWeakTopic || 'None'}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-4 text-secondary">Weak Topics</h2>
            <div className="space-y-2">
              {profile?.weakTopicsDistribution && Object.entries(profile.weakTopicsDistribution).length > 0 ? (
                Object.entries(profile.weakTopicsDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([topic, count], i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-300">{topic}</span>
                      <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                        {count}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="text-gray-400">No weak topics yet</p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl mt-6"
        >
          <h2 className="text-xl font-bold mb-4">Progress Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Code Optimization</span>
                <span>{profile?.improvementScore?.toFixed(0) || 0}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="gradient-bg h-3 rounded-full transition-all duration-500"
                  style={{ width: `${profile?.improvementScore || 0}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
