# Infrastructure Management System (IMS)

## Project Description

The Infrastructure Management System (IMS) is a web-based application developed to manage infrastructure-related issues within an organization. 

The system allows users to report infrastructure problems, administrators to manage and assign tasks, and maintenance staff to resolve assigned issues in a structured and efficient manner.

The application follows a role-based access system to ensure proper control and accountability in handling infrastructure requests.

---

## Technology Stack

### Frontend (Client)
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend (Server)
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## System Architecture

The system follows a client-server architecture.

User / Admin / Staff  
        ↓  
React Application (Client)  
        ↓  
Express REST API (Server)  
        ↓  
MongoDB Database  

The frontend communicates with the backend using REST APIs.  
Authentication and authorization are handled using JSON Web Tokens (JWT).  
Protected routes are implemented using middleware.

---

## User Roles

### Admin
- Create and manage maintenance staff accounts
- View all reported infrastructure issues
- Assign issues to maintenance staff
- Monitor issue status

### Maintenance Staff
- Login to the system
- View assigned infrastructure tasks
- Update task status (Pending / In Progress / Resolved)

### User
- Login to the system
- Report infrastructure issues
- Track issue status

---

## Project Structure

IMS/

├── client/  
│   ├── src/  
│   ├── public/  
│   └── package.json  

├── server/  
│   ├── config/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── middleware/  
│   ├── server.js  
│   └── package.json  

├── docs/  
│   ├── ArchitectureDiagram.png  
│   ├── ERDiagram.png  
│   └── Wireframes.pdf  

├── .gitignore  
└── README.md  

---

## Installation Guide

### Backend Setup

cd server  
npm install  
npm run dev  

### Frontend Setup

cd client  
npm install  
npm run dev  

---

## Environment Variables

Create a `.env` file inside the `server` folder with the following variables:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

The `.env` file is included in `.gitignore` to prevent sensitive information from being pushed to the repository.

---

## Phase 1 Deliverables

- Tech stack justification
- System architecture diagram
- ER diagram
- UI/UX wireframes
- Proper GitHub repository structure
- Client-server architectural implementation

---

## Future Enhancements

- Email notifications for issue updates
- Dashboard analytics for administrators
- File or image upload for infrastructure issues
- Deployment to a cloud platform
