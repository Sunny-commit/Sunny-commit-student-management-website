
# Student Management Website

A modern, responsive web application designed to manage student data, attendance, grades, documents, and communication within an academic institution. Built using **React**, **TypeScript**, and **Tailwind CSS**, the system offers a clean UI and role-based access for administrators and students.

## 🚀 Features

- 🔐 Authentication system with login & password reset (AuthContext)
- 📚 Course and student management
- 📈 Attendance and grades tracking
- 📄 Document uploads and announcements
- 📊 Dashboard with real-time data views
- 📁 Modular and maintainable file structure
- ⚙️ Configured with Vite, ESLint, Tailwind, and PostCSS

## 📂 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Linting**: ESLint
- **Routing**: React Router
- **Build Tools**: PostCSS, Vite

## 🖼️ Screenshots

- Interface of the website:  
  ![Interface](https://github.com/Sunny-commit/Sunny-commit-student-management-website/blob/main/Screenshot%20(24).PNG)

- After login through the website:  
  ![After Login](https://github.com/Sunny-commit/Sunny-commit-student-management-website/blob/main/Screenshot%20(25).PNG)

- Announcements display:  
  ![Announcements](https://github.com/Sunny-commit/Sunny-commit-student-management-website/blob/main/Screenshot%20(26).PNG)

## 📁 Project Structure (simplified)

```text
src/
├── contexts/          # Auth context
├── data/              # Mock student/course data
├── layouts/           # Layout components
├── pages/             # Auth & Dashboard pages
├── routes/            # Routing config
├── types/             # TypeScript types
├── App.tsx            # App entry
├── main.tsx           # Vite main file
````

## 📦 Installation

```bash
npm install
npm run dev
```

## 🧠 Future Enhancements

* Admin and student roles with RBAC
* Integration with backend API
* Notifications and messaging system
* Theme switcher and accessibility improvements

## 📜 License

This project is licensed under the MIT License.

```
