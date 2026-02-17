import { useState } from "react";
import { API } from "../api/api";

export default function AIOverview({ wellId, curve, minDepth, maxDepth }) {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!wellId || !curve) {
      alert("Load data first before running AI.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Send as query params (backend expects this)
      const res = await API.post("/analysis/ai-analysis", null, {
        params: {
          well_id: wellId,
          curve: curve,
          min_depth: minDepth,
          max_depth: maxDepth,
        }
      });

      setResult(res.data);

    } catch (err) {
      console.error("AI failed:", err);
      alert("AI analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!curve) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-semibold mb-4">🧠 AI Interpretation</h2>

      <button
        onClick={runAI}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Analyzing..." : "Run AI Analysis"}
      </button>

      {result && (
        <div className="mt-6 border-t pt-4">

          <h3 className="font-semibold mb-2">Statistics</h3>
          <p><strong>Mean:</strong> {result.statistics.mean}</p>
          <p><strong>Std:</strong> {result.statistics.std}</p>
          <p><strong>Min:</strong> {result.statistics.min}</p>
          <p><strong>Max:</strong> {result.statistics.max}</p>
          <p><strong>Anomalies:</strong> {result.anomaly_count}</p>

          <h3 className="font-semibold mt-4 mb-2">Interpretation</h3>
          <p className="whitespace-pre-line text-gray-700">
            {result.interpretation}
          </p>
        </div>
      )}
    </div>
  );
}
