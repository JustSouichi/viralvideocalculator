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
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-semibold mb-6">TikTok Virality Score Calculator</h1>
      <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg">
        <p className="text-gray-200 mb-4">Enter Your Video Metrics</p>
        <div className="space-y-4">
          {Object.keys(videoMetrics).map(metric => (
            <input
              key={metric}
              className="w-full p-3 text-gray-800 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              type="number"
              name={metric}
              placeholder={`${metric.charAt(0).toUpperCase() + metric.slice(1)}`}
              value={videoMetrics[metric]}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <p className="text-xl mt-6">Composite Score: {compositeScore.toFixed(2)}</p>
        <p className="text-xl">Virality Percentage: {viralityPercentage.toFixed(2)}%</p>
        <p className={`mt-2 text-lg ${viralityPercentage >= 100 ? 'text-green-400' : 'text-red-400'}`}>
          {viralityPercentage >= 100 ? 'High chance of going viral!' : 'Less likely to go viral.'}
        </p>
      </div>
    </div>
  );
}

export default ViralityCalculator;
