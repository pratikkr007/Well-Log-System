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

graph TD
    A[Frontend: React + Vite + Tailwind CSS] -->|REST API Requests| B[Backend: FastAPI]
    B -->|Store/Retrieve Logs| C[(PostgreSQL Database)]
    B -->|Contextual Data| D[Google Gemini API]
    D -->|AI Interpretation| B
    B -->|JSON Response| A

The system follows a decoupled architecture where the FastAPI backend handles the computational geometry of log data and forwards processed context to the Gemini API for natural language insights.

---
---

## 🛠️ Installation & Local Setup

Follow these steps to get the Well Log Analysis System running on your local machine.

### 1️⃣ Prerequisites
Ensure you have the following installed:
* **Python 3.10+**
* **Node.js 20.19+** (Required for Vite v7)
* **PostgreSQL 14+**
* **Git**

### 🗄️ 2️⃣ Database Setup (PostgreSQL)
1. **Start PostgreSQL:** Ensure your local PostgreSQL server is active.
2. **Create Database:** Open `pgAdmin` or your terminal and run:
   ```sql
   CREATE DATABASE well_log_db;

### 🔐 3️⃣ Environment Configuration

Navigate to the `backend/` directory and create a file named `.env`. Copy and paste the following template, replacing the placeholder values with your actual credentials:

```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# AWS S3 Configuration (For LAS File Storage)
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
S3_BUCKET=your_bucket_name

# PostgreSQL Connection String
# Format: postgresql://[user]:[password]@[host]:[port]/[database_name]
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/well_log_db"


### ⚙️ 4️⃣ Backend Setup

Open your terminal and execute the following commands to set up the Python environment and start the server:

```bash
# 1. Navigate to the backend directory
cd Well-Log-System/backend

# 2. Create a Virtual Environment
python -m venv .venv

# 3. Activate the Virtual Environment
# For Windows:
.venv\Scripts\activate
# For Mac/Linux:
source .venv/bin/activate

# 4. Install Backend Dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary numpy python-multipart google-generativeai python-dotenv

# 5. Start the FastAPI Server
uvicorn app.main:app --reload

5️⃣ Frontend Setup
Open a new terminal window:

Bash
cd Well-Log-System/frontend

# Install Dependencies
npm install

# Install additional packages if not already in package.json
npm install axios react-plotly.js plotly.js

# Start Development Server
npm run dev
   
---

## 🔗 Access Points

Once both servers are running, you can access the system at the following addresses:

| Component | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Main Web Interface (React/Vite) |
| **Backend API** | [http://127.0.0.1:8000](http://127.0.0.1:8000) | FastAPI Server Root |
| **API Docs** | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | Interactive Swagger Documentation |

---
