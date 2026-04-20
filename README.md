# ResumeAI

[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248)](https://www.mongodb.com/)
[![AI](https://img.shields.io/badge/AI-Gemini-4285F4)](https://ai.google.dev/)

A full-stack AI-powered resume builder built with the MERN stack. Users can sign up, generate and edit resumes, upload an existing PDF resume for AI-assisted extraction, switch between multiple templates, customize styling, and share public resume links.

## Overview

ResumeAI is a portfolio-grade MERN project focused on practical resume building rather than flashy UI alone. The core product flow is:

- authenticate a user
- create or import a resume
- edit content section by section
- preview changes live
- customize template, font, and color
- download or share the final resume

The project also includes AI-assisted content enhancement and a demo resume for every new user so the app is useful immediately after signup.

## Preview

### Home Page

![ResumeAI Home Page](./assets/home-page.png)

### Dashboard

![ResumeAI Dashboard](./assets/dashboard.png)

### Resume Builder

![ResumeAI Resume Builder](./assets/resume-builder.png)

### Public Resume Preview

![ResumeAI Public Resume Preview](./assets/public-preview.gif)

## Features

- JWT-based authentication with strong password validation
- Automatic demo resume created for every new user
- Resume builder with live preview and step-by-step editing flow
- Multiple resume templates, including ATS-focused layouts
- Font and accent color customization
- AI assistance for professional summary and experience enhancement
- PDF resume upload with AI-based data extraction
- Public shareable resume links
- Profile image upload with optional background removal for supported templates

## Demo Highlights

- New users automatically receive an editable demo resume
- ATS-friendly resume templates are available alongside more visual layouts
- PDF upload can extract resume content into structured fields
- Shareable public resume links work without requiring authentication
- Gemini is used for content enhancement and structured extraction

## Challenges I Solved

- Fixed cross-origin issues between Render and Vercel, including the tricky case where Vercel preview/deployment URLs can change while the backend still needs a safe allowlist.
- Stabilized PDF import by handling different `react-pdftotext` export shapes, so resume text extraction would not break depending on bundler/package behavior.
- Cleaned up resume template rendering so ATS-focused output avoids raw links, keeps section formatting consistent, and stays readable in both UI and print/PDF output.

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Gemini API
- ImageKit
- Multer

## Project Structure

```text
ResumeAI/
├── client/             # React + Vite frontend
│   ├── src/
│   └── public/
├── server/             # Express + MongoDB backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── configs/
│   └── utils/
└── README.md
```

## Architecture Notes

- The backend uses one main resume update endpoint instead of many tiny endpoints. That keeps all resume writes in one place, so the builder can save text, visibility changes, style choices, and image changes through a single flow.
- Resume saves use `FormData` because some updates include both structured JSON and an uploaded profile image. The JSON part is sent as a string and parsed again on the backend, while the image is uploaded separately and merged into the saved resume document.
- AI is integrated on the backend instead of the frontend. This keeps the Gemini API key private and lets prompts, fallback models, and quota handling stay centralized in one controlled layer.

## Repository Notes

- Project title is `ResumeAI`
- Recommended repo name and main folder name are also `ResumeAI`

## Local Setup

### 1. Clone the project

```bash
git clone <your-repo-url>
cd ResumeAI
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

### Frontend: `client/.env`

```env
VITE_API_URL=http://localhost:5001
```

### Backend: `server/.env`

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/ResumeAI
MONGODB_DB_NAME=
JWT_SECRET=replace_me
GEMINI_API_KEY=replace_me
GEMINI_MODEL=gemini-1.5-flash
IMAGEKIT_PRIVATE_KEY=replace_me
IMAGEKIT_PUBLIC_KEY=replace_me
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
CLIENT_URL=http://localhost:5173
```

## Running the App

### Start backend

```bash
cd server
npm run server
```

### Start frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:5001` by default.

For production deployment, override these values in your hosting dashboard:

```env
# Vercel
VITE_API_URL=https://your-render-backend.onrender.com

# Render
PORT=5000
CLIENT_URL=https://your-vercel-frontend.vercel.app
```

`CLIENT_URL` can be a comma-separated list if you want to allow more than one
frontend origin during deployment.

## Available Scripts

### Client

```bash
npm run dev
npm run build
npm run lint
```

### Server

```bash
npm run server
npm run start
npm run test
```

## Main User Flow

1. User signs up or logs in
2. A demo resume is automatically created for new users
3. User opens the dashboard and can:
   - create a new resume
   - edit the demo resume
   - upload an existing PDF resume
4. User customizes content, template, color, font, and image
5. User saves, downloads, or shares the resume publicly

## Production Readiness Notes

- Strong password validation is enforced on signup
- CORS is configurable through environment variables
- Auth-protected routes use JWT
- Uploaded profile images are handled through ImageKit
- Demo resumes are created once per user and protected against duplication
- Backend coverage now includes a small test layer for auth protection, public resume access, and validation-critical controller behavior

## Notes

- Resume upload works best with text-based PDFs. Scanned image PDFs may not extract well.
- Some templates support profile images while ATS-focused templates stay cleaner and more text-first.
- Gemini is used for content enhancement and structured resume extraction.
- AI-powered features may occasionally be unavailable if the active Gemini project hits quota or model access limits.
- Verification is based on linting, builds, backend route tests, and manual product flow testing

## Future Improvements

- Add downloadable PDF export generated on the server
- Add dedicated privacy/terms pages
- Expand backend and frontend test coverage beyond the current route checks
- Add resume analytics or job-match scoring

## Author

Developed by Sahil Hande

## 📄 License

This project is open-source. Feel free to use it for learning and portfolio purposes!
