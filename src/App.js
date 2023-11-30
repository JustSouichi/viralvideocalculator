import React, { useState, useEffect } from 'react';

function ViralityCalculator() {
  const [videoMetrics, setVideoMetrics] = useState({
    views: '',
    likes: '',
    shares: '',
    comments: '',
  });
  const [weights,] = useState({
    views: 0.4,
    likes: 0.3,
    shares: 0.2,
    comments: 0.1,
  });
  const [viralityThreshold,] = useState(100000);
  const [compositeScore, setCompositeScore] = useState(0);
  const [viralityPercentage, setViralityPercentage] = useState(0);

  useEffect(() => {
    calculateMetrics();
  }, [videoMetrics]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVideoMetrics(prevMetrics => ({
      ...prevMetrics,
      [name]: value,
    }));
  };

  const calculateMetrics = () => {
    const values = Object.values(videoMetrics).map(val => val === '' ? 0 : parseFloat(val));
    const calculatedCompositeScore = 
      values[0] * weights.views +
      values[1] * weights.likes +
      values[2] * weights.shares +
      values[3] * weights.comments;
    setCompositeScore(calculatedCompositeScore);

    const calculatedViralityPercentage =
      (calculatedCompositeScore / viralityThreshold) * 100;
    setViralityPercentage(calculatedViralityPercentage);
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-8">TikTok Virality Score Calculator</h1>
      <div className="max-w-sm w-full bg-white bg-opacity-20 rounded-xl p-8 shadow-xl">
        <p className="text-gray-300 mb-6">Input your video metrics below:</p>
        <div className="space-y-6">
          {Object.keys(videoMetrics).map(metric => (
            <input
              key={metric}
              className="w-full p-3 text-gray-800 bg-transparent border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-300 transition-all"
              type="number"
              name={metric}
              placeholder={`${metric.charAt(0).toUpperCase() + metric.slice(1)}`}
              value={videoMetrics[metric]}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-2xl">Score: {compositeScore.toFixed(2)}</p>
          <p className="text-2xl">Virality: {viralityPercentage.toFixed(2)}%</p>
          <p className={`mt-3 text-xl font-semibold ${viralityPercentage >= 100 ? 'text-green-400' : 'text-red-400'}`}>
            {viralityPercentage >= 100 ? 'High Virality Potential!' : 'Keep Trying!'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViralityCalculator;
