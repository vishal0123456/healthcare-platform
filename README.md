# MediCore – Centralized Healthcare Management Platform

> A modern, visually impressive and responsive healthcare SaaS platform built for **Algomindz Solutions Pvt. Ltd.**

![MediCore](https://img.shields.io/badge/Healthcare-Platform-0ea5e9?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Production%20Ready-10b981?style=for-the-badge)

---

## 🏥 Project Overview

MediCore is a **Centralized Healthcare Management Platform** that covers all aspects of modern healthcare delivery through a beautiful, professional, and fully responsive web interface.

## ✨ Features / Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Centralized Patient Profiles** | Comprehensive patient information — demographics, allergies, insurance, emergency contacts |
| 2 | **Medical History Management** | Conditions, medications, vaccinations, lab results, surgical history |
| 3 | **Medical Report Management** | Upload and review diagnostic reports (CBC, Echo, MRI, Thyroid, Lipid Profile, etc.) |
| 4 | **Consultation Records** | In-person, video and emergency consultations with prescriptions and doctor notes |
| 5 | **Personalized Nutrition Plans** | Custom diet plans with weekly meal schedules, macros, restrictions and supplements |
| 6 | **Yoga & Wellness Progress Tracking** | Yoga programs with asanas, session tracking, health metrics charts |
| 7 | **Secure Role-Based Access Control** | Admin, Doctor, Patient, Nutritionist, Yoga Instructor roles with granular permissions |

## 👥 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medicore.health | Admin@123 |
| Doctor | priya.mehta@medicore.health | Doctor@123 |
| Patient | aarav.sharma@email.com | Patient@123 |
| Nutritionist | kavya.nair@medicore.health | Nutri@123 |
| Yoga Instructor | ramesh.sharma@medicore.health | Yoga@123 |

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite 6
- **Routing:** React Router v6
- **Charts:** Recharts
- **Icons:** Lucide React
- **Styling:** Pure CSS (custom design system, no Tailwind/Bootstrap)
- **Data:** Static/dummy data (no backend required)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/healthcare-platform.git

# Navigate to project directory
cd healthcare-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Topbar, DashboardLayout
│   └── ui/             # Avatar, Badge, StatCard, Modal, SearchBar
├── context/
│   └── AuthContext.jsx # Authentication & role management
├── data/               # All static/dummy data
│   ├── patients.js
│   ├── medicalHistory.js
│   ├── reports.js
│   ├── consultations.js
│   ├── nutrition.js
│   ├── wellness.js
│   ├── users.js
│   └── dashboard.js
└── pages/
    ├── Login.jsx
    ├── Dashboard.jsx
    ├── Patients.jsx
    ├── MedicalHistory.jsx
    ├── Reports.jsx
    ├── Consultations.jsx
    ├── Nutrition.jsx
    ├── Wellness.jsx
    └── AccessControl.jsx
```

## 🎨 Design Highlights

- Modern healthcare SaaS UI inspired by real-world platforms
- Fully responsive layout with collapsible sidebar
- Role-based navigation — each role sees only relevant modules
- Interactive charts (Area, Bar, Pie, Line, RadialBar) using Recharts
- Professional color system with semantic color coding
- Smooth animations and hover effects
- Accessible modal dialogs and form components

---

**Built for Algomindz Solutions Pvt. Ltd. Assignment**
