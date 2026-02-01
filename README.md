# LinkRAA Chat Application 🚀

LinkRAA Chat Application is a full-stack real-time messaging platform designed for the RGUKT Alumni Association. It allows users to register, login, profile management, and share professional details like resumes and portfolios.

## ✨ Features

- **User Authentication**: Secure Registration and Login using JWT (JSON Web Tokens).
- **Profile Management**: View and manage user profiles.
- **Messaging Service**: Real-time messaging capabilities (REST-based message retrieval).
- **Professional Sharing**: A dedicated "Share" feature for alumni to share:
    - Resume Links
    - Portfolio Links
    - Branch and Passing Year details
- **Health Monitoring**: Dedicated `/api/health` endpoint for monitoring backend status.
- **Vercel Ready**: Optimized for deployment on Vercel with serverless functions.

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap, Axios, Moment.js.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JWT, bcrypt (for password security).
- **Deployment**: Vercel.

## 📂 Project Structure

```text
LinkRAA-Chat-Application/
├── client/                 # React Frontend
│   ├── src/                # Frontend Source Code
│   ├── public/             # Static Assets
│   └── package.json        # Frontend Dependencies
├── models/                 # Mongoose Models (model.js, msgmodel.js, sharemodel.js)
├── middleware.js           # JWT Authentication Middleware
├── server.js               # Express Backend Entry Point
├── vercel.json             # Vercel Deployment Configuration
└── package.json            # Backend Dependencies & Scripts
```

## 🚀 Local Setup

Follow these steps to get the project running on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Venkatesh-Maley/LinkRAA-Chat-Application.git
   cd LinkRAA-Chat-Application
   ```

2. **Install Dependencies**:
   Install root (backend) dependencies:
   ```bash
   npm install
   ```
   Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Set Environment Variables**:
   Create a `.env` file (or use local variables) for:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure string for JWT signing.

4. **Run the Application**:
   Use the following command to run both backend and frontend concurrently:
   ```bash
   npm run dev
   ```
   - Frontend will run on: `http://localhost:3000`
   - Backend will run on: `http://localhost:5000`

## 🌐 Deployment on Vercel

This project is configured for a seamless Vercel deployment.

### Steps:

1. **Push your code to GitHub**.
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/) and create a "New Project".
   - Import your `LinkRAA-Chat-Application` repository.
3. **Configure Environment Variables**:
   In the Vercel dashboard, add the following under **Project Settings > Environment Variables**:
   - `MONGODB_URI`: Your production MongoDB URI.
   - `JWT_SECRET`: Your production JWT secret.
4. **Deploy**:
   Vercel will automatically detect the `vercel.json` configuration and deploy:
   - The Root directory as the backend (serverless functions).
   - The `client` directory as the frontend static build.

### ⚠️ Important Note
The backend routes are prefixed with `/api/` (e.g., `/api/login`, `/api/register`). Ensure your frontend API calls are updated to use this prefix when deploying.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Venky** - [GitHub Profile](https://github.com/Venkatesh-Maley)