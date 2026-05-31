# 🏙️ CityFix — Frontend

React + Vite frontend for CityFix, a civic complaint management platform where citizens can report urban issues and admins can manage and resolve them in real time.

🔗 **Live Demo:** [city-fixsumit.vercel.app](https://city-fixsumit.vercel.app)  
🔗 **Backend Repo:** [CityFix-Backend](https://github.com/DubeySumit25/CityFix-Backend)

---

## 🚀 Features

- JWT-based login & registration
- Submit complaints with image, location & category
- Track complaint status (PENDING → IN_PROGRESS → RESOLVED)
- Admin dashboard with pie chart analytics, search & filter
- Role-based routing (USER / ADMIN)
- Fully responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| Axios | API calls |
| React Router | Client-side routing |
| Recharts | Pie chart analytics |
| Vercel | Deployment |

---

## ⚙️ Setup Locally

```bash
# Clone the repo
git clone https://github.com/DubeySumit25/CityFix-Frontend.git
cd CityFix-Frontend

# Create .env.local
VITE_API_URL=http://localhost:8080

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## 📁 Project Structure

src/
├── api/
│   └── axios.js          # Axios instance with JWT interceptor
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── CreateComplaint.jsx
│   ├── MyComplaints.jsx
│   └── AdminDashboard.jsx
├── components/
│   └── Navbar.jsx
└── App.jsx

---

## 📸 Screenshots

Login:
<img width="1145" height="903" alt="image" src="https://github.com/user-attachments/assets/f97c852c-8964-4d2a-a583-ca97f23f95f1" />

User Dashboard:
<img width="1909" height="600" alt="image" src="https://github.com/user-attachments/assets/eb8855a9-00c1-4eeb-a68b-26c7583aaaf7" />

Admin Dashboard:
<img width="1889" height="834" alt="image" src="https://github.com/user-attachments/assets/1af1b270-1ae1-42e1-b8d9-f1001af89d54" />

My Complaints:
<img width="1890" height="783" alt="image" src="https://github.com/user-attachments/assets/b923102a-a398-4290-bcc6-3274c6bfd30d" />

---

## 👨‍💻 Author

**Sumit Dubey**  
[LinkedIn](https://www.linkedin.com/in/sumit-dubey-9a0226322/) • [GitHub](https://github.com/DubeySumit25) • [LeetCode](https://leetcode.com/u/anonymousvenom/)
