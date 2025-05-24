
```markdown
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



## 🚀 Screenshorts
-interface of the website
![Screenshot (24)](https://github.com/user-attachments/assets/d2a49d98-c04b-4713-a36b-e2d80c76d983)


-after login through the website
![Screenshot (25)](https://github.com/user-attachments/assets/60bf4aeb-f107-4aef-9fb9-f5f3af589e4b)


-Announcements can be displayed as
![Screenshot (26)](https://github.com/user-attachments/assets/e1ab9267-eebf-4c71-8b1b-e804f6662824)

## 📁 Project Structure (simplified)

```

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
````

## 🧠 Future Enhancements

* Admin and student roles with RBAC
* Integration with backend API
* Notifications and messaging system
* Theme switcher and accessibility improvements

## 📜 License
This project is licensed under the MIT License.


