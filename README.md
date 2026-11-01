# Hatch 🎓

**Swap skills. Hatch new ones.**

Learn together. Teach each other. Grow together.

_Target Audience: Students_

Education is expensive, and learning new skills often comes with financial barriers. But what if we could learn from one another by contributing our knowledge, talents, and abilities?

Hatch is a student-focused platform designed to make skill acquisition more accessible by connecting people who want to learn with people who are willing to teach. Through collaboration and knowledge sharing, students can exchange skills without necessarily exchanging money.

_Core Values: Contribution · Learning · Collaboration_

> Hatch was previously named **SkillSwap**.

## ✨ Features

- **User Profiles:** Users create accounts specifying the skills they can teach and the skills they want to learn, and can update their profile details.
- **Work Showcase:** Users can showcase their work, projects, and practical experience.
- **Skill Matching:** Users discover people who can teach them and people who want to learn the skills they already possess.
- **Connections:** Users send requests to potential learning partners, who can accept or reject them.
- **Collaboration Requests:** Requests can include proposed terms and conditions.
- **Flexible Scheduling:** Learning partners arrange their own classes and agree on a schedule, with at least one session per week.
- **Class Tracking:** Sessions are tracked to encourage consistency and accountability.
- **Ratings and Feedback:** Users rate their sessions and learning partners. Ratings contribute to a scoring system that encourages active participation and commitment.

### 🔜 Coming Soon

- **Messaging:** Real-time chat between connected users (Socket.IO).
- **Notifications:** Alerts for requests, sessions, and messages.
- **Project Teams:** Users form their own teams and the system assigns a random project to build together. Team size is flexible and decided by the users.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, DaisyUI, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT stored in HTTP-only cookies
- **Media:** Cloudinary (profile pictures)

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- A MongoDB Atlas account and database connection URI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ade12Donald/Hatch.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Hatch
   ```

3. Install the server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install the client dependencies:

   ```bash
   cd ../client
   npm install
   ```

5. Create a `.env` file in the `server` directory, using `.env.example` as a reference.

6. Configure your environment variables:

   ```text
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_long_random_secret
   NODE_ENV=development
   ```

   Profile pictures also need your Cloudinary credentials. See `.env.example` for the exact variable names.

7. Start the application. Run the start script defined in each `package.json` (for example `npm run dev`) in both `server` and `client`.
   - Client: http://localhost:5173
   - API: http://localhost:5000

## 📁 Project Structure

```text
Hatch
├── server/
│   ├── controllers/   # Request handlers and application logic
│   ├── middleware/    # Authentication and request validation
│   ├── models/        # Mongoose models
│   ├── routers/       # API route definitions
│   ├── schema/        # Data validation schemas
│   └── utils/         # Reusable helper functions
└── client/            # React frontend (Vite)
```

## 👨‍💻 Author

<img src="https://images.weserv.nl/?url=github.com/Ade12Donald.png&w=100&h=100&fit=cover&mask=circle" width="30" align="absmiddle" alt="Donald"> <a href="https://github.com/Ade12Donald"><b>Donald Adebowale</b></a>
