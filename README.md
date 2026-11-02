# Hatch 🎓

### Swap skills. Hatch new ones.

**Learn together. Teach each other. Grow together.**

Hatch is a student-focused skill-sharing platform that makes learning new skills more accessible through collaboration and knowledge exchange.

## 💡 About the Project

Education can be expensive, and acquiring new skills often comes with financial barriers. But what if students could learn from one another by sharing their knowledge, talents, and abilities?

**Hatch** provides a platform where students can connect with people who possess the skills they want to learn and share the skills they already have.

Instead of relying entirely on paid courses or external instructors, students can exchange knowledge, collaborate on projects, and develop practical abilities together without necessarily exchanging money.

Our goal is to build a community where everyone has something to teach and something to learn.

**Core Values:** Contribution · Learning · Collaboration

## ✨ Features

### 1. User Profiles

Students can create accounts, showcase their identities, specify the skills they can teach, and list the skills they want to learn. Profile information can also be updated as they develop new abilities.

### 2. Work Showcase

Users can showcase their projects, work, and practical experience, allowing potential learning partners to understand their abilities beyond just a list of skills.

### 3. Skill Matching

Discover students who possess the skills you want to learn and connect with those interested in learning the skills you can teach.

### 4. Connections

Users can send connection requests to potential learning partners. Recipients can accept or reject incoming requests.

### 5. Collaboration Requests

Students can initiate collaboration requests and propose terms and conditions to establish clear expectations before starting a learning partnership.

### 6. Flexible Scheduling

Learning partners arrange their own classes and agree on suitable schedules, with a minimum commitment of one session per week.

### 7. Class Tracking

Learning sessions are tracked to encourage consistency, monitor participation, and promote accountability between learning partners.

### 8. Ratings and Feedback

Users can rate their learning sessions and partners. These ratings contribute to a scoring system designed to encourage active participation, commitment, and meaningful collaboration.

## 🔜 Upcoming Features

The following features are planned for future development:

- **Real-time Messaging:** Private messaging between connected users using Socket.IO.
- **Notifications:** Real-time alerts for connection requests, collaboration requests, upcoming sessions, and messages.
- **Project Teams:** Students can form teams to work on projects together. Hatch will assign projects randomly, while team size remains flexible and determined by the participants.

## 🛠️ Tech Stack

Hatch is built using modern web technologies.

| Category                | Technologies            |
| ----------------------- | ----------------------- |
| Frontend                | React.js, Vite          |
| Styling                 | Tailwind CSS, DaisyUI   |
| HTTP Client             | Axios                   |
| Backend                 | Node.js, Express.js     |
| Database                | MongoDB Atlas, Mongoose |
| Authentication          | JWT, HTTP-only Cookies  |
| Media Storage           | Cloudinary              |
| Real-time Communication | Socket.IO (planned)     |

## 📁 Project Structure

```text
Hatch/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images and static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   └── ...
│   │
│   └── package.json
│
├── server/
│   ├── controllers/         # Request handlers and application logic
│   ├── middleware/          # Authentication and request middleware
│   ├── models/              # Mongoose database models
│   ├── routers/              # API route definitions
│   ├── schema/               # Request validation schemas
│   ├── utils/                # Reusable utility functions
│   └── ...
│
└── README.md
```

## 🚀 Getting Started

Follow these instructions to get a local copy of Hatch running on your machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) account and database connection URI.
- A [Cloudinary](https://cloudinary.com/) account for profile picture uploads.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Ade12Donald/Hatch.git
```

**2. Navigate to the project directory**

```bash
cd Hatch
```

**3. Install server dependencies**

```bash
cd server
npm install
```

**4. Install client dependencies**

```bash
cd ../client
npm install
```

**5. Configure environment variables**

Create a `.env` file inside the `server` directory.

Use `.env.example` as a reference and provide the required credentials.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_long_random_secret
NODE_ENV=development
```

Configure your Cloudinary credentials using the variable names specified in `.env.example`.

**6. Start the application**

Open two terminals.

Terminal 1 — Backend:

```bash
cd server
npm run dev
```

Terminal 2 — Frontend:

```bash
cd client
npm run dev
```

The application should be accessible at:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

_Note: The commands assume your respective package.json files define the `dev` scripts._

## 🔐 Authentication

Hatch uses JSON Web Tokens (JWT) for authentication, with tokens stored in HTTP-only cookies.

This approach helps protect authentication tokens from direct access by client-side JavaScript.

## 🎯 Project Vision

Hatch aims to make skill acquisition more accessible by encouraging students to become both learners and teachers.

We believe that knowledge should not only be acquired but also shared.

Through collaboration, contribution, and consistent learning, students can develop practical skills, build meaningful connections, and grow together.

**Everyone has something to teach. Everyone has something to learn.**

## 👨‍💻 Author

<img src="https://images.weserv.nl/?url=github.com/Ade12Donald.png&w=100&h=100&fit=cover&mask=circle" width="30" align="absmiddle" alt="Donald"> <a href="https://github.com/Ade12Donald"><b>Donald Adebowale</b></a>

---

<p align="center">
  Built with ❤️ for students who believe in learning together.
  <br>
  <b>Hatch 🎓 — Swap skills. Hatch new ones.</b>
</p>
