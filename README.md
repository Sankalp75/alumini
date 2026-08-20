# Alumni Connect — Centralized Alumni Data Management & Engagement Platform

> Prototype built for **Smart India Hackathon 2026 — Practice Round**
> Problem Statement ID: **SIH25019** | PS: **SIH25017** | Organization: Government of Punjab | Category: Software | Theme: Smart Education

---

## 📌 Problem Statement

Educational institutions struggle to maintain updated records of their alumni and lack a centralized system for alumni engagement. This leads to lost connections, missed mentorship and job opportunities, and poor institutional-alumni relationships.

**Alumni Connect** solves this by providing a single digital platform where alumni can register, keep their profiles updated, search/reconnect with batchmates, and stay engaged through announcements, job postings, or events — while institutions get a searchable, centralized alumni database.

---

## ✨ Features

#Post product feature:
-Nearby alumini as per the linkedin working place.

### Core (MVP — built in this prototype)
- 🔐 **Alumni Registration & Login** — secure sign-up/sign-in using email authentication
- 👤 **Profile Management** — alumni can create and update their details (name, batch, branch, current company, location, contact, LinkedIn)
- 🔍 **Searchable Alumni Directory** — search and filter by name, graduation batch, or branch
- 📢 **Engagement Feed** — a simple announcement/job-posting board visible to all registered alumni
- 🛠️ **Admin View** — institution admins can view all alumni records in one place

### Planned / Future Scope
- 🤝 Mentorship matching between alumni and current students
- 💼 Job/internship board with application tracking
- 📅 Event RSVP and reunion management
- 📊 Analytics dashboard for institutions (batch-wise placement stats, engagement metrics)
- 📱 Mobile app version

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (or React, if used) |
| Styling | Bootstrap / Tailwind CSS |
| Backend & Database | Firebase (Authentication + Firestore) |
| Hosting | Firebase Hosting / Vercel / Netlify |
| Version Control | Git & GitHub |

*(Update this table with your team's actual final stack before submission.)*

---

## 📂 Project Structure

```
alumni-connect/
├── index.html              # Landing page
├── register.html           # Alumni registration page
├── login.html               # Login page
├── directory.html           # Searchable alumni directory
├── profile.html              # Profile view/edit page
├── feed.html                  # Announcements/engagement feed
├── admin.html                # Admin dashboard
├── /css
│   └── style.css
├── /js
│   ├── firebase-config.js    # Firebase project configuration
│   ├── auth.js                 # Login/register logic
│   ├── directory.js            # Search & filter logic
│   └── feed.js                  # Feed post/read logic
├── /assets
│   └── images/
└── README.md
```

*(Adjust this to match your actual folder layout.)*

---

## 🚀 Getting Started

### Prerequisites
- A [Firebase](https://firebase.google.com/) account (free tier is enough)
- [Node.js](https://nodejs.org/) installed (if using React/build tools)
- Git installed

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/alumni-connect.git
   cd alumni-connect
   ```

2. **Set up Firebase**
   - Create a new project on the [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** (Email/Password)
   - Enable **Firestore Database**
   - Copy your Firebase config keys into `js/firebase-config.js`:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

3. **Run locally**
   - Simply open `index.html` in a browser, or
   - Use the Live Server extension in VS Code for hot-reloading

4. **(If using React)**
   ```bash
   npm install
   npm start
   ```

---

## 👥 Team

| Name | Role |
|---|---|
| _Add name_ | Team Lead / Auth & Registration |
| _Add name_ | Frontend — Directory & Search |
| _Add name_ | Frontend — Feed & Admin Dashboard |
| _Add name_ | Backend / Firebase Setup |
| _Add name_ | UI/UX Design |
| _Add name_ | Testing & Presentation |

---

## 🖼️ Screenshots

_Add screenshots of your working prototype here before submission._

```
![Homepage](./assets/screenshots/home.png)
![Directory](./assets/screenshots/directory.png)
```

---

## 🎯 How This Solves the Problem

- Replaces scattered spreadsheets/manual records with a **live, centralized database**
- Gives alumni a **self-service** way to keep their own information current
- Makes it easy for institutions and alumni to **reconnect and engage** through a shared feed
- Built to be **extendable** — mentorship, job boards, and events can be layered on top of the same data model

---

## 📄 License

This project was built for educational/hackathon purposes as part of Smart India Hackathon 2026 practice.

---

## 🙏 Acknowledgements

- Smart India Hackathon 2025/2026 for the problem statement
- Government of Punjab for defining the challenge
- Firebase/Supabase documentation for backend guidance
