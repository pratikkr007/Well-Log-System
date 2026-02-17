import { useState } from "react";
import Layout from "./components/Layout";
import UploadCard from "./components/UploadCard";
import ControlPanel from "./components/ControlPanel";
import PlotSection from "./components/PlotSection";
import AIOverview from "./components/AIOverview";
import { API } from "./api/api";
import Chatbot from "./components/Chatbot";


export default function App() {
  const [wellId, setWellId] = useState(null);
  const [data, setData] = useState(null);
  const [selection, setSelection] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load curve data
  const handleLoad = async (sel) => {
    if (!wellId) return;

    try {
      setLoading(true);

      const res = await API.get("wells/data", {
        params: {
          well_id: wellId,
          curve: sel.curve,
          min_depth: sel.minDepth,
          max_depth: sel.maxDepth,
        },
      });

      setData(res.data);
      setSelection(sel);

    } catch (err) {
      console.error("Data load failed:", err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      {/* Upload Section */}
      <UploadCard setWellId={setWellId} />

      {/* Show rest only after upload */}
      {wellId && (
        <>
          {/* Curve Control Panel */}
          <ControlPanel
            wellId={wellId}
            onLoad={handleLoad}
          />

          {/* Plot Section */}
          <PlotSection
            data={data}
            loading={loading}
          />

          {/* AI Overview */}
          {selection && (
            <AIOverview
              wellId={wellId}
              curve={selection.curve}
              minDepth={selection.minDepth}
              maxDepth={selection.maxDepth}
            />
            
          )}
        </>
      )}
      <Chatbot wellId={wellId} selection={selection} />

    </Layout>
  );
}
