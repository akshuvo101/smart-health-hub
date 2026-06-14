# 🩺 Smart HealthHub

Smart HealthHub is a modern wellness management platform designed to support students' mental, emotional, and physical wellbeing through personalized tracking, professional support, and role-based healthcare management.

The platform provides dedicated dashboards for Students, Counselors, Doctors, Administrators, and Super Administrators, enabling seamless communication, wellness monitoring, appointment management, and healthcare analytics.

---

## ✨ Features

### 👨‍🎓 Student Portal

* Personalized wellness dashboard
* Mood tracking
* Sleep monitoring
* Habit management
* Self-assessments
* Appointment booking
* Community forum
* Wellness reports

### 👩‍⚕️ Counselor Portal

* Student wellbeing monitoring
* Counseling session management
* Appointment scheduling
* Assessment review
* Progress tracking
* Counseling notes

### 🩺 Doctor Portal

* Patient overview
* Medical consultation management
* Appointment scheduling
* Health analytics
* Wellness reports
* Clinical records

### 👨‍💼 Admin Portal

* User management
* Platform monitoring
* Analytics dashboard
* Content moderation
* Appointment oversight

### 🔐 Super Admin Portal

* Role management
* System monitoring
* Security controls
* Audit logs
* Platform configuration
* Administrative analytics

---

## 🚀 Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend & Authentication

* Supabase
* Supabase Authentication
* PostgreSQL

### UI & Styling

* Tailwind CSS
* Lucide React Icons
* Framer Motion
* Sonner Toast

### Deployment

* Vercel

---

### Architecture Overview

Smart HealthHub follows a role-based architecture where each user type has an isolated dashboard and feature set:

- Student Portal
- Counselor Portal
- Doctor Portal
- Admin Portal
- Super Admin Portal

Authentication, authorization, and role management are powered by Supabase Authentication and PostgreSQL.


## 📂 Project Structure

app/
├── (auth)/
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   └── auth/
│
├── (public)/
│   ├── about/
│   ├── contact/
│   ├── features/
│   ├── resources/
│   └── page.tsx
│
├── student/
│   ├── dashboard/
│   ├── mood/
│   ├── sleep/
│   ├── habits/
│   ├── assessments/
│   ├── appointments/
│   ├── forum/
│   └── reports/
│
├── counselor/
│   ├── dashboard/
│   ├── students/
│   ├── appointments/
│   ├── assessments/
│   └── reports/
│
├── doctor/
│   ├── dashboard/
│   ├── patients/
│   ├── appointments/
│   ├── records/
│   └── reports/
│
├── admin/
│   ├── dashboard/
│   ├── users/
│   ├── appointments/
│   ├── reports/
│   └── settings/
│
├── super-admin/
│   ├── dashboard/
│   ├── users/
│   ├── admins/
│   ├── roles/
│   ├── analytics/
│   ├── system/
│   ├── security/
│   ├── audit-logs/
│   └── settings/
│
├── api/
├── layout.tsx
└── page.tsx

components/
├── admin/
├── counselor/
├── doctor/
├── student/
├── super-admin/
├── ui/
├── animations/
└── shared/

lib/
├── auth/
├── supabase/
├── redirects.ts
├── get-user-role.ts
└── utils.ts

public/
├── images/
├── icons/
└── favicon.ico

middleware.ts
next.config.ts
tailwind.config.ts
---

## 🔑 Authentication & Authorization

Smart HealthHub uses Supabase Authentication with role-based access control.

Supported roles:

* student
* counselor
* doctor
* admin
* super_admin

Users are automatically redirected to their respective dashboard after login.

| Role        | Dashboard              |
| ----------- | ---------------------- |
| Student     | /student/dashboard     |
| Counselor   | /counselor/dashboard   |
| Doctor      | /doctor/dashboard      |
| Admin       | /admin/dashboard       |
| Super Admin | /super-admin/dashboard |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🏃 Running Locally

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## 🗄️ Database

The platform uses Supabase PostgreSQL with:

* Authentication
* Profiles Table
* Role Management
* Row Level Security (RLS)
* Role-Based Route Protection

---

## 🌐 Main Pages

* Home
* About
* Features
* Resources
* Contact
* Login
* Register

---

## 📈 Future Enhancements

* AI Wellness Assistant
* Real-Time Chat
* Video Consultation
* Health Prediction Analytics
* Mobile Application
* Wellness Recommendations
* Emergency Support System

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

Developed with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase.

Smart HealthHub © 2026
