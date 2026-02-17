import { useState } from "react";
import { API } from "../api/api";

export default function UploadCard({ setWellId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a LAS file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/upload", formData);

      setWellId(res.data.well_id);
      setMessage("Upload successful!");

    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">

      <h2 className="text-xl font-semibold">Upload LAS File</h2>

      {/* Custom File Button */}
      <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
        {file ? file.name : "Choose LAS File"}
        <input
          type="file"
          accept=".las"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Spinner */}
      {loading && (
        <div className="flex items-center space-x-2 text-blue-600">
          <div className="w-5 h-5 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Uploading file...</span>
        </div>
      )}

      {/* Message */}
      {message && (
        <p
          className={`text-sm font-medium ${
            message.includes("successful")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

    </div>
  );
}
