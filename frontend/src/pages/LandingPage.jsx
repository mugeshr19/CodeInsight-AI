import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
            <span className="text-indigo-400 text-sm font-semibold">🚀 AI-Powered Code Analysis</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-white">
            CodeInsight AI
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Transform your coding skills with intelligent analysis, real-time feedback, and personalized learning paths
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              to="/register"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-xl shadow-indigo-500/30"
            >
              Start Analyzing Free
            </Link>
            <Link 
              to="/login"
              className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-lg hover:bg-slate-700 transition font-semibold"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { 
              icon: '⚡', 
              title: 'Lightning Fast Analysis', 
              desc: 'Get instant AI-powered feedback on your code with advanced complexity detection'
            },
            { 
              icon: '🎯', 
              title: 'Pinpoint Weak Spots', 
              desc: 'Identify exact areas needing improvement with intelligent concept detection'
            },
            { 
              icon: '📈', 
              title: 'Track Your Growth', 
              desc: 'Visualize progress with beautiful analytics and personalized insights'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:border-indigo-500/50 transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-12 rounded-2xl"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10K+', label: 'Code Analyses' },
              { value: '99%', label: 'Accuracy Rate' },
              { value: '3+', label: 'Languages' },
              { value: '24/7', label: 'AI Available' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
