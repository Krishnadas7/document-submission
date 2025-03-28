# Document Submission

This project is a **MERN stack application** for document submission.

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Krishnadas7/document-submission.git
cd document-submission
```

## 🏗 Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

   **Ensure that the backend is running on port 3000.**

## 🎨 Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the frontend:
   ```sh
   npm run dev
   ```

## 🎯 Project Structure
```
document-submission/
│── backend/        # Node.js & Express API
│── frontend/       # React & Vite UI
│── README.md       # Project Documentation
```

## 📌 Notes
- The frontend **does not require any environment variables**.
- Ensure the **backend is running on port 3000** before starting the frontend.

