# Task Manager (Trello Clone)

## Getting Started

This project is a Trello-like task manager with a Vue 3 frontend and Node.js/Express/MongoDB backend. You can run it using Docker (recommended) or manually.

---

## 🚀 Quick Start with Docker (Recommended)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AntonOlieinikov32/uran-test
   cd uran-test
   ```

2. **Build and start all services:**

   ```bashs
   docker-compose up --build
   ```

3. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3001/api](http://localhost:3001/api)
   - MongoDB: localhost:27017 (default, for development)

---

## ⚙️ Manual Setup (Without Docker)

### Backend

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up your MongoDB connection in `.env` or use the default in `docker-compose.yml`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/task-manager
   PORT=3001
   ```
3. Start the backend:
   ```bash
   npm run dev
   # or for production
   npm run build && npm start
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Set the API URL in `.env` (optional, defaults to localhost):
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 Ports

- **Frontend:** `5173` (default, can be changed in `frontend/vite.config.ts` and `docker-compose.yml`)
- **Backend:** `3001` (default, can be changed in `backend/.env` and `docker-compose.yml`)
- **MongoDB:** `27017` (default, can be changed in `docker-compose.yml`)

If you change any ports, update them in both the Docker Compose file and the relevant `.env` or config files.

---

## 🛠️ Customization

- To change ports, edit `docker-compose.yml` and the respective `.env` or config files in `frontend` and `backend`.
- For development, you can mount local folders as volumes in Docker for hot-reloading.

---

## 📦 Tech Stack

- **Frontend:** Vue 3, Vite, Pinia
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **DevOps:** Docker, Docker Compose

---
