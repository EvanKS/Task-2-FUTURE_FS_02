# Mini CRM - Client Lead Management System

A modern, professional full-stack Mini CRM web application designed to manage leads collected from website contact forms. This application provides ad dashboard for admins to authenticate and manage their incoming clients seamlessly.

## 🌟 Features

- **Secure Admin Authentication**: JWT-based login for protected routes.
- **Lead Dashboard**: View all incoming leads in a clean, comprehensive table.
- **Lead Metrics**: Real-time stats on total leads, new leads, converted leads, and conversion rates.
- **Lead Details & Notes**: Click into a single lead to see all details and add timestamped follow-up notes in a timeline view.
- **Status Workflows**: Update lead status (New, Contacted, Converted).
- **Responsive Layout**: Designed to work on desktop and tablet perfectly.
- **Dark Mode**: Effortless toggle for dark/light themes.
- **Clean UI**: Built with pure modern Vanilla CSS for maximum performance, featuring soft colors, hover effects, CSS variables, and clean component structure.

## 🧱 Tech Stack

- **Frontend**: React.js, React Router, Vite, Axios, Lucide-React for icons, Custom CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, bcryptjs

## 🚀 Setup Instructions

### Prerequisites
- Node.js installed (v16+ recommended)
- MongoDB instance (Local or Atlas) locally running on port 27017 or adjust `.env`.

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (already provided in the repository) and configure your MongoDB connection if different:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/minicrm
   JWT_SECRET=supersecretkey
   PORT=5000
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage & Access

- The application falls back to `mock data` if the backend is unavailable or empty. 
- You can register a mock admin through Postman with `POST http://localhost:5000/api/auth/register` passing `name`, `email` and `password`.
- Login with the registered credentials or use any credentials to leverage the frontend's mock functionalities (Note: The mock login handles graceful failure for demo purposes).

## 📸 Screenshots

*(To be added)*
- Dashboard Overview
- Lead Details & Timeline
- Dark Mode Interface

---
**Designed and built as a modern, scalable web app.**
