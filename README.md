# ChatFreeX 💬

A modern real-time chat application built using the MERN stack with image sharing, authentication, profile management, and responsive UI.

---

# 🚀 Features

* 🔐 User Authentication
* 💬 Real-time Chat System
* 🖼️ Image Message Support
* 😀 Emoji Picker
* 👤 User Profile Update
* 📱 Fully Responsive UI
* 🔒 Secure Cookie Authentication

---

# 🛠️ Tech Stack

## Frontend

* React JS
* Vite
* Tailwind CSS
* Redux Toolkit
* Axios
* React Router DOM
* Socket.IO Client
* Emoji Picker React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* Multer
* Cloudinary
* bcryptjs
* Socket.IO


---

# ⚙️ Frontend Setup

## 1️⃣ Move to Frontend Folder

```bash
cd frontend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create Frontend .env File

Create a `.env` file inside the `frontend` folder.

```env
VITE_SERVER_URL=http://localhost:8000
```

---

## 4️⃣ Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# ⚙️ Backend Setup

## 1️⃣ Move to Server Folder

```bash
cd backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create Backend .env File

Create a `.env` file inside the `backend` folder.

```env
PORT=8000
ORIGIN = http://localhost:5173
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key


CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ☁️ Cloudinary Setup

1. Create account on Cloudinary
2. Open Dashboard
3. Copy:

   * Cloud Name
   * API Key
   * API Secret
4. Paste into backend `.env`

---

# 🍃 MongoDB Setup

## Using MongoDB Atlas

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Whitelist IP address
5. Copy connection string
6. Paste inside:

```env
MONGO_URI=
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
```

---

# ▶️ Start Backend

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:8000
```

---

# 📦 Required Backend Packages

Install these packages in server:

```bash
npm install express mongoose dotenv cors cookie-parser bcryptjs jsonwebtoken multer cloudinary socket.io
```

## Dev Dependency

```bash
npm install -D nodemon
```

---

# 📦 Required Frontend Packages

Install these packages in client:

```bash
npm install react-router-dom axios react-redux @reduxjs/toolkit socket.io-client react-icons emoji-picker-react
```

---

# 🔐 Authentication System

ChatFreeX uses:

* JWT Token Authentication
* HTTP Only Cookies
* Protected Routes
* Secure Password Hashing with bcryptjs

---

# 🖼️ Image Upload System

Images are uploaded using:

* Multer
* Cloudinary

Supported:

* Profile Images
* Chat Images

---

# 🌐 API Routes

## Auth Routes

```bash
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/logout
```

## User Routes

```bash
GET    /api/user/current
PUT    /api/user/profile
GET    /api/user/others
```

## Message Routes

```bash
POST   /api/message/send/:receiver
GET    /api/message/get/:receiver
```

---



# 🧑‍💻 Developer

## Avijit Dey

Full Stack Developer from India 🇮🇳


---

# ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork the project
* 🧑‍💻 Contribute

---

# 💙 ChatFreeX

Connect Instantly. Chat Freely.
