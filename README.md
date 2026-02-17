# 🛢️ Well Log Analysis System

A modern, web-based platform for petrophysical data visualization, statistical analysis, and AI-driven interpretation. This system transforms raw LAS (Log ASCII Standard) files into actionable geological insights.

---

## 🚀 Key Features

* **LAS File Management:** Seamlessly upload and parse `.las` files.
* **Dynamic Visualization:** Interactive multi-track log plots powered by **Plotly**.
* **Statistical Analysis:** Automated calculation of key metrics (mean, min, max, standard deviation) across depth intervals.
* **AI Interpretation:** Leverages **Google Gemini API** to provide lithology descriptions and reservoir quality assessments.
* **Log Chatbot:** A context-aware Q&A bot to query specific well data points using natural language.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS v4, Plotly.js |
| **Backend** | FastAPI (Python 3.10+) |
| **Database** | PostgreSQL |
| **AI Engine** | Google Gemini API |
| **Data Handling** | Lasio, Pandas, NumPy |

---

## 🏗️ Architecture



The system follows a decoupled architecture where the FastAPI backend handles the computational geometry of log data and forwards processed context to the Gemini API for natural language insights.

---

