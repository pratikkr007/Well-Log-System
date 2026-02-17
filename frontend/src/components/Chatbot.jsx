import { useState } from "react";
import { API } from "../api/api";

export default function Chatbot({ wellId, selection }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question || !selection) return;

    const newMessages = [
      ...messages,
      { role: "user", content: question }
    ];
    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const res = await API.post("/chat/ask", null, {
        params: {
          well_id: wellId,
          curve: selection.curve,
          min_depth: selection.minDepth,
          max_depth: selection.maxDepth,
          question: question
        }
      });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.answer }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Chatbot failed." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">💬 Well Chat Assistant</h2>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">
            Ask questions about the selected well interval...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-400">AI is thinking...</p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask something about this well..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
