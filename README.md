🌸 Fertility Couple App

A modern fertility tracking & couple-sharing mobile app built with Expo + React Native.

📱 Overview

Fertility Couple App is a smart, lightweight fertility tracking app designed for couples.
It provides:

🔮 Daily fertility insights

🩸 Period logging

❤️ Sex logging

🤒 Symptoms tracking

📅 Calendar view

🤝 Partner sharing (backend planned)

🛠 Edit cycle settings

♻️ Reset app data

🎨 Clean UI inspired by top health apps

The project is still evolving — but the structure is future-proof and ready to scale.

🚀 Features
🌿 Cycle Tracking

Calculates fertility windows

Detects ovulation & period days

3-day overview (Yesterday / Today / Tomorrow)

Full month calendar

📝 Logging

Log period

Log sex activity

Log symptoms

Each day stores a DayLog with:

{
  date: string;
  period?: {...};
  sex?: SexLog[];
  symptoms?: SymptomLog;
}

👫 Couple Mode

(Backend planned — currently disabled)

Partner invite

Shared cycle visibility

Role-based experience (woman / partner)

⚙️ Settings

Change fertility goal

Edit cycle lengths

Reset all data

Simple chip-based selection UI



🛠 Tech Stack
Mobile

Expo (React Native)

TypeScript

React Navigation

Context API for state

Expo Router (optional)

Hooks-based architecture

Clean UI components

Backend (Planned)

The backend folder is reserved for the future API.

Planned responsibilities:

🔐 Authentication (JWT)

☁️ Cloud sync of logs & settings

🤝 Partner linking

📊 Data insights & predictions

Planned tech stack:

Option A: Spring Boot + PostgreSQL

Option B: Node.js (NestJS) + PostgreSQL

REST API

Docker deployment

Future API endpoints (draft):

POST /api/auth/register
POST /api/auth/login
GET  /api/me
PUT  /api/settings/cycle

GET  /api/logs/day/:date
POST /api/logs/day/:date/period
POST /api/logs/day/:date/sex
POST /api/logs/day/:date/symptoms

POST /api/partner/invite
POST /api/partner/accept
GET  /api/partner/status

📂 Mobile App Folder Breakdown
app/components/

Reusable UI building blocks:

TodayStatusCard

QuickActionsRow

TimelineStrip

Modals (Period, Sex, Symptoms)

Layout components (ScreenContainer)

app/hooks/

useCycle — main cycle engine & logging

usePartner (planned)

useCoach (future)

app/lib/

cycleEngine.ts → ovulation & fertile window calculations

theme/ → colors, spacing, typography

app/navigation/

Bottom tabs (Home, Calendar, Coach, Couple, Settings)

Onboarding flow navigator

app/screens/

Main screens

Onboarding screens

Settings with editable cycle goal

▶️ Running the Mobile App
1. Install dependencies
cd mobile/couple-app
npm install

2. Start Expo
npx expo start


Press w → run in browser

Press a → run on Android

Press i → run on iOS (Mac)

🧪 Resetting the App

The Settings screen includes a built-in Reset All Data option:

Clears cycle settings

Clears all logs

Restores onboarding defaults

Powered by:

resetAll();


inside useCycle.

📌 Roadmap
✔️ Completed

Daily fertility engine

Logs for period / sex / symptoms

Modals

Calendar page

Goal editing in Settings

Reset data

Clean UI theme

🔜 Coming Next

Full backend

Partner linking

Push notifications

Cycle insights dashboard

AI symptom assistant

🤝 Contributing

Contributions welcome!
