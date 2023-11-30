import React, { useState, useEffect } from 'react';

function App() {
  const [videoMetrics, setVideoMetrics] = useState({
    views: '',
    likes: '',
    shares: '',
    comments: '',
  });
  const [compositeScore, setCompositeScore] = useState(0);
  const [viralityPercentage, setViralityPercentage] = useState(0);

  const weights = {
    views: 0.4,
    likes: 0.3,
    shares: 0.2,
    comments: 0.1,
  };
  const viralityThreshold = 100000;

  useEffect(() => {
    calculateMetrics();
  }, [videoMetrics]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVideoMetrics(prevMetrics => ({
      ...prevMetrics,
      [name]: value === '' ? '' : Number(value),
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
    setViralityPercentage((calculatedCompositeScore / viralityThreshold) * 100);
  };

  const getViralityFeedback = (percentage) => {
    if (percentage >= 100) return 'Very High Virality Potential!';
    if (percentage >= 75) return 'High Virality Potential!';
    if (percentage >= 50) return 'Moderate Virality Potential';
    if (percentage >= 25) return 'Low Virality';
    return 'Keep Trying!';
  };

  const getFeedbackClass = (percentage) => {
    if (percentage >= 100) return 'text-green-500';
    if (percentage >= 75) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    if (percentage >= 25) return 'text-orange-400';
    return 'text-red-500';
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-screen flex flex-col justify-center items-center text-black">
      <h1 className="text-4xl font-bold mb-8">TikTok Virality Score Calculator</h1>
      <h2 className="text-2xl font-semibold mb-4">Add the value from the video</h2>
      <div className="space-y-4 mb-4">
        {Object.keys(videoMetrics).map(metric => (
          <input
            key={metric}
            className="w-full p-2 text-gray-800 bg-transparent border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-300 transition-all"
            type="number"
            name={metric}
            placeholder={`${metric.charAt(0).toUpperCase() + metric.slice(1)} (e.g., ${metric === 'views' ? '10000' : '100'})`}
            value={videoMetrics[metric]}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="text-2xl">Score: {compositeScore.toFixed(2)}</p>
        <p className="text-2xl">Virality: {viralityPercentage.toFixed(2)}%</p>
        <p className={`mt-3 text-xl font-semibold ${getFeedbackClass(viralityPercentage)}`}>
          {getViralityFeedback(viralityPercentage)}
        </p>
      </div>
    </div>
  );
}

export default App;
