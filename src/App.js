import React, { useState } from "react";

export default function App(){

  const [videoMetrics, setVideoMetrics] = useState({
    views: '',
    likes: '',
    shares: '',
    comments: '',
  });
  const [weights, setWeights] = useState({
    views: 0.4,
    likes: 0.3,
    shares: 0.2,
    comments: 0.1,
  });
  const [viralityThreshold, setViralityThreshold] = useState(100000);
  const [compositeScore, setCompositeScore] = useState(0);
  const [viralityPercentage, setViralityPercentage] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVideoMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: parseFloat(value) || 0, // Parse input to a float or default to 0 if not a valid number
    }));
  };

  const calculateMetrics = () => {
    const calculatedCompositeScore =
      videoMetrics.views * weights.views +
      videoMetrics.likes * weights.likes +
      videoMetrics.shares * weights.shares +
      videoMetrics.comments * weights.comments;
    setCompositeScore(calculatedCompositeScore);

    const calculatedViralityPercentage =
      (calculatedCompositeScore / viralityThreshold) * 100;
    setViralityPercentage(calculatedViralityPercentage);
  };

  return(
    <>
  <div className="flex flex-col items-center">
    <p className="text-center text-2xl mt-10">
      TikTok Viral Video Calculator
    </p>
    <div class="bg-white rounded-lg shadow-lg p-6 text-center text-2xl mt-10">
      <h1 class="text-xl font-semibold mb-4">TikTok Viral Video Calculator</h1>
      <p class="text-gray-600">Put your values here</p>
      <div>
        <label>
          Views:
          <input
            type="number"
            name="views"
            value={videoMetrics.views}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Likes:
          <input
            type="number"
            name="likes"
            value={videoMetrics.likes}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Shares:
          <input
            type="number"
            name="shares"
            value={videoMetrics.shares}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Comments:
          <input
            type="number"
            name="comments"
            value={videoMetrics.comments}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <button onClick={calculateMetrics}>Calculate</button>
      </div>
      <div>
        <p>Composite Score: {compositeScore}</p>
        <p>Virality Percentage: {viralityPercentage.toFixed(2)}%</p>
        {viralityPercentage >= 100 ? (
          <p>This video is likely to go viral on TikTok!</p>
        ) : (
          <p>This video may not go viral on TikTok.</p>
        )}
      </div>
    </div>
  </div>
    </>
  )
}