# IMS - Infrastructure Management System

## 📌 Project Description
Infrastructure Management System (IMS) is a web-based application designed to manage infrastructure-related issues within an organization. 

The system allows users to report infrastructure problems, administrators to manage and assign tasks, and maintenance staff to resolve assigned issues efficiently.

---

## 🚀 Tech Stack

Frontend:
- React.js
- React Router DOM
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## 👥 User Roles

1. Admin
   - Create and manage maintenance staff accounts
   - View all reported infrastructure issues
   - Assign issues to maintenance staff
   - Monitor issue status

2. Maintenance Staff
   - Login to the system
   - View assigned infrastructure tasks
   - Update task status (Pending / In Progress / Resolved)

3. User
   - Login to the system
   - Report infrastructure issues
   - Track issue status

   ## 📂 Project Structure

IMS/
│
├── ims_backend/
├── ims_frontend/
├── docs/
├── .gitignore
└── README.md

---

## ⚙️ Installation Guide

### Backend Setup

cd ims_backend
npm install
npm run dev

### Frontend Setup

cd ims_frontend
npm install
npm run dev


---

## 🔐 Environment Variables

Create a `.env` file inside `ims_backend`:

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  

---