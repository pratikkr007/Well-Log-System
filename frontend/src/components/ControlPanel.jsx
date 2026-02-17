import { useState, useEffect } from "react";
import { API } from "../api/api";

export default function ControlPanel({ wellId, onLoad }) {

  const [curves, setCurves] = useState([]);
  const [curve, setCurve] = useState("");
  const [minDepth, setMinDepth] = useState(8600);
  const [maxDepth, setMaxDepth] = useState(9000);

  // 🔥 Fetch curves dynamically when wellId changes
  useEffect(() => {
    if (!wellId) return;

    const fetchCurves = async () => {
      try {
        const res = await API.get("/wells/curves", {
          params: { well_id: wellId }
        });

        const curveList = res.data.curves || [];
        setCurves(curveList);

        if (curveList.length > 0) {
          setCurve(curveList[0]); // auto-select first curve
        }

      } catch (err) {
        console.error("Failed to fetch curves:", err);
      }
    };

    fetchCurves();
  }, [wellId]);

  const handleSubmit = () => {
    if (!curve) {
      alert("No curve selected.");
      return;
    }

    onLoad({
      curve,
      minDepth: parseFloat(minDepth),
      maxDepth: parseFloat(maxDepth),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="font-semibold text-lg">Select Curve</h2>

      <div className="grid grid-cols-4 gap-4">

        {/* 🔥 Dynamic Curve Dropdown */}
        <select
          value={curve}
          onChange={(e) => setCurve(e.target.value)}
          className="border rounded-lg p-2"
        >
          {curves.length === 0 ? (
            <option>Loading...</option>
          ) : (
            curves.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))
          )}
        </select>

        <input
          type="number"
          value={minDepth}
          onChange={(e) => setMinDepth(e.target.value)}
          className="border rounded-lg p-2"
        />

        <input
          type="number"
          value={maxDepth}
          onChange={(e) => setMaxDepth(e.target.value)}
          className="border rounded-lg p-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
        >
          Load Data
        </button>

      </div>
    </div>
  );
}
