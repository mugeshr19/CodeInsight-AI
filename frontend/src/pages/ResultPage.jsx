import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen pt-24 px-6 text-center">
        <p>No analysis result found</p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 px-6 py-2 gradient-bg rounded-lg">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Analysis Results
          </h1>
          <p className="text-gray-400">{result.problemTitle}</p>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-3 text-red-400">Why Code Failed</h2>
            <p className="text-gray-300">{result.whyFailed}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-3 text-yellow-400">Time Complexity</h2>
              <p className="text-2xl font-mono text-white">{result.detectedComplexity}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
            >
              <h2 className="text-xl font-bold mb-3 text-purple-400">Weak Concepts</h2>
              <div className="flex flex-wrap gap-2">
                {result.weakConcepts?.map((concept, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {concept}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-3 text-green-400">Optimization Suggestion</h2>
            <p className="text-gray-300">{result.optimizationSuggestion}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-3 text-blue-400">Approach Hint</h2>
            <p className="text-gray-300">{result.approachHint}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-3 text-orange-400">Topics to Revise</h2>
            <ul className="list-disc list-inside space-y-2">
              {result.topicsToRevise?.map((topic, i) => (
                <li key={i} className="text-gray-300">{topic}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-xl shadow-indigo-500/30"
          >
            Analyze Another Code
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
