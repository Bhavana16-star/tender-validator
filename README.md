# Tender Compliance Validator

## Project Title
Tender Compliance Validator

## The Problem
Reviewing complex Request for Proposal (RFP) documents and matching them manually against vendor proposals is an extremely time-consuming and error-prone process. Organizations face significant contractual and financial risks if they accidentally overlook critical missing requirements or fail to flag problematic clauses hidden deep within lengthy vendor submissions.

## The Solution
The Tender Compliance Validator automates the auditing of vendor proposals using AI. Users simply upload their RFP and a vendor proposal, and the platform automatically extracts the core requirements, cross-references them against the proposal text, and generates a comprehensive compliance dashboard. It highlights exact matches, flags missing or insufficient responses, and conducts a specialized risk analysis to alert reviewers to potentially dangerous contractual language, dramatically speeding up the procurement process.

## Tech Stack
* **Frontend:** React, Tailwind CSS, Vite, Radix/Lucide Icons
* **Backend:** FastAPI (Python)
* **APIs / AI Iteration:** Custom AI pipeline
* **Storage/State:** Local file uploads / React State

## Setup Instructions

### 1. Run the Backend (FastAPI)
Open a terminal in the root directory of the project:
```bash
# Create and activate a virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

# Install dependencies 
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload
```
The backend will run on `http://localhost:8000`.

### 2. Run the Frontend (React/Vite)
Open a *new* separate terminal window in the root directory:
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (only required the first time)
npm install

# Start the Vite development server
npm run dev
```
The frontend will typically run on `http://localhost:5173`. Click the link provided in the terminal to view the application in your browser.
